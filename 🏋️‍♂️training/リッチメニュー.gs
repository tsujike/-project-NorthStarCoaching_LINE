//マニュアル　https://developers.line.biz/ja/reference/messaging-api/#create-rich-menu


/** リッチメニューを作成しよう */
//エンドポイント
//リッチメニュー作成　https://api.line.me/v2/bot/richmenu

function trainingCreateCreateRichMenu() {

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const url = "https://api.line.me/v2/bot/richmenu";
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const payload = {
    "size": {
      "width": 2500,
      "height": 1686
    },
    "selected": false,
    "name": "99_richMenu_test",
    "chatBarText": "▲タップしてメニューを表示▲",
    "areas": [
      {
        "bounds": {
          "x": 0,
          "y": 0,
          "width": 2500 / 2,//2500 /2 
          "height": 1686
        },
        "action": {
          "type": "postback",
          "data": "リッチメニュー（左）がタップされました",
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
          "data": "リッチメニュー（右）がタップされました",
          "displayText": "リッチメニュー（右）がタップされました",
        }
      },
    ]
  };

  const options = {
    'headers': headers,
    'method': 'post',
    'payload': JSON.stringify(payload),
  };

  UrlFetchApp.fetch(url, options);

}


/** 作成したリッチメニューIDの配列を取得しよう */
//エンドポイント
//リッチメニューIDの配列取得　https://api.line.me/v2/bot/richmenu/list

function trainingGetRichMenuIds() {

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const url = "https://api.line.me/v2/bot/richmenu/list";
  const headers = {
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const options = {
    'headers': headers,
    'method': "get",
  };

  const richMenuIds = UrlFetchApp.fetch(url, options);
  const ids = JSON.parse(richMenuIds);
  console.log(ids.richmenus[2].areas);
  return ids;

}


/** リッチメニューidsをスプレッドシートに出力しよう */
function setValuesRichMenuIds() {

  const ids = trainingGetRichMenuIds().richmenus; //[]
  const values = ids.map(element => { return Object.values(element) });

  //nameでソートする
  values.sort((a, b) => { return b[1] - a[1] });

  const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
  const sheetName = 'リッチメニュー一覧';
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(sheetName);
  sheet.getRange(2, 5, values.length, values[0].length).setValues(values);

}

//基礎知識
//リッチメニューを表示するには、リッチメニューの画像をアップロードし、ユーザーとリンクする必要があります。

/** リッチメニューの画像アップロードとリッチメニューIDへの紐づけ */
//リッチメニューの画像アップロードエンドポイント　https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content
//リッチメニューの画像要件はあるけど、canvaで作れば気にしなくていいでしょう。

//canva URL https://www.canva.com/design/DAFXX0F5AhQ/PKu5ukTW4ySPRhQF5Dyrzg/edit

function trainingRichMenuImageUpload() {

  const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const richMenuId = trainingGetRichMenuIds().richmenus[0].richMenuId;
  const imageId = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("リッチメニュー一覧").getRange(2, 4).getValue();

  const imageBlob = DriveApp.getFileById(imageId);

  const url = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
  const headers = {
    'Content-Type': 'image/jpeg',
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const options = {
    'headers': headers,
    'method': 'post',
    'payload': imageBlob
  };

  UrlFetchApp.fetch(url, options);

}


/** ユーザーにリッチメニューをリンクする */
//ただし、RichMenuImageが紐づいてないと送信不可
function trainingSendRichMenuToUser() {

  const TESTUSER_ID = PropertiesService.getScriptProperties().getProperty("TESTUSER_ID");

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const richMenuId = trainingGetRichMenuIds().richmenus[2].richMenuId;

  const url = `https://api.line.me/v2/bot/user/${TESTUSER_ID}/richmenu/${richMenuId}`;
  const headers = {
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const options = {
    'headers': headers,
    'method': "post",
  };

  UrlFetchApp.fetch(url, options);

}



/** リッチメニューを削除する */
function trainingDeleteRichMenu() {

  const ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty("ACCESS_TOKEN");

  const richMenuId = trainingGetRichMenuIds().richmenus[2].richMenuId;

  const url = `https://api.line.me/v2/bot/richmenu/${richMenuId}`;
  const headers = {
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  const options = {
    'headers': headers,
    'method': "delete",
  };

  UrlFetchApp.fetch(url, options);

}


