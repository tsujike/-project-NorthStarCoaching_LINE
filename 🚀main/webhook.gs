/** メッセージが送付された際に、実行される関数 */
function doPost(e) {

  //1つのWebhookに1件のイベントオブジェクトと仮定して・・・
  const event = JSON.parse(e.postData.contents).events[0];

  const eventType = event.type;

  switch (eventType) {
    case "message":
      recieveMessage(event);
      break;
    case "follow":
      recieveFollow(event);
      break;
    case "unfollow":
      recieveUnfollow(event);
      break;
    case "postback":
      recievePostback(event);
      break;
  }

}


/**
 * コードの説明
 * 
 * @param {データ型} と引数の説明
 * @return  {データ型} と戻り値の説明
*/
function recieveMessage(event) {

  try {
    const messageType = event.type;
    const userMessage = event.message.text;
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const mode = event.mode;

    const record = [messageType, userMessage, timestamp, userId, replyToken, mode];

    // スプレッドシートID
    const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Data");
    sheet.appendRow(record);

  } catch (e) {
    GmailApp.sendEmail("kenzo@jugani-japan.com", "errorです", e.message);
  }

}


/**
 * コードの説明
 * 
 * @param {データ型} と引数の説明
 * @return  {データ型} と戻り値の説明
*/
function recieveFollow(event) {

  try {
    //LINEインスタンス生成
    const l = new LINE();

    //変数に格納
    const messageType = event.type;
    const userMessage = "ブロック解除";
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const replyToken = event.replyToken;
    const mode = event.mode;

    //メインDBからuserIdリストの取得と照合
    const d = new DataSheet();
    const result = d.hasUserId(userId);


    //本番では、if (!result)に変更する
    if (result) { //はじめまして
      const messageObject = [{
        "type": "text",
        "text": "お友だち登録ありがとうございます⭐これから一緒に目標達成をサポートさせていただきます。通知が多いなと思ったら通知オフ📵にしてください。",
      }
      ];
      l.sendReplyMessage(messageObject, replyToken);

      //5秒後　
      Utilities.sleep(1000);
      const messageObject2 = [{
        "type": "text",
        "text": "さっそく、かんたんなアンケートにご回答ください✍️",
      }
      ];
      l.sendUniquePushMessage(messageObject2, userId);



      //3秒後
      Utilities.sleep(1000);
      const messageObject3 = ENUM_FORM["follow_Form"][0];
      l.sendUniquePushMessage(messageObject3, userId);

    }

    //本番では、if (result)に変更する
    if (!result) { //ブロック解除
      const messageObject = [{

        "type": "text",
        "text": "ブロック解除ありがとうございます⭐引き続きよろしくお願いします🐎🚜",
      }
      ];

      l.sendReplyMessage(messageObject, replyToken);

    }

    // スプレッドシートにログを取る
    const record = [messageType, userMessage, timestamp, userId, replyToken, mode];
    const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Data");
    sheet.appendRow(record);

  } catch (e) {
    GmailApp.sendEmail("kenzo@jugani-japan.com", "errorです", e.message);
  }

}


/**
 * コードの説明
 * 
 * @param {データ型} と引数の説明
 * @return  {データ型} と戻り値の説明
*/
function recieveUnfollow(event) {

  try {
    const messageType = event.type;
    const userMessage = "ブロック😨";
    const timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    const userId = event.source.userId;
    const mode = event.mode;

    const record = [messageType, userMessage, timestamp, userId, "", mode];

    // スプレッドシートID
    const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Data");
    sheet.appendRow(record);

  } catch (e) {
    GmailApp.sendEmail("kenzo@jugani-japan.com", "errorです", e.message);
  }

}



/**
 * コードの説明
 * 
 * @param {データ型} と引数の説明
 * @return  {データ型} と戻り値の説明
*/
function recievePostback(event) {

  try {

    //1秒後
    Utilities.sleep(1000);

    const sourceType = event.postback.data.match(/(Form|RichMenu)/)[0];

    //フォームを受け取ってフォームを送信したり終了メッセージを送信する
    if (sourceType === "Form") {
      const f = new Form(event);
      f.sendForm();

      // スプレッドシートに貼り付ける（ソースタイプによってプロパティが違うから共通化できないんじゃないかな）
      const record = f.createArray();

      const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Data");
      sheet.appendRow(record);
    }

    //リッチメニューを受け取ってアクションを起こす
    if (sourceType === "RichMenu") {

      const r = new RichMenu(event);
      r.sendMessage();

      // スプレッドシートに貼り付ける（ソースタイプによってプロパティが違うから共通化できないんじゃないかな）
      const record = r.createArray();

      const SPREADSHEET_ID = PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName("Data");
      sheet.appendRow(record);

    }





  } catch (e) {
    GmailApp.sendEmail("kenzo@jugani-japan.com", "errorです", e.message);
  }

}

