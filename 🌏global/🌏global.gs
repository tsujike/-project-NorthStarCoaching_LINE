function setPropertyStore() {

  //アクセストークン設置
  const properties = PropertiesService.getScriptProperties();

  //設置用
  // const ACCESS_TOKEN = "ここにアクセストークンを入力して実行する";
  // properties.setProperty('ACCESS_TOKEN', ACCESS_TOKEN);
  // const a = properties.getProperty('ACCESS_TOKEN');
  // console.log(a);

  // const SPREADSHEET_ID = "ここにスプレッドシートIDを入力して実行する";
  // properties.setProperty('SPREADSHEET_ID', SPREADSHEET_ID);

  // const TESTUSER_ID = "ここにユーザーIDを入力して実行する";
  // properties.setProperty('TESTUSER_ID', TESTUSER_ID);

  // const ADMIN_EMAIL = "ここにメルアドを入力して実行する";
  // properties.setProperty('ADMIN_EMAIL', ADMIN_EMAIL);

}

// 【使用ライブラリ】

// AssertGAS
// 1Ci_-jGA_7V8FlBYrwm-iszV4ycrFhro5fQiVsjKtMA_4bNYlcZ1QIWh1

// GASUnit
// 1Bnt8-tN4ddGVzXXIkzV_AtuuMzdlmlSyKWO7KS4TAVQYgM2GJT5WC9eU

//テストの使い方
function test_array() {

  const exports = GASUnit.exports
  const assertThat = AssertGAS.assertThat

  exports({
    'Array': {
      '#indexOf()': {
        'should return -1 when not present': function () {
          const index = [1, 2, 3].indexOf(4)
          assertThat(index).is(-1)
        },
        'should return the index when present': function () {
          const index = [1, 2, 3].indexOf(3)
          assertThat(index).is(2)
        }
      }
    }
  })
}

//公式情報
//LINE Developers:tgrecords912
//name:OKRTerm1公式テストアカウント
//ID:@675qdkio
//URL:https://lin.ee/4ENhT0k
//QR:https://qr-official.line.me/gs/M_675qdkio_GW.png



//処理の流れ

//LINEからWebhookイベントを、doPost(e)←デプロイされている、が受け取る 
//単体のイベントオブジェクトを取得する
//const event = JSON.parse(e.postData.contents).events[0];

//それをアプリケーション層に渡しながらインスタンスを生成する 
//const app = new Application(event);
//（アプリケーション層のコンストラクタでは、ドメインオブジェクトを選択する装置が実装されている）
//（判定のために、各ドメインオブジェクトにisDomainObject()メソッドが実装されていることが特徴的。判定だからネストが深くなる可能性高い💦）

//アプリケーション層のメソッドを走らせる（戻り値は処理とは関係ない）ポリモーフィズム
//const result = app.getSolutions();

//ドメインオブジェクトのgetSolution()メソッドを実行する。（これもポリモーフィズム）
// const domainObject = this.getDomainObject_();
// const result = domainObject.getSolution();

//ドメインオブジェクトのgetSolution()メソッドでは、ドメインオブジェクトの責務(ドメインオブジェクトのエントリポイントと言える課題解決メソッド)が書かれている。処理はなんでもOK
//さらにサブメソッドを呼び出すことは、ザラにあるでしょう。


