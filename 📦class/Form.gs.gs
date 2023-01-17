/** FORMクラス */
class Form {

  /** 
    * @constructor
    * @param{object} イベントオブジェクト
    */
  constructor(event) {
    this.messageType = event.type;
    this.userMessage = event.postback.data;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.userId = event.source.userId;
    this.mode = event.mode;
    this.scenario = event.postback.data.match(/\[.*?_/)[0].replace("[", "").replace("_", ""); //followなど
    this.formZone = parseInt(event.postback.data.match(/Form\d+/)[0].replace("Form", "")); //form1から1を数値型として抽出したもの
    this.formNumber = event.postback.data.match(/Q\d+|終了/)[0]; //Q1など

  }

  /** 個別メッセージを送信するメソッド */
  sendForm() {

    const l = new LINE();

    if (this.formNumber !== "終了") {
      const messageObject = FORM_ENUM[`${this.scenario}_Form`][this.formZone + 2];
      l.sendUniquePushMessage(messageObject, this.userId);
    }
  }

  /** スプレッドシートに貼り付ける用の2次元配列を作成するメソッド */
  createArray() {
    return [this.messageType, this.userMessage, this.timestamp, this.userId, "", this.mode, this.scenario, this.formZone, this.formNumber];
  }


}

