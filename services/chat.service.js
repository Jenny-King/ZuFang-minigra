const { callCloud } = require("./cloud/call");
const { REQUEST_DEFAULT, MESSAGE_TYPE } = require("../config/constants");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

function assertPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${fieldName} 必须是正整数`);
  }
}

async function getConversationList(params = {}) {
  return callCloud("chat", "getConversations", params);
}

async function getMessageList(
  conversationId,
  page = REQUEST_DEFAULT.PAGE,
  pageSize = REQUEST_DEFAULT.PAGE_SIZE
) {
  assertNonEmptyString(conversationId, "conversationId");
  assertPositiveInteger(page, "page");
  assertPositiveInteger(pageSize, "pageSize");

  return callCloud("chat", "getMessages", {
    conversationId: conversationId.trim(),
    page,
    pageSize
  });
}

async function createOrGetConversation(targetUserId, houseId) {
  assertNonEmptyString(targetUserId, "targetUserId");
  assertNonEmptyString(houseId, "houseId");

  return callCloud("chat", "createConversation", {
    targetUserId: targetUserId.trim(),
    houseId: houseId.trim()
  });
}

async function sendMessage(conversationId, content, messageType = MESSAGE_TYPE.TEXT) {
  assertNonEmptyString(conversationId, "conversationId");
  assertNonEmptyString(content, "content");

  return callCloud("chat", "sendMessage", {
    conversationId: conversationId.trim(),
    content: content.trim(),
    messageType
  });
}

async function markConversationRead(conversationId) {
  assertNonEmptyString(conversationId, "conversationId");
  return callCloud("chat", "markRead", { conversationId: conversationId.trim() });
}

async function getNotificationList(params = {}) {
  return callCloud("chat", "getNotifications", params);
}

async function markNotificationRead(messageId) {
  assertNonEmptyString(messageId, "messageId");
  return callCloud("chat", "markNotificationRead", { messageId: messageId.trim() });
}

module.exports = {
  getConversationList,
  getMessageList,
  createOrGetConversation,
  sendMessage,
  markConversationRead,
  getNotificationList,
  markNotificationRead
};
