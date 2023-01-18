function myFunction() {

  /** テキストだけからスタート */
  // const text = "テストです🚀";

  // const json = [{
  //   'type': 'text',
  //   'text': text
  // }];

  /** 絵文字付きのメッセージ  */
  //https://developers.line.biz/ja/docs/messaging-api/emoji-list/#line-emoji-definitions
  // const json = [{

  //   "type": "text",
  //   "text": "$ LINE emoji $",
  //   "emojis": [
  //     {
  //       "index": 0,
  //       "productId": "5ac1bfd5040ab15980c9b435",
  //       "emojiId": "001"
  //     },
  //     {
  //       "index": 13,
  //       "productId": "5ac1bfd5040ab15980c9b435",
  //       "emojiId": "002"
  //     }
  //   ]
  // }
  // ];

  /** スタンプ  */
  //https://developers.line.biz/ja/docs/messaging-api/sticker-list/#sticker-definitions
  // const json = [
  //   {
  //     "type": "sticker",
  //     "packageId": "446",
  //     "stickerId": "1988"
  //   }
  // ];

  /** 画像（とテキスト）*/
  //https://www.irasutoya.com/
  // const json = [
  //   {
  //     "type": "image",
  //     "originalContentUrl": "https://1.bp.blogspot.com/-xSbuAA5_H8k/X9GYHQzBk1I/AAAAAAABctQ/qAC4viqn770Hq4lBWp_DgxnA7VZmFiKwQCNcBGAsYHQ/s726/food_sushi_kobore_ikura_gunkan.png",
  //     "previewImageUrl": "https://1.bp.blogspot.com/-xSbuAA5_H8k/X9GYHQzBk1I/AAAAAAABctQ/qAC4viqn770Hq4lBWp_DgxnA7VZmFiKwQCNcBGAsYHQ/s726/food_sushi_kobore_ikura_gunkan.png"
  //   },
  //   {
  //     'type': 'text',
  //     'text': "こぼれいくらの画像です"
  //   }
  // ];


  /** テンプレートメッセージ（共通）*/
  //このままじゃ送信できない(templeteは必須だから)
  // const json = [
  //   {
  //     "type": "template",
  //     "altText": "This is a buttons template",
  //     "template": {}
  //   }

  // ];


  /** テンプレートメッセージ（共通とボタン）*/
  // const json = [
  //   {
  //     "type": "template",
  //     "altText": "This is a buttons template",

  //     "template": {
  //       "type": "buttons",
  //       // "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
  //       "imageAspectRatio": "rectangle",
  //       "imageSize": "cover",
  //       "imageBackgroundColor": "#FFFFFF",
  //       "title": "Menu",
  //       "text": "Please select",

  //       //画像、タイトル、テキストの領域全体に対して設定できる、タップされたときのアクション
  //       "defaultAction": {
  //         "type": "uri",
  //         "label": "View detail",
  //         "uri": "http://example.com/page/123"
  //       },

  //       //アクションオブジェクト
  //       "actions": [
  //         {
  //           "type": "postback",
  //           "label": "Buy",
  //           "data": "action=buy&itemid=123"
  //         },
  //         {
  //           "type": "postback",
  //           "label": "Add to cart",
  //           "data": "action=add&itemid=123"
  //         },
  //         {
  //           "type": "uri",
  //           "label": "View detail",
  //           "uri": "http://example.com/page/123"
  //         }
  //       ]
  //     }
  //   }

  // ];



  /** テンプレートメッセージ（共通とボタン）アクションオブジェクトを詳しく*/
  const json = [
    {
      "type": "template",
      "altText": "アンケートにご回答ください",

      "template": {
        "type": "buttons",
        "imageBackgroundColor": "#005038",
        "title": "質問1",
        "text": "選んでください",

        //画像、タイトル、テキストの領域全体に対して設定できる、タップされたときのアクション
        "defaultAction": {
          "type": "uri",
          "label": "View detail",
          "uri": "http://example.com/page/123"
        },

        //アクションオブジェクト
        //typeプロパティに、postback、message、uri、datetimepicker、camera、cameraRoll、location、richmenuswitchが指定できる
        "actions": [
          {
            "type": "postback",
            "label": "postback",　//ラベルもいろいろ設定できそうだな・・・・
            "data": "これはポストbackでスプシに転送できなかったなWHY?", //.postback.dataで文字列を返す
            "displayText": "なにを選択したでしょう。キーボードを開かせましょう",
            "inputOption": "openKeyboard",
          },
          {
            "type": "message",
            "label": "message",
            "text": "指定した文字列がアクション実行時に送信されるよ"
          },
          {
            "type": "uri",
            "label": "選択肢３はURLを開くこともできるよ",
            "uri": "https://tgg.jugani-japan.com/tsujike/"
          },
          {
            "type": "datetimepicker",
            "label": "datetimepicker",
            "data": "わたしもポストバックでスプシに送信されます",
            "mode": "datetime",
            "initial": "2017-12-25t00:00",
            "max": "2018-01-24t23:59",
            "min": "2017-12-25t00:00"
          }
        ]
      }
    }

  ];



  /** テンプレートメッセージ（共通と確認）*/

  // const json = [
  //   {
  //     "type": "template",
  //     "altText": "アンケートにご回答ください",

  //     "template": {
  //       "type": "confirm",
  //       "imageAspectRatio": "rectangle",
  //       "imageSize": "cover",
  //       "imageBackgroundColor": "#005038",
  //       "title": "質問1",
  //       "text": "確認タイプのテンプレートメッセージです。下記から選んでください",

  //       //画像、タイトル、テキストの領域全体に対して設定できる、タップされたときのアクション
  //       "defaultAction": {
  //         "type": "uri",
  //         "label": "View detail",
  //         "uri": "https://tgg.jugani-japan.com/tsujike/"
  //       },

  //       //アクションオブジェクト
  //       //typeプロパティに、messageしか指定できなくて、2択を選ばせる？
  //       "actions": [
  //            {
  //       "type": "message",
  //       "label": "男性",
  //       "text": "おとこだってさ"
  //     },
  //     {
  //       "type": "message",
  //       "label": "女性",
  //       "text": "2択はまずいんじゃない？"
  //     }

  //       ]
  //     }
  //   }

  // ];


  /** テンプレートメッセージ（共通とカルーセル）*/
  // const json = [
  //   {

  //     "type": "template",
  //     "altText": "this is a carousel template",
  //     "template": {
  //       "type": "carousel",
  //       "columns": [
  //         {
  //           "thumbnailImageUrl": "https://1.bp.blogspot.com/-qnR3CbiKv9Q/Xsdr4rRhzII/AAAAAAABZEA/llbdhEpWUnQ7nxHd3LXLJfI_HctC-On_QCNcBGAsYHQ/s1600/sushi_kai_hokkigai.png",
  //           "imageBackgroundColor": "#FFFFFF",
  //           "title": "this is menu",
  //           "text": "description",
  //           "defaultAction": {
  //             "type": "uri",
  //             "label": "View detail",
  //             "uri": "http://example.com/page/123"
  //           },
  //           "actions": [
  //             {
  //               "type": "postback",
  //               "label": "Buy",
  //               "data": "action=buy&itemid=111"
  //             },
  //             {
  //               "type": "postback",
  //               "label": "Add to cart",
  //               "data": "action=add&itemid=111"
  //             },
  //             {
  //               "type": "uri",
  //               "label": "View detail",
  //               "uri": "http://example.com/page/111"
  //             }
  //           ]
  //         },
  //         {
  //           "thumbnailImageUrl": "https://1.bp.blogspot.com/-qnR3CbiKv9Q/Xsdr4rRhzII/AAAAAAABZEA/llbdhEpWUnQ7nxHd3LXLJfI_HctC-On_QCNcBGAsYHQ/s1600/sushi_kai_hokkigai.png",
  //           "imageBackgroundColor": "#000000",
  //           "title": "this is menu",
  //           "text": "description",
  //           "defaultAction": {
  //             "type": "uri",
  //             "label": "View detail",
  //             "uri": "http://example.com/page/222"
  //           },
  //           "actions": [
  //             {
  //               "type": "postback",
  //               "label": "Buy",
  //               "data": "action=buy&itemid=222"
  //             },
  //             {
  //               "type": "postback",
  //               "label": "Add to cart",
  //               "data": "action=add&itemid=222"
  //             },
  //             {
  //               "type": "uri",
  //               "label": "View detail",
  //               "uri": "http://example.com/page/222"
  //             }
  //           ]
  //         }
  //       ],
  //       "imageAspectRatio": "rectangle",
  //       "imageSize": "cover"
  //     }
  //   }


  // ]


  /** テンプレートメッセージ（画像カルーセル）*/

  // const json = [
  //   {

  //     "type": "template",
  //     "altText": "アンケートに回答ください",
  //     "template": {
  //       "type": "image_carousel",
  //       "columns": [
  //         {
  //           "imageUrl": "https://1.bp.blogspot.com/-qnR3CbiKv9Q/Xsdr4rRhzII/AAAAAAABZEA/llbdhEpWUnQ7nxHd3LXLJfI_HctC-On_QCNcBGAsYHQ/s1600/sushi_kai_hokkigai.png", // 画像のURL
  //           "action":
  //           {
  //             "type": "postback",
  //             "label": "ポストバック1",
  //             "data": "これはポストbackでスプシに転送",
  //             "displayText": "なにを選択したでしょう。キーボードを開かせましょう",
  //             "inputOption": "openKeyboard",

  //           }
  //         },
  //         {
  //           "imageUrl": "https://3.bp.blogspot.com/-S1pQ-1AM-OI/XNE_rKYlLuI/AAAAAAABSzk/teQ7qJjhl8sKqxMC-jJie8zcBTjIfcLtQCLcBGAs/s800/sushi_nodoguro.png", // 画像のURL
  //           "action":
  //           {
  //             "type": "message",
  //             "label": "Tap",
  //             "text": "Tap"
  //           }
  //         },
  //         {
  //           "imageUrl": "https://1.bp.blogspot.com/-jO238q2dcz8/XNE_qzGd3FI/AAAAAAABSzg/skXg0rJRC88wlFM12ODwdkjo_kStVBaswCLcBGAs/s800/sushi_kinmedai.png", // 画像のURL
  //           "action":
  //           {
  //             "type": "uri",
  //             "label": "yahoo",
  //             "uri": "https://www.yahoo.co.jp/",
  //             "altUri": {
  //               "desktop": "https://www.yahoo.co.jp/"
  //             }
  //           }
  //         }
  //       ]
  //     }

  //   }
  // ];


  // const buttonObject = JSON.parse(button);




  const l = new LINE();
  console.log(l.sendBroadbandMessage(json));


}
