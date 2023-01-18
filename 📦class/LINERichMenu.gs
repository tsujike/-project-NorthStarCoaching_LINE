class LINERichMenu {

  constructor() {
    const properties = PropertiesService.getScriptProperties();
    this.ACCESS_TOKEN = properties.getProperty("ACCESS_TOKEN");
  }




  /** 個別ユーザーにリッチメニューを送信するメソッド
  * @param{string} メッセージオブジェクトのJSON
  * @param{string} ユーザーID
  */
  sendRichMenu(messageObject, userId) {


  }

  /** リッチメニューをアップロードするメソッド
  * @param{string} メッセージオブジェクトのJSON
  * @param{string} ユーザーID
  */
  sendRichMenu(messageObject, userId) {


  }

  /** リッチメニューを作成するメソッド */
  createRichMenu() {

    const url = "https://api.line.me/v2/bot/richmenu";
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.ACCESS_TOKEN,
    };

    const payload = {
      "size": {
        "width": 2500,
        "height": 1686
      },
      "selected": true,
      "name": "richMenu_follow",
      "chatBarText": "Tap here",
      "areas": [
        {
          "bounds": {
            "x": 0,
            "y": 0,
            "width": 2500,
            "height": 1686
          },
          "action": {
            "type": "postback",
            "data": "リッチメニューがタップされました"
          }
        }
      ]
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
