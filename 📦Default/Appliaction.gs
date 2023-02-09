//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - Follow
// - UnFollow

// ## ユーティリティ系


//アプリケーション層
//データベースや外部システムとの通信を担当するリポジトリクラスや
//外部システムとのインターフェースを提供するサービスクラスなどを持ちます
//設計は「Appliaction」という名前からスタートします
class Application {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {
    this.event = event;

    //ドメインオブジェクト群
    this.domainObjects = {
      Follow: new Follow(this.event),
      UnFollow: new UnFollow(this.event),
      SpotInquiry: new SpotInquiry(this.event)
      //ドメインオブジェクトに変更があったら足す
    }
  }

  /** 特定のドメインオブジェクトの課題を処理するメソッド
   */
  getSolutions() {
    const domainObject = this.getDomainObject_();
    const result = domainObject.getSolution();
    return result
  }


  /** ドメインオブジェクトを取得するメソッド
   * @return{object} ドメインオブジェクト
   */
  getDomainObject_() {
    const domainObjects = this.domainObjects;
    for (const domainObjectName in domainObjects) {
      if (domainObjects[domainObjectName].isDomainObject()) {
        return domainObjects[domainObjectName]
      }
    }
  }


  /** Helloを返すメソッド
   * @return{object} ドメインオブジェクト
   */
  getHello() {
    return "Hello! I'm Application"
  }
}


//上記クラスのテスト関数
function test_Appliaction() {

  const exports = GASUnit.exports
  const assertThat = AssertGAS.assertThat

  exports({
    'Appliaction': {
      '#domainObjects': {
        'FOLLOWオブジェクトを返すはず': function () {
          const e = FOLLOW_WebhookEvent_SAMPLE;
          const event = JSON.parse(e.postData.contents).events[0];
          const a = new Application(event);
          const domainObject = a.domainObjects["Follow"];
          const result = domainObject.name;
          const expectation = "Follow"
          assertThat(result).is(expectation);
        },
        'UNFOLLOWドメインオブジェクトを返す': function () {
          const e = UNFOLLOW_WebhookEvent_SAMPLE;
          const event = JSON.parse(e.postData.contents).events[0];
          const a = new Application(event);
          const domainObject = a.domainObjects["UnFollow"];
          const result = domainObject.name;
          const expectation = "UnFollow"
          assertThat(result).is(expectation);
        },
        'SpotInquiryオブジェクトを返': function () {
          const e = SpotInquiry_WebhookEvent_SAMPLE;
          const event = JSON.parse(e.postData.contents).events[0];
          const a = new Application(event);
          const domainObject = a.domainObjects["SpotInquiry"];
          const result = domainObject.name;
          const expectation = "SpotInquiry"
          assertThat(result).is(expectation);
        },
      }
    }
  })
}


/** 🔚 End 🔚 */




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




/** 🔚 End 🔚 */



/** FORMクラス */
class Form {

  /** 
    * @constructor
    * @param{object} イベントオブジェクト
    */
  constructor(event) {
    this.messageType = event.type;
    this.userMessage = event.postback.data;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.userId = event.source.userId;
    this.mode = event.mode;
    this.scenario = event.postback.data.match(/\[.*?_/)[0].replace("[", "").replace("_", ""); //followなど
    this.formZone = parseInt(event.postback.data.match(/Form\d+/)[0].replace("Form", "")); //form1から1を数値型として抽出したもの
    this.answerNumber = event.postback.data.match(/A\d+|終了/)[0]; //Q1など

  }

  /** 個別メッセージを送信するメソッド */
  sendForm() {

    const l = new LINE();

    if (this.answerNumber !== "終了") {
      const messageObject = ENUM_FORM[`${this.scenario}_Form`][this.formZone];
      l.sendUniquePushMessage(messageObject, this.userId);
    }

    //回答ありがとうございました。
    if (this.answerNumber === "終了") {
      const messageObject = [{
        "type": "text",
        "text": "ご回答ありがとうございました🐎🚜リッチメニューより特典を受け取ってください",
      }
      ];

      l.sendUniquePushMessage(messageObject, this.userId);
    }

  }



  /** スプレッドシートに貼り付ける用の2次元配列を作成するメソッド */
  createArray() {
    return [this.messageType, this.userMessage, this.timestamp, this.userId, "", this.mode, this.scenario, this.formZone, this.answerNumber];
  }


}


