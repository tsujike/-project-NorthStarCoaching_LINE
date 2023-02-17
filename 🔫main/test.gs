//Webhookオブジェクトの動作確認
function test_Webhook() {

  const e = FOLLOW_WebhookEvent_SAMPLE;
  const event = JSON.parse(e.postData.contents).events[0];

  //ドメインオブジェクト群
  const domainObjects = {
    Follow: new Follow(event),
    // Unfollow: new Unfollow(this.event)
    //ドメインオブジェクトに変更があったら足す
  }

  for (const domainObject in domainObjects) {

    console.log(domainObject);
    console.log(domainObjects[domainObject]);
    console.log(domainObjects[domainObject].event);
    console.log(domainObjects[domainObject].event.type);
    console.log(domainObjects[domainObject].getSolution());
    console.log(domainObjects[domainObject].getHello());
    console.log(domainObjects[domainObject].isDomainObject());
  }

}




//ドメインオブジェクトを追加したときのテスト関数
function test_doPost() {
  const exports = GASUnit.exports
  const assertThat = AssertGAS.assertThat

  exports({
    'LINE公式アカウントのテストです': {
      '#doPost(e)のテストです': {
        'SpotMessageオブジェクトテスト': function () {
          const e = SpotMessage_WebhookEvent_SAMPLE;
        const result = doPost(e);
        const expectation = "SpotMessageオブジェクトは課題を解決したのでメールを送信しました"
        assertThat(result).is(expectation);
        },
        // 'Followオブジェクトテスト': function () {　//replyTokenがあるから通らないよ
        //   const e = FOLLOW_WebhookEvent_SAMPLE;
        //   const result = doPost(e);
        //   const expectation = "Followオブジェクトは課題を解決したのでメールを送信しました"
        //   assertThat(result).is(expectation);
        // },
        // 'UnFollowオブジェクトテスト': function () {
        //   const e = UNFOLLOW_WebhookEvent_SAMPLE;
        //   const result = doPost(e);
        //   const expectation = "UnFollowオブジェクトは課題を解決したのでメールを送信しました"
        //   assertThat(result).is(expectation);
        // },
        // 'PostBackオブジェクトテスト': function () {
        //   const e = FOLLOW_WebhookEvent_SAMPLE;
        // const result = doPost(e);
        // const expectation = "Followオブジェクトは課題を解決したのでメールを送信しました"
        // assertThat(result).is(expectation);
        // }





      }
    }
  })
}




