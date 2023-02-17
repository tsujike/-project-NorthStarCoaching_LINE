//　# スクリプトファイル目次
//　各クラスは　/** 🔚 End 🔚 */　で区切ってます。
// ## クラス
// - Follow
// - UnFollow
// - SpotMessage
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
    // this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss"); //いつか使いそう・・・午前午後判定とかね
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

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);

    const messageObject1 = [{
      "type": "text",
      "text": "お友だち登録ありがとうございます⭐これから一緒に目標達成をサポートさせていただきます。通知が多いなと思ったら通知オフ📵にしてください。",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject1, this.replyToken);

    //5秒後　
    Utilities.sleep(500);

    const messageObject2 = [{
      "type": "text",
      "text": "こちらは2通目のメッセージです🐎🚜",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);

  }


  /** 出戻りユーザーにファーストメッセージを送信するメソッド */
  greetingToFormerUser_() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowFollowEvent(this.event);


    const messageObject = [{
      "type": "text",
      "text": "ブロック解除ありがとうございます⭐引き続きよろしくお願いします🐎🚜",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendReplyMessage(messageObject, this.replyToken);

    //5秒後　
    Utilities.sleep(500);

    const messageObject2 = [{
      "type": "text",
      "text": "こちらは2通目のメッセージです🐎🚜",
    }
    ];

    //LINEインスタンス生成
    new LINE().sendUniquePushMessage(messageObject2, this.userId);
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

    //最初の質問で、自由入力テキストを受け取るためのフラグをスプレッドシートにセットしておく
    const d = new DataSheet();
    d.appendRowFollowFormStandby(this.event);


    //3秒後
    Utilities.sleep(1000);
    const messageObject3 = ENUM_FORM["follow_Form"][0];
    new LINE().sendUniquePushMessage(messageObject3, this.userId);
    return messageObject3
  }



}



/**
 *  TEST用関数
 * */
function testFollow() {


  const e = FOLLOW_WebhookEvent_SAMPLE;
  const event = JSON.parse(e.postData.contents).events[0];

  const f = new Follow(event);
  console.log(f.name);

  console.log(f.isDomainObject());

  console.log(f.sendFirstForm_());

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
class SpotMessage {
  /** 
     * @constructor
     * @param{object} Webhookイベントオブジェクト
     */
  constructor(event) {

    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;

    //まぁ意味ないかもだけど、ちゃんとEnumから取得しようね
    this.name = ENUM_DomainObject.SpotMessage.name;

    //こいつら、共通のものはいいけど、独自なものは、自分のメソッド内で呼び出さないとエラーなるよ
    this.mode = event.mode;
    this.timestamp = Utilities.formatDate(new Date(event.timestamp), "JST", "yyyyMMdd_hh:mm:ss");
    this.replyToken = event.replyToken;
    this.userId = event.source.userId; //hasFlag_() で使用
  }

  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {

    //スプレッドシートに出力
    const d = new DataSheet();
    d.appendRowSpotMessageEvent(this.event);

    //成功処理？
    const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    GmailApp.sendEmail(ADMIN_EMAIL, "SpotInquryオブジェクト成功です", this.event.message.text);

    return "SpotMessageオブジェクトは課題を解決したのでメールを送信しました";

  }

  /** ドメインオブジェクト判定メソッド */
  isDomainObject() {
    return this.event.type === "message" ? true : false
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

      let formZone = "";

      //1通目はテキストメッセージが入ってくる
      if (this.event.type === "message") {
        const d = new DataSheet();
        d.appendRowSpotMessageEvent(this.event);
        formZone = "Form1";
      }

      //2通目以降はPostbackだけど
      if (this.event.type === "postback") {
        const d = new DataSheet();
        d.appendRowPostBackEvent(this.event);

        //今何問目？
        formZone = this.event.postback.data.match(/Form\d+|終了/)[0]; //Form2など
      }

      switch (formZone) {
        case "Form1":
          //2rdフォーム送信
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
        case "Form4":
          //5thフォーム送信
          this.sendForm5_();
          break;
        case "Form5": //終了
          //Endフォーム送信
          this.sendFormEnd_();
          break;
        case "Form6": //再送
          //フォーム1から送信させる
          this.sendForm1_();
          break;
        default:
        //処理
      }

    } catch (e) {
      GmailApp.sendEmail("kenzo@jugani-japan.com", "FollowFormでerrorです", e.message);
    }

    return "FollowFormオブジェクトは課題を解決したのでメールを送信しました"
  }





  /** ドメインオブジェクト判定メソッド
   * @return{boolean} 
   */
  isDomainObject() {

    //タイプがPostbackで、dataにfollow_Formが入ってたら、それは、FollowFormドメインオブジェクトです。
    if (this.event.type === "postback") {
      const type = this.event.postback.data.match(/follow_Form/)[0];
      return type === "follow_Form" ? true : false;
    }

    //タイプがmessageで、スプレッドシートのユーザーの直近フィールドがfollowFormStandbyなら、それは、FollowFormドメインオブジェクトです。
    if (this.event.type === "message") {

      //idでフィルターを掛けて、直近のレコードを確認する
      const d = new DataSheet();
      const records = d.getDataSheetRecords();
      const userFilter = records.filter(record => { return record["userId"] === this.userId });

      //最新行だけ取得
      const lastRow = userFilter.pop();

      //Type（A列） messageText（B列）
      const messageType = lastRow["type"];
      const messageText = lastRow["messageText"];
      return messageType === "flag" && messageText === "followFormStandby" ? true : false;
    }

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

  /** 5thフォームを送信するメソッド */
  sendForm5_() {
    //1秒後
    Utilities.sleep(1000);
    const messageObject = ENUM_FORM["follow_Form"][4];
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
function testFollowForm() {


  const e = SpotMessage_WebhookEvent_SAMPLE;
  const event = JSON.parse(e.postData.contents).events[0];

  const f = new FollowForm(event);
  console.log(f.name);

  console.log(f.isDomainObject());

}


/** 🔚 End 🔚 */

/**キーボード起動などのEmptyPostback用ドメインオブジェクト
 */
class EmptyPostback {

  /** 
    * @constructor
    * @param{object} Webhookイベントオブジェクト
    */
  constructor(event) {
    //インスタンスで使いながら、コンストラクタでも使うので
    this.event = event;
  }


  /** ドメインオブジェクトのエントリポイントと言える課題解決メソッド */
  getSolution() {
    //成功処理？
    // const ADMIN_EMAIL = PropertiesService.getScriptProperties().getProperty("ADMIN_EMAIL");
    // GmailApp.sendEmail(ADMIN_EMAIL, "SpotInquryオブジェクト成功です", this.event.message.text);

    return "EmptyPostbackオブジェクトは課題を解決したのでメールを送信しました";
  }


  /** ドメインオブジェクト判定メソッド
 * @return{boolean} 
 */
  isDomainObject() {
    //タイプがPostbackで、最後に残ったのはEmptyPostbackドメインオブジェクトです。
    if (this.event.type === "postback" && this.data === "空のPostbackです") return true
  }

}




/** 🔚 End 🔚 */
