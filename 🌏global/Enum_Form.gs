const messageObjectEnum = {

  follow_Form: [
    [{//follow_Form[0]
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
            "data": "[follow_Form1_A1]会社役員", //.postback.dataで文字列を返す
            "displayText": "会社役員"
          },
          {
            "type": "postback",
            "label": "会社員",
            "data": "[follow_Form1_A2]会社員", //.postback.dataで文字列を返す
            "displayText": "会社員"
          },
          {
            "type": "postback",
            "label": "自営業・フリーランス",
            "data": "[follow_Form1_A3]自営業・フリーランス", //.postback.dataで文字列を返す
            "displayText": "自営業・フリーランス"
          },
          {
            "type": "postback",
            "label": "その他",
            "data": "[follow_Form1_A4]その他", //.postback.dataで文字列を返す
            "displayText": "その他"
          }
        ]
      }
    }],
    [{//follow_Form[1]
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
            "data": "[follow_Form2_A1]男性",
            "displayText": "男性"
          },
          {
            "type": "postback",
            "label": "女性",
            "data": "[follow_Form2_A2]女性",
            "displayText": "女性"
          },
          {
            "type": "postback",
            "label": "その他・回答しない",
            "data": "[follow_Form2_A3]その他・回答しない",
            "displayText": "その他・回答しない"
          }
        ]
      }
    }
    ],
    [{//follow_Form[2]
      "type": "template",
      "altText": "アンケートに回答ください",
      "template": {
        "type": "buttons",
        "title": "年齢は？",
        "text": "以下の中からお選びください",
        "actions": [
          {
            "type": "postback",
            "label": "20代以下",
            "data": "[follow_Form3_終了]20代以下",
            "displayText": "20代以下"
          },
          {
            "type": "postback",
            "label": "30～40代",
            "data": "[follow_Form3_終了]30～40代",
            "displayText": "30～40代"
          },
          {
            "type": "postback",
            "label": "40～50代",
            "data": "[follow_Form3_終了]40～50代",
            "displayText": "40～50代"
          },
          {
            "type": "postback",
            "label": "50代以上",
            "data": "[follow_Form3_終了]50代以上",
            "displayText": "50代以上"
          }

        ]
      }
    }
    ]

  ]
};

const ENUM_FORM = Object.freeze(messageObjectEnum);

