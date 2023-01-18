/** リッチメニューに関するクラス */
class RichMenu {

  /** 
    * @constructor
    * @param{object} イベントオブジェクト
    */
  constructor(event) {
    const properties = PropertiesService.getScriptProperties();
    this.ACCESS_TOKEN = properties.getProperty("ACCESS_TOKEN");
    this.TESTUSER_ID = properties.getProperty("TESTUSER_ID");
    this.SPREADSHEET_ID = properties.getProperty("SPREADSHEET_ID");
    this.sheet = SpreadsheetApp.openById(this.SPREADSHEET_ID).getSheetByName("リッチメニュー一覧");

    this.messageType = event.type;
    this.userMessage = event.postback.data;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.userId = event.source.userId;
    this.mode = event.mode;
    this.scenario = event.postback.data.match(/\[.*?_/)[0].replace("[", "").replace("_", ""); //Freeなど
    this.richMenu = parseInt(event.postback.data.match(/RichMenu\d+/)[0].replace("RichMenu", "")); //RichMenu1から1を抽出したもの
    this.answerNumber = event.postback.data.match(/A\d+|終了/)[0]; //Q1など
  }

  //↓↓↓↓  リッチメニュー関連のメソッド　↓↓↓ 

  /** 個別メッセージを送信するメソッド */
  sendMessage() {

    const l = new LINE();

    // if (this.answerNumber !== "終了") {
    //   const messageObject = FORM_ENUM[`${this.scenario}_Form`][this.formZone];
    //   l.sendUniquePushMessage(messageObject, this.userId);
    // }

    //回答ありがとうございました。
    // if (this.answerNumber === "終了") {

    const messageObject = [{
      "type": "text",
      "text": "リッチメニューのタップありがとうございました。🐎🚜",
    }
    ];

    l.sendUniquePushMessage(messageObject, this.userId);
  }

  /** リッチメニューを新規アップロードするメソッド */
  createRichMenu() {
    const url = "https://api.line.me/v2/bot/richmenu";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = ENUM_RICHMENU.testRichMenuSource;

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload),
    };

    UrlFetchApp.fetch(url, options);
  }

  /** アップロードされている全リッチメニューIDの配列を取得するメソッド
   * @return{array} リッチメニューオブジェクトの配列
   */
  getRichMenuIds() {
    const url = "https://api.line.me/v2/bot/richmenu/list";
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "get",
    };

    const richMenuIds = UrlFetchApp.fetch(url, options);
    const ids = JSON.parse(richMenuIds);
    // console.log(ids.richmenus[2].areas);
    return ids.richmenus;
  }


  /** リッチメニュー画像アップロードとリッチメニューIDへの紐づけを行うメソッド
   * @param{string} スプレッドシートに記載されているリッチメニュー名(name)
   */
  uploadRichMenuImage(name) {
    const richMenuId = this.getRichMenuId_(name);
    const imageId = this.getImageId_(name);
    const imageBlob = DriveApp.getFileById(imageId);

    const url = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
    const headers = {
      'Content-Type': 'image/jpeg',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': imageBlob
    };

    UrlFetchApp.fetch(url, options);
  }

  /** ユーザーにリッチメニューをリンクする
   * ※ただし、RichMenuImageが紐づいてないと送信不可
   */
  sendRichMenuToUser() {
    const richMenuId = trainingGetRichMenuIds().richmenus[0].richMenuId;
    const url = `https://api.line.me/v2/bot/user/${this.TESTUSER_ID}/richmenu/${richMenuId}`;
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "post",
    };

    UrlFetchApp.fetch(url, options);
  }

  /** リッチメニューを削除するメソッド
   * @param{string} スプレッドシートに記載されているリッチメニュー名(name)
   */
  deleteRichMenu_(name) {
    const richMenuId = this.getRichMenuId_(name);
    const url = `https://api.line.me/v2/bot/richmenu/${richMenuId}`;
    const headers = {
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const options = {
      'headers': headers,
      'method': "delete",
    };

    UrlFetchApp.fetch(url, options);
  }




  //↓↓↓↓  スプレッドシート関連のメソッド　↓↓↓ 

  /** すべてのRecordsをオブジェクトレコーズで取得するメソッド
   * @return{Array} objArray
   */
  getSheetRecords_() {
    const [header, ...records] = this.sheet.getDataRange().getValues();

    const objectRecords = records.map(record => {
      const obj = {};
      header.forEach((element, index) => obj[element] = record[index]);
      return obj;
    });

    return objectRecords;
  }

  /** richMenuIdを返すメソッド
   * @param{string} スプレッドシートに記載されているリッチメニュー名(name)
   */
  getRichMenuId_(name) {
    const objectRecords = this.getSheetRecords_();
    const richMenuId = objectRecords.filter(record => record["name"] === name)[0]["richMenuId"]; //1件しかヒットしない
    return richMenuId;
  }

  /** imageIdを返すメソッド
   * @param{string} スプレッドシートに記載されているリッチメニュー名(name)
   */
  getImageId_(name) {
    const objectRecords = this.getSheetRecords_();
    const richMenuId = objectRecords.filter(record => record["name"] === name)[0]["imageID"]; //1件しかヒットしない
    return richMenuId;
  }


  /** リッチメニューidsをスプレッドシートに出力するメソッド */
  setValuesRichMenuIds() {
    const ids = this.getRichMenuIds(); //[]
    const values = ids.map(element => { return Object.values(element) });

    //nameで降順ソートする
    values.sort((a, b) => { return a[1] < b[1] ? -1 : 1; });

    this.sheet.getRange(2, 5, values.length, values[0].length).setValues(values);
    return "スプレッドシートに貼り付けしました";
  }



}






/**
 *  TEST用関数
 */
function testRichMenu() {

  const event = {
    type: "",
    postback: { data: "[follo_RichMenu1_A1]" },
    timestamp: 9999999999,
    source: { userId: "hoge" },
    mode: "Active",
  };


  const r = new RichMenu(event);

  //アップロードされている全リッチメニューIDの配列を取得する
  console.log(r.getRichMenuIds());



}
