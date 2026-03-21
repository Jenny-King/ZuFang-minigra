const { BOOKING_STATUS } = require("../../config/constants");
const { parseBookingMessage, getConversationPreviewText } = require("../../utils/chat-message");

describe("utils/chat-message", () => {
  it("parses booking payload from JSON string", () => {
    const parsed = parseBookingMessage(JSON.stringify({
      type: "booking",
      bookingId: "booking_1",
      houseTitle: "软件园一居室",
      date: "2026-03-21",
      timeSlot: "14:00-15:00",
      timeSlotLabel: "14:00 - 15:00",
      status: BOOKING_STATUS.PENDING
    }));

    expect(parsed).toEqual({
      bookingId: "booking_1",
      houseTitle: "软件园一居室",
      date: "2026-03-21",
      timeSlot: "14:00-15:00",
      timeSlotLabel: "14:00 - 15:00",
      status: BOOKING_STATUS.PENDING
    });
  });

  it("returns semantic preview text for booking payload", () => {
    const previewText = getConversationPreviewText(JSON.stringify({
      type: "booking",
      bookingId: "booking_2"
    }));

    expect(previewText).toBe("发起了预约看房申请");
  });

  it("falls back to the original text for plain messages", () => {
    expect(getConversationPreviewText("你好，在吗？")).toBe("你好，在吗？");
    expect(parseBookingMessage("你好，在吗？")).toBeNull();
  });
});
