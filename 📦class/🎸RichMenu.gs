class RichMenu {


  /** 
    * @constructor
    * @param{object} イベントオブジェクト
    */
  constructor(event) {
    this.messageType = event.type;
    this.userMessage = event.postback.data;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.userId = event.source.userId;
    this.mode = event.mode;
    this.scenario = event.postback.data.match(/\[.*?_/)[0].replace("[", "").replace("_", ""); //Freeなど
    this.richMenu = parseInt(event.postback.data.match(/RichMenu\d+/)[0].replace("RichMenu", "")); //RichMenu1から1を抽出したもの
    this.answerNumber = event.postback.data.match(/A\d+|終了/)[0]; //Q1など
  }

  /** 個別メッセージを送信するメソッド */
  sendMessage() {

    const l = new LINE();

    // if (this.answerNumber !== "終了") {
    //   const messageObject = FORM_ENUM[`${this.scenario}_Form`][this.formZone];
    //   l.sendUniquePushMessage(messageObject, this.userId);
    // }

    //回答ありがとうございました。
    // if (this.answerNumber === "終了") {

    const messageObject = [{
      "type": "text",
      "text": "リッチメニューのタップありがとうございました。🐎🚜",
    }
    ];

    l.sendUniquePushMessage(messageObject, this.userId);
  }




  /** スプレッドシートに貼り付ける用の2次元配列を作成するメソッド */
  createArray() {
    return [this.messageType, this.userMessage, this.timestamp, this.userId, "", this.mode, this.scenario, this.formZone, this.answerNumber];
  }


}


/**
 *  TEST用関数
 */
function testLINE() {




}
