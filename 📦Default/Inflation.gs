//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - DataSheet
// - LINE

// ## ユーティリティ系



/** Dataシートクラス */
class DataSheet {

  /** コンストラクタ */
  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.SPREADSHEET_ID = properties.getProperty("SPREADSHEET_ID");
    this.sheetName = 'Data';
    this.sheet = SpreadsheetApp.openById(this.SPREADSHEET_ID).getSheetByName(this.sheetName);
  }

  /** すべてのRecordsをオブジェクトレコーズで取得するメソッド
   * @return{Array} objArray
   */
  getDataSheetRecords() {
    const [header, ...records] = this.sheet.getDataRange().getValues();

    const objectRecords = records.map(record => {
      const obj = {};
      header.forEach((element, index) => obj[element] = record[index]);
      return obj;
    });

    return objectRecords;
  }

  /** userIdを確認するメソッド
   * @param{string} userId
   * @return{boolean} 
   */
  hasUserId(userId) {
    const data = this.getDataSheetRecords();
    const userIdColum = data.map(record => { return record["userId"] });
    const result = userIdColum.includes(userId);
    return result
  }




  /** お友だち追加時にレコードを追加するメソッド
   * @param{array} event
   */
  appendRowFollowEvent(event) {
    const messageType = event.type;
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const mode = event.mode;

    const record = [messageType, "ブロック解除", timestamp, userId, replyToken, mode];
    this.sheet.appendRow(record);
  }

  /** ブロック時にレコードを追加するメソッド
 * @param{array} event
 */
  appendRowUnfollowEvent(event) {
    const messageType = event.type;
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const mode = event.mode;

    const record = [messageType, "ブロック😨", timestamp, userId, "", mode];
    this.sheet.appendRow(record);
  }

  /** PostBack時にレコードを追加するメソッド
 * @param{array} event
 */
  appendRowPostBackEvent(event) {
    const messageType = event.type;
    const userMessage = event.postback.data;
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const mode = event.mode;
    const scenario = event.postback.data.match(/\[.*?_/)[0].replace("[", "").replace("_", ""); //followなど
    const formZone = event.postback.data.match(/Form\d+|終了/)[0]; //form1など
    const answerNumber = event.postback.data.match(/(?<=\[follow_Form\d_)[A-Z]\d(?=\])/)[0];
    const answerText = event.postback.data.match(/(?<=\])\S+/)[0];

    const record = [messageType, userMessage, timestamp, userId, "", mode, scenario, formZone, answerNumber, answerText];
    this.sheet.appendRow(record);
  }


  /** スポットメッセージ受信時にレコードを追加するメソッド
 * @param{array} event
 */
  appendRowSpotMessageEvent(event) {
    const messageType = event.type;
    const userMessage = event.message.text;
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const mode = event.mode;

    const record = [messageType, userMessage, timestamp, userId, replyToken, mode];
    this.sheet.appendRow(record);
  }

  /** （FollowForm用のテキストメッセージ受信待機の）スタンバイフラグをレコードに追加するメソッド
  * @param{array} event
  */
  appendRowFollowFormStandby(event) {
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const mode = event.mode;

    const record = ["flag", "followFormStandby", timestamp, userId, "", mode];
    this.sheet.appendRow(record);
  }




}



/** TEST関数 */
function testDataSheet() {

  //Dataシートの・・・
  const d = new DataSheet();

  //全てのRecordsをオブジェクトレコーズで取得する
  // const records = d.getDataSheetRecords();
  // console.log(d.getDataSheetRecords());

  //ユーザーIDをチェックする
  const userId = "U663d4e7e63fc721cff83604c9a3e65a3";
  console.log(d.hasUserId(userId));
  // const data = d.getDataSheetRecords();
  // const userIdColum = data.map(record => { return record["userId"] });
  // console.log(userIdColum);

}



/** 🔚 End 🔚 */

class LINE {

  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.ACCESS_TOKEN = properties.getProperty("ACCESS_TOKEN");
  }

  /** ブロードバンドメッセージ */
  sendBroadbandMessage(messageObject) {

    const url = 'https://api.line.me/v2/bot/message/broadcast';
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN
    };

    const payload = {
      'messages': messageObject
    }

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload)
    };

    // 送信
    UrlFetchApp.fetch(url, options);
    return "メッセージを送信しました"

  }


  /** リプライメッセージ
   * @param{string} メッセージオブジェクトのJSON
   * @param{string} リプレイトークン
   */
  sendReplyMessage(messageObject, replyToken) {

    const url = "https://api.line.me/v2/bot/message/reply";
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = {
      'messages': messageObject,
      'replyToken': replyToken,
    }

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload),
    };

    UrlFetchApp.fetch(url, options);
    return "メッセージを送信しました"

  }



  /** 個別ユーザーにPUSHメッセージ
 * @param{string} メッセージオブジェクトのJSON
 * @param{string} ユーザーID　or webhookEventId 
 */
  sendUniquePushMessage(messageObject, userId) {

    const url = "https://api.line.me/v2/bot/message/push";
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = {
      'messages': messageObject,
      'to': userId, //or webhookEventId 
    };

    const options = {
      'headers': headers,
      'method': 'post',
      'payload': JSON.stringify(payload),
    };

    UrlFetchApp.fetch(url, options);
    return "メッセージを送信しました"

  }










}


