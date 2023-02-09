//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - Follow
// - UnFollow
// - SpotInquiry

// ## ユーティリティ系
// - richMenuEnum


/**お友だち登録時ドメインオブジェクト
 * https://developers.line.biz/ja/reference/messaging-api/#follow-event
 */
class Follow {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.Follow.name;

    //Webhookイベントオブジェクトを解析
    this.event = event;

    this.type = event.type; //isDomainObject()で使用
    this.replyToken = event.replyToken;　//greetingToNewUser_()とgreetingToFormerUser_()で使用
    this.userId = event.source.userId; //isNewUser_() で使用
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //新規登録か出戻りか
    const flag = this.isNewUser_();

    //ファーストメッセージ送信
    flag ? this.greetingToNewUser_() : this.greetingToFormerUser_();


    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowEvent(this.event);

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "成功です", "ブロック解除");

    return "Followオブジェクトは課題を解決したのでメールを送信しました"
  }

  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {
    return this.type === "follow" ? true : false
  }


  /** Helloを返すメソッド
   * @return{string}
   */
  getHello() {
    return "Hello! I'm Follow オブジェクト"
  }

  /** 新規お友だちかどうか判定するメソッド
 * @return{boolean} 
 */
  isNewUser_() {
    //メインDBからuserIdリストの取得と照合
    const result = new DataSheet().hasUserId(this.userId);
    return result
  }


  /** 新規ユーザーにファーストメッセージを送信するメソッド */
  greetingToNewUser_() {

    const messageObject = [{
      "type": "text",
      "text": "お友だち登録ありがとうございます⭐これから一緒に目標達成をサポートさせていただきます。通知が多いなと思ったら通知オフ📵にしてください。",
    }
    ];

    //LINEインスタンス生成
    const l = new LINE();
    l.sendReplyMessage(messageObject, this.replyToken);
  }


  /** 出戻りユーザーにファーストメッセージを送信するメソッド */
  greetingToFormerUser_() {

    const messageObject = [{
      "type": "text",
      "text": "ブロック解除ありがとうございます⭐引き続きよろしくお願いします🐎🚜",
    }
    ];

    //LINEインスタンス生成
    const l = new LINE();
    l.sendReplyMessage(messageObject, this.replyToken);
  }





  // //本番では、if (!result)に変更する
  // if(result) { //はじめまして
  //   const messageObject = [{
  //     "type": "text",
  //     "text": "お友だち登録ありがとうございます⭐これから一緒に目標達成をサポートさせていただきます。通知が多いなと思ったら通知オフ📵にしてください。",
  //   }
  //   ];
  //   l.sendReplyMessage(messageObject, replyToken);

  //   //5秒後　
  //   Utilities.sleep(1000);
  //   const messageObject2 = [{
  //     "type": "text",
  //     "text": "さっそく、かんたんなアンケートにご回答ください✍️",
  //   }
  //   ];
  //   l.sendUniquePushMessage(messageObject2, userId);



  //   //3秒後
  //   Utilities.sleep(1000);
  //   const messageObject3 = ENUM_FORM["follow_Form"][0];
  //   l.sendUniquePushMessage(messageObject3, userId);

  // }

  // //本番では、if (result)に変更する
  // if(result) { //ブロック解除
  //   const messageObject = [{

  //     "type": "text",
  //     "text": "ブロック解除ありがとうございます⭐引き続きよろしくお願いします🐎🚜",
  //   }
  //   ];

  //   l.sendReplyMessage(messageObject, replyToken);

  // }





}

/** 🔚 End 🔚 */

/**ブロック時ドメインオブジェクト */
class UnFollow {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.UnFollow.name;

    //Webhookイベントオブジェクトを解析
    this.event = event;

    this.userMessage = "ブロック😨";
    this.type = event.type;
    this.mode = event.mode;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.sourceUserId = event.source.userId;
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "成功です", this.userMessage);

    return "UnFollowオブジェクトは課題を解決したのでメールを送信しました"

  }
  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.type === "unfollow" ? true : false
  }

  /** Helloを返すメソッド
   * @return{object} ドメインオブジェクト
   */
  getHello() {
    return "Hello! I'm unFollow オブジェクト"
  }


}


/** 🔚 End 🔚 */

/**スポットメッセージドメインオブジェクト */
class SpotInquiry {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.SpotInquiry.name;

    //Webhookイベントオブジェクトを解析
    this.event = event;

    //こいつら、共通のものはいいけど、独自なものは、自分のメソッド内で呼び出さないとエラーなるよ
    this.messageType = event.type;
    this.mode = event.mode;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.replyToken = event.replyToken;
    this.sourceUserId = event.source.userId;
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {
    //ここの処理すごく長くなる気がするけどいいのかな？

    //このように依存度が高い場合は
    // const b = new B();
    // b.something(/** 内部でnew A()している */)

    //こうやって依存関係を解消する
    // const a = new A();
    // const b = new B(a);
    // b.doSomething();


    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "SpotInquryオブジェクト成功です", this.event.message.text);

    return "SpotInquiryオブジェクトは課題を解決したのでメールを送信しました";

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    //ドメインオブジェクトの判定は、丁寧にやるべき
    return this.messageType === "message" ? true : false
  }


  /** Helloを返すメソッド
   * @return{object} ドメインオブジェクト
   */
  getHello() {
    return "Hello! I'm SpotInquryオブジェクト"
  }


}






/** 🔚 End 🔚 */


/**
 *  TEST用関数
 * */
function myFunction_20230119_022838() {

  console.log(ENUM_RICHMENU.testRichMenuSource);

}


/** 🔚 End 🔚 */




/** 🔚 End 🔚 */
