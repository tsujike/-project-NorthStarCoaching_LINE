



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

