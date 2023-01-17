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
 * @param{string} ユーザーID
 */
  sendUniquePushMessage(messageObject, userId) {

    const url = "https://api.line.me/v2/bot/message/push";
    const headers = {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = {
      'messages': messageObject,
      'to': userId,
    }

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

  // const text = "テストです🚀";

  // const messageObject = [{
  //   'type': 'text',
  //   'text': text
  // }];
  // console.log(l.sendBroadbandMessage(messageObject));


  const messageObject = [
    {
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "ご職業は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "会社役員",
            "data": "会社役員", //.postback.dataで文字列を返す
            "displayText": "会社役員"
          },
          {
            "type": "postback",
            "label": "会社員",
            "data": "会社員", //.postback.dataで文字列を返す
            "displayText": "会社員"
          },
          {
            "type": "postback",
            "label": "自営業・フリーランス",
            "data": "自営業・フリーランス", //.postback.dataで文字列を返す
            "displayText": "自営業・フリーランス"
          },
          {
            "type": "postback",
            "label": "その他",
            "data": "その他", //.postback.dataで文字列を返す
            "displayText": "その他"
          }
        ]
      }
    }
  ];
  console.log(l.sendBroadbandMessage(messageObject));



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
}
