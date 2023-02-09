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



