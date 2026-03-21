const { BOOKING_STATUS } = require("../config/constants");

function parseStructuredContent(content) {
  if (!content) {
    return null;
  }

  if (typeof content === "object") {
    return content;
  }

  const normalizedContent = String(content).trim();
  if (!normalizedContent || !/^[{\[]/.test(normalizedContent)) {
    return null;
  }

  try {
    return JSON.parse(normalizedContent);
  } catch {
    return null;
  }
}

function parseBookingMessage(content) {
  const parsed = parseStructuredContent(content);
  if (!parsed || Array.isArray(parsed) || typeof parsed !== "object") {
    return null;
  }

  const normalizedType = String(parsed.type || parsed.messageType || "").trim().toLowerCase();
  if (normalizedType !== "booking") {
    return null;
  }

  return {
    bookingId: String(parsed.bookingId || "").trim(),
    houseTitle: String(parsed.houseTitle || "").trim() || "房源",
    date: String(parsed.date || "").trim(),
    timeSlot: String(parsed.timeSlot || "").trim(),
    timeSlotLabel: String(parsed.timeSlotLabel || parsed.timeSlot || "").trim(),
    status: String(parsed.status || "").trim() || BOOKING_STATUS.PENDING
  };
}

function getConversationPreviewText(lastMessage, fallback = "暂无消息") {
  if (parseBookingMessage(lastMessage)) {
    return "发起了预约看房申请";
  }

  const previewText = typeof lastMessage === "string" ? lastMessage.trim() : "";
  return previewText || fallback;
}

module.exports = {
  parseBookingMessage,
  getConversationPreviewText
};
