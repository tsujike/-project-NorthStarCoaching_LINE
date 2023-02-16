//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - Follow
// - UnFollow
// - SpotInquiry
// - Follow2
// - Follow3
// - Follow5
// - Follow6


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

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.Follow.name;

    this.replyToken = event.replyToken;　//greetingToNewUser_()とgreetingToFormerUser_()で使用
    this.userId = event.source.userId; //isNewUser_() で使用
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //新規登録か出戻りか
    const flag = this.isNewUser_();

    //初回アンケートに答えているかどうか
    //TO DO

    //ファーストメッセージ送信
    flag ? this.greetingToFormerUser_() : this.greetingToNewUser_();

    //ファーストフォーム送信
    this.sendFirstForm_();

    return "Followオブジェクトは課題を解決したのでメールを送信しました"
  }





  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {
    return this.event.type === "follow" ? true : false
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

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject, this.replyToken);
  }


  /** 出戻りユーザーにファーストメッセージを送信するメソッド */
  greetingToFormerUser_() {

    const messageObject = [{
      "type": "text",
      "text": "ブロック解除ありがとうございます⭐引き続きよろしくお願いします🐎🚜",
    }
    ];

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject, this.replyToken);
  }


  /** ファーストフォームを送信するメソッド */
  sendFirstForm_() {
    //5秒後　
    Utilities.sleep(1000);

    const messageObject2 = [{
      "type": "text",
      "text": "さっそく、かんたんなアンケートにご回答ください✍️アンケートは10/10問です",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);

    //3秒後
    Utilities.sleep(1000);
    const messageObject3 = ENUM_FORM["follow_Form"][0];
    new LINE().sendUniquePushMessage(messageObject3, this.userId);
  }



}

/** 🔚 End 🔚 */

/**ブロック時ドメインオブジェクト */
class UnFollow {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.UnFollow.name;

    this.userMessage = "ブロック😨";

    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.sourceUserId = event.source.userId;
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowUnfollowEvent(this.event);

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "【NORTH STAR COACHING】がブロックされました", "気にしないでいきましょう");

    return "UnFollowオブジェクトは課題を解決したのでメールを送信しました"

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.event.type === "unfollow" ? true : false
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

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.SpotInquiry.name;

    //こいつら、共通のものはいいけど、独自なものは、自分のメソッド内で呼び出さないとエラーなるよ
    this.mode = event.mode;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.replyToken = event.replyToken;
    this.sourceUserId = event.source.userId;
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "SpotInquryオブジェクト成功です", this.event.message.text);

    return "SpotInquiryオブジェクトは課題を解決したのでメールを送信しました";

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.event.type === "message" ? true : false
  }


  /** Helloを返すメソッド
   * @return{object} ドメインオブジェクト
   */
  getHello() {
    return "Hello! I'm SpotInquryオブジェクト"
  }


}


/** 🔚 End 🔚 */



/**お友だち登録時フォーム（いわゆる2問目以降）ドメインオブジェクト
 * https://developers.line.biz/ja/reference/messaging-api/#follow-event
 */
class FollowForm {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.FollowForm.name;

    this.replyToken = event.replyToken;　//greetingToNewUser_()とgreetingToFormerUser_()で使用
    this.userId = event.source.userId; //isNewUser_() で使用
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・

  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    try {

      //スプレッドシートに出力
      const d = new DataSheet();
      d.appendRowPostBackEvent(this.event);

      //今何問目？
      const formZone = this.event.postback.data.match(/Form\d+|終了/)[0]; //Form2など

      switch (formZone) {
        case "Form1":
          //2ndフォーム送信
          this.sendForm2_();
          break;
        case "Form2":
          //3rdフォーム送信
          this.sendForm3_();
          break;
        case "Form3":
          //4thフォーム送信
          this.sendForm4_();
          break;
        case "Form4": //終了
          //Endフォーム送信
          this.sendFormEnd_();
          break;
        case "Form5": //再送
          //フォーム1から送信させる
          this.sendForm1_();
          break;
        default:
        //処理
      }


      // //4thフォーム送信
      // this.sendForm4_();

      // //終了メッセージ送信
      // this.sendFollowFormEnd_();

    } catch (e) {
      GmailApp.sendEmail("kenzo@jugani-japan.com", "FollowFormでerrorです", e.message);
    }

    return "FollowFormオブジェクトは課題を解決したのでメールを送信しました"
  }





  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {
    //受け取ったPostBackのメッセージに「follow_Form」が含まれていたらtrueを返す
    const type = this.event.postback.data.match(/follow_Form/)[0];
    return type === "follow_Form" ? true : false
  }


  /** 2ndフォームを送信するメソッド */
  sendForm2_() {

    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][1];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }


  /** 3rdフォームを送信するメソッド */
  sendForm3_() {
    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][2];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 4thフォームを送信するメソッド */
  sendForm4_() {
    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][3];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

  /** 終了フォームを送信するメソッド */
  sendFormEnd_() {
    //1秒後
    Utilities.sleep(1000);

    const messageObject = [{
      "type": "text",
      "text": `ご回答ありがとうございました⭐キャンペーンクーポンは初回取引の際に適用させていただきます🎊引き続きよろしくお願いします🐎🚜

URLなどを踏ませたいばあいはここに書く
https://n-s-coaching.com`,
    }
    ];

    new LINE().sendUniquePushMessage(messageObject, this.userId);
  }

    /** 1stフォームを送信するメソッド */
  sendForm1_() {
    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][0];
    new LINE().sendUniquePushMessage(messageObject, this.userId);
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
