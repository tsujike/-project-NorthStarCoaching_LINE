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
  // console.log(d.hasUserId(userId));
  const data = d.getDataSheetRecords();
  const userIdColum = data.map(record => { return record["userId"] });
  // console.log(userIdColum);

}