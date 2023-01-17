function setPropertyStore() {

  //アクセストークン設置
  const properties = PropertiesService.getScriptProperties();

  //設置用
  // const ACCESS_TOKEN = "ここにアクセストークンを入力して実行する";
  // properties.setProperty('ACCESS_TOKEN', ACCESS_TOKEN);
  // const a = properties.getProperty('ACCESS_TOKEN');
  // console.log(a);

  // const SPREADSHEET_ID = "ここにスプレッドシートIDを入力して実行する";
  // properties.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);



}


const messageObjectEnum = {

  followForm1: [
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
            "data": "[follow_Form1]会社役員", //.postback.dataで文字列を返す
            "displayText": "会社役員"
          },
          {
            "type": "postback",
            "label": "会社員",
            "data": "[follow_Form1]会社員", //.postback.dataで文字列を返す
            "displayText": "会社員"
          },
          {
            "type": "postback",
            "label": "自営業・フリーランス",
            "data": "[follow_Form1]自営業・フリーランス", //.postback.dataで文字列を返す
            "displayText": "自営業・フリーランス"
          },
          {
            "type": "postback",
            "label": "その他",
            "data": "[お友だち追加時_質問1]その他", //.postback.dataで文字列を返す
            "displayText": "その他"
          }
        ]
      }
    }
  ],
  followForm2: [
    {
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "性別は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "男性",
            "data": "[follow_Form2]男性",
            "displayText": "男性"
          },
          {
            "type": "postback",
            "label": "女性",
            "data": "[follow_Form2]女性",
            "displayText": "女性"
          },
          {
            "type": "postback",
            "label": "その他・回答しない",
            "data": "[Follow_終了]その他・回答しない",
            "displayText": "その他・回答しない"
          }
        ]
      }
    }
  ]

};

const FORM_ENUM = Object.freeze(messageObjectEnum);

