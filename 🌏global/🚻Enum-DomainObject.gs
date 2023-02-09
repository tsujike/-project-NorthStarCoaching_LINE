const FOLLOW_WebhookEvent_SAMPLE = { postData: { contents: '{"destination":"xxxxxxxxxx","events":[{"replyToken":"nHuyWiB7yP5Zw52FIkcQobQuGDXCTA","type":"follow","mode":"active","timestamp":1462629479859,"source":{"type":"user","userId":"U4af4980629..."},"webhookEventId":"01FZ74A0TDDPYRVKNK77XKC3ZR","deliveryContext":{"isRedelivery":false}}]}' } };

const UNFOLLOW_WebhookEvent_SAMPLE = { postData: { contents: '{"destination":"xxxxxxxxxx","events":[{"type":"unfollow","mode":"active","timestamp":1462629479859,"source":{"type":"user","userId":"U4af4980629..."},"webhookEventId":"01FZ74A0TDDPYRVKNK77XKC3ZR","deliveryContext":{"isRedelivery":false}}]}' } };

const SpotInquiry_WebhookEvent_SAMPLE = { postData: { contents: '{"destination":"xxxxxxxxxx","events":[{"replyToken":"nHuyWiB7yP5Zw52FIkcQobQuGDXCTA","type":"message","mode":"active","timestamp":1462629479859,"source":{"type":"user","userId":"U4af4980629..."},"webhookEventId":"01FZ74A0TDDPYRVKNK77XKC3ZR","deliveryContext":{"isRedelivery":false},"message":{"id":"325708","type":"text","text":"@example Hello, world! (love)","emojis":[{"index":14,"length":6,"productId":"5ac1bfd5040ab15980c9b435","emojiId":"001"}],"mention":{"mentionees":[{"index":0,"length":8,"userId":"U850014438e..."}]}}}]}' } };

/**  日時選択アクションのポストバックイベントの場合 */
const PostBack_WebhookEvent_SAMPLE = { postData: { contents: '{"destination":"xxxxxxxxxx","events":[{"replyToken":"b60d432864f44d079f6d8efe86cf404b","type":"postback","mode":"active","source":{"userId":"U91eeaf62d...","type":"user"},"timestamp":1513669370317,"webhookEventId":"01FZ74A0TDDPYRVKNK77XKC3ZR","deliveryContext":{"isRedelivery":false},"postback":{"data":"storeId=12345","params":{"datetime":"2017-12-25T01:00"}}}]}' } };



const ENUM_DomainObject = {

  Follow: {
    name: "Follow",
    webhookEvent: FOLLOW_WebhookEvent_SAMPLE
  },
  UnFollow: {
    name: "UnFollow",
    webhookEvent: UNFOLLOW_WebhookEvent_SAMPLE
  },
  SpotInquiry: {
    name: "SpotInquiry",
    webhookEvent: SpotInquiry_WebhookEvent_SAMPLE
  },
  PostBack: {
    name: "PostBack",
    webhookEvent: PostBack_WebhookEvent_SAMPLE
  },

};
