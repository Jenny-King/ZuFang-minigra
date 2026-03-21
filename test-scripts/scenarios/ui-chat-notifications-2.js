const { ROUTES } = require("../../config/routes");
const {
  navigateToAndWait,
  switchTabAndWait,
  waitForPageData
} = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { ensureLoggedInByInjection } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-chat-notifications-2", async (miniProgram) => {
  const context = await ensureLoggedInByInjection(miniProgram, { accountKey: "tenant" });

  const chatPage = await switchTabAndWait(miniProgram, ROUTES.CHAT);
  const chatData = await waitForPageData(chatPage, (data) => (
    Array.isArray(data.conversationList)
    && data.conversationList.length > 0
    && !data.errorText
  ), "消息列表");

  console.log(`[ui-chat-notifications-2] conversations=${chatData.conversationList.length}`);
  await takeSimulatorScreen("ui-chat-notifications", "chat-list");

  const chatDetailPage = await navigateToAndWait(
    miniProgram,
    `${ROUTES.CHAT_DETAIL}?conversationId=${context.conversationId}&targetUserId=${context.landlordUserId}&houseId=${context.primaryHouseId}`
  );
  const chatDetailData = await waitForPageData(chatDetailPage, (data) => (
    String(data.conversationId || "") === context.conversationId
    && Array.isArray(data.messageList)
    && data.messageList.length > 0
  ), "聊天详情");

  console.log(`[ui-chat-notifications-2] messages=${chatDetailData.messageList.length}`);
  await takeSimulatorScreen("ui-chat-notifications", "chat-detail");

  const notificationsPage = await navigateToAndWait(miniProgram, ROUTES.PROFILE_NOTIFICATIONS);
  const notificationsData = await waitForPageData(notificationsPage, (data) => (
    Array.isArray(data.list)
    && data.list.length > 0
    && !data.errorText
  ), "通知列表");

  console.log(`[ui-chat-notifications-2] notifications=${notificationsData.list.length}`);
  await takeSimulatorScreen("ui-chat-notifications", "notifications");
});
