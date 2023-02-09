const richMenuEnum = {

testRichMenuSource : {
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": false,
    "name": "99_richMenu_test",
    "chatBarText": "▲タップしてメニューを表示▲",
    "areas": [ //センターで2分割
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 2500 / 2,//2500 /2 
          "height": 1686
        },
        "action": {
          "type": "postback",
          "data": "[Free_RichMenu1_A1]リッチメニュー（左）がタップされました",
          "displayText": "リッチメニュー（左）がタップされました",
        }
      },
      {
        "bounds": {
          "x": 2500 / 2,
          "y": 0,
          "width": 2500 / 2,//2500 /2 
          "height": 1686
        },
        "action": {
          "type": "postback",
          "data": "[Free_RichMenu1_A2]リッチメニュー（右）がタップされました",
          "displayText": "リッチメニュー（右）がタップされました",
        }
      },
    ]
  },

  testRichMenuSource2 : {}

}

const ENUM_RICHMENU = Object.freeze(richMenuEnum);

/**
 *  TEST用関数
 * */
  function myFunction_20230119_022838 () {
   
   console.log(ENUM_RICHMENU.testRichMenuSource);

 }