/**
 *  TEST用関数
 */
function testLINE() {

  const l = new LINE();

  const text = "みなさん、動作テストありがとうございました。これから改装がはじまるので、メッセージがバンバン来るかもです💦 なので、ブロックしてくださいね。テストです🚀";

  const messageObject = [{
    'type': 'text',
    'text': text
  }];
  console.log(l.sendBroadbandMessage(messageObject));


  // const messageObject = [
  //   {
  //     "type": "template",
  //     "altText": "アンケートに回答ください",
  //     "template": {
  //       "type": "buttons",
  //       "title": "ご職業は？",
  //       "text": "以下の中からお選びください",
  //       "actions": [
  //         {
  //           "type": "postback",
  //           "label": "会社役員",
  //           "data": "会社役員", //.postback.dataで文字列を返す
  //           "displayText": "会社役員"
  //         },
  //         {
  //           "type": "postback",
  //           "label": "会社員",
  //           "data": "会社員", //.postback.dataで文字列を返す
  //           "displayText": "会社員"
  //         },
  //         {
  //           "type": "postback",
  //           "label": "自営業・フリーランス",
  //           "data": "自営業・フリーランス", //.postback.dataで文字列を返す
  //           "displayText": "自営業・フリーランス"
  //         },
  //         {
  //           "type": "postback",
  //           "label": "その他",
  //           "data": "その他", //.postback.dataで文字列を返す
  //           "displayText": "その他"
  //         }
  //       ]
  //     }
  //   }
  // ];



  // const messageObject = [{
  //   type: 'flex',
  //   altText: 'Welcome to our store!',
  //   contents: {
  //     "type": "bubble",
  //     "body": {
  //       "type": "box",
  //       "layout": "vertical",
  //       "contents": [
  //         {
  //           "type": "text",
  //           "text": "Please enter your text",
  //           "weight": "bold",
  //           "size": "xl"
  //         },
  //         {
  //           "type": "box",
  //           "layout": "vertical",
  //           "contents": [
  //             {
  //               "type": "text",
  //               "text": " ",
  //               "margin": "lg",
  //               "size": "sm",
  //               "color": "#555555",
  //               "wrap": true
  //             },
  //             {
  //               "type": "text",
  //               "text": " ",
  //               "margin": "lg",
  //               "size": "sm",
  //               "color": "#555555",
  //               "wrap": true
  //             },
  //             {
  //               "type": "text",
  //               "text": " ",
  //               "margin": "lg",
  //               "size": "sm",
  //               "color": "#555555",
  //               "wrap": true
  //             },
  //             {
  //               "type": "text",
  //               "text": " ",
  //               "margin": "lg",
  //               "size": "sm",
  //               "color": "#555555",
  //               "wrap": true
  //             },
  //             {
  //               "type": "text",
  //               "text": " ",
  //               "margin": "lg",
  //               "size": "sm",
  //               "color": "#555555",
  //               "wrap": true
  //             }
  //           ],
  //           "borderWidth": "1px",
  //           "borderColor": "#000000",
  //           "cornerRadius": "4px",
  //           "margin": "md",
  //           "height": "150px",
  //           "action": {
  //             "type": "uri",
  //             "label": "Send",
  //             "uri": "line://nv/camera/"
  //           }
  //         }
  //       ]
  //     }
  //   },
  // }];


  //   const messageObject = [
  //   {
  //     "type": "template",
  //     "altText": "アンケートに回答ください",
  //     "template": {
  //       "type": "buttons",
  //       "title": "緊急度はいかがですか？",
  //       "text": "この漢字の読み方は？",
  //       "actions": [ //答えが1つだとしてもこうするのか。なるほど。
  //         {
  //           "type": "postback",
  //           "label": "postback",　//ラベルもいろいろ設定できそうだな・・・・
  //           "data": "これはポストbackでスプシに転送できなかったなWHY?", //.postback.dataで文字列を返す
  //           "displayText": "なにを選択したでしょう。キーボードを開かせましょう",
  //           "inputOption": "openKeyboard",
  //         }
  //       ]
  //     }
  //   }
  // ];

  // console.log(l.sendBroadbandMessage(messageObject));
  // const userId = "U663d4e7e63fc721cff83604c9a3e65a3";
  // console.log(l.sendUniquePushMessage(messageObject, userId));

}


// const messageObject = [
//   {
//     "type": "template",
//     "altText": "アンケートに回答ください",
//     "template": {
//       "type": "buttons",
//       "title": "緊急度はいかがですか？",
//       "text": "この漢字の読み方は？",
//       "actions": [ //答えが1つだとしてもこうするのか。なるほど。
//         {
//           "type": "postback",
//           "label": "postback",　//ラベルもいろいろ設定できそうだな・・・・
//           "data": "これはポストbackでスプシに転送できなかったなWHY?", //.postback.dataで文字列を返す
//           "displayText": "なにを選択したでしょう。キーボードを開かせましょう",
//           "inputOption": "openKeyboard",
//         }
//       ]
//     }
//   }
// ];

// const replyToken = "2ca179cb011044718e6c0dfc26b5f780";

// console.log(l.sendReplyMessage(messageObject, replyToken));


