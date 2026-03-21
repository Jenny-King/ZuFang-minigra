const bookingService = require("../../../services/booking.service");
const chatService = require("../../../services/chat.service");
const houseService = require("../../../services/house.service");
const authUtils = require("../../../utils/auth");
const { BOOKING_TIME_SLOTS, MESSAGE_TYPE } = require("../../../config/constants");
const { formatPrice, fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const WEEKDAY_MAP = ["日", "一", "二", "三", "四", "五", "六"];

function generateDateOptions(count = 14) {
  const list = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const value = `${year}-${month}-${day}`;
    const weekday = i === 0 ? "今天" : i === 1 ? "明天" : `周${WEEKDAY_MAP[d.getDay()]}`;
    const dayLabel = `${d.getMonth() + 1}/${d.getDate()}`;

    list.push({
      value,
      weekday,
      dayLabel,
      disabled: false
    });
  }
  return list;
}

Page({
  data: {
    houseId: "",
    landlordUserId: "",
    conversationId: "",
    houseCard: null,
    dateOptions: [],
    timeSlots: BOOKING_TIME_SLOTS,
    selectedDate: "",
    selectedTimeSlot: "",
    contactName: "",
    contactPhone: "",
    remark: "",
    submitting: false,
    canSubmit: false
  },

  async onLoad(options) {
    logger.info("page_load", { page: "booking/form", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      return;
    }

    const houseId = options && options.houseId ? String(options.houseId) : "";
    const landlordUserId = options && options.landlordUserId ? String(options.landlordUserId) : "";
    const conversationId = options && options.conversationId ? String(options.conversationId) : "";

    if (!houseId) {
      await toast.error("缺少房源信息");
      return;
    }

    const loginUser = authUtils.getLoginUser() || {};
    const dateOptions = generateDateOptions(14);

    this.setData({
      houseId,
      landlordUserId,
      conversationId,
      dateOptions,
      contactName: loginUser.nickName || "",
      contactPhone: loginUser.phone || ""
    });

    await this.loadHouseCard();
    this.checkCanSubmit();
  },

  async loadHouseCard() {
    if (!this.data.houseId) {
      return;
    }
    try {
      const detail = await houseService.getHouseDetail(this.data.houseId);
      if (!detail) {
        return;
      }
      const images = Array.isArray(detail.images) ? detail.images.filter(Boolean) : [];
      this.setData({
        houseCard: {
          imageUrl: images[0] || "/assets/images/house-placeholder.png",
          title: fallbackText(detail.title, "未命名房源"),
          priceText: formatPrice(Number(detail.price || 0)),
          address: fallbackText(detail.address, "地址待完善")
        },
        landlordUserId: this.data.landlordUserId || detail.landlordUserId || ""
      });
    } catch (error) {
      logger.warn("booking_load_house_failed", { err: error.message });
    }
  },

  onDateTap(event) {
    const value = event.currentTarget.dataset.value;
    const disabled = event.currentTarget.dataset.disabled;
    if (disabled) {
      return;
    }
    this.setData({ selectedDate: value });
    this.checkCanSubmit();
  },

  onTimeSlotTap(event) {
    const value = event.currentTarget.dataset.value;
    this.setData({ selectedTimeSlot: value });
    this.checkCanSubmit();
  },

  onContactNameInput(event) {
    this.setData({ contactName: event.detail.value || "" });
    this.checkCanSubmit();
  },

  onContactPhoneInput(event) {
    this.setData({ contactPhone: event.detail.value || "" });
    this.checkCanSubmit();
  },

  onRemarkInput(event) {
    this.setData({ remark: event.detail.value || "" });
  },

  checkCanSubmit() {
    const { selectedDate, selectedTimeSlot, contactPhone } = this.data;
    const phoneValid = /^1\d{10}$/.test(String(contactPhone).trim());
    this.setData({
      canSubmit: Boolean(selectedDate && selectedTimeSlot && phoneValid)
    });
  },

  async onSubmitTap() {
    if (this.data.submitting || !this.data.canSubmit) {
      return;
    }

    const contactPhone = String(this.data.contactPhone).trim();
    if (!/^1\d{10}$/.test(contactPhone)) {
      await toast.error("请输入正确的手机号");
      return;
    }

    if (!this.data.landlordUserId) {
      await toast.error("房东信息缺失，无法预约");
      return;
    }

    this.setData({ submitting: true });

    try {
      const result = await bookingService.createBooking({
        houseId: this.data.houseId,
        landlordUserId: this.data.landlordUserId,
        date: this.data.selectedDate,
        timeSlot: this.data.selectedTimeSlot,
        contactName: this.data.contactName,
        contactPhone,
        remark: this.data.remark
      });

      logger.info("booking_created", { bookingId: result && result.bookingId });

      // 自动发送预约消息到会话
      await this.sendBookingMessage(result);

      await toast.success("预约提交成功");

      setTimeout(() => {
        wx.navigateBack();
      }, 1200);
    } catch (error) {
      logger.error("booking_create_failed", { err: error.message });
      await toast.error(error.message || "预约提交失败");
    } finally {
      this.setData({ submitting: false });
    }
  },

  async sendBookingMessage(bookingResult) {
    try {
      let conversationId = this.data.conversationId;

      if (!conversationId && this.data.landlordUserId && this.data.houseId) {
        const convResult = await chatService.createOrGetConversation(
          this.data.landlordUserId,
          this.data.houseId
        );
        conversationId = convResult && convResult.conversationId ? convResult.conversationId : "";
      }

      if (!conversationId) {
        logger.warn("booking_send_msg_skipped", { reason: "no_conversation" });
        return;
      }

      const slotLabel = BOOKING_TIME_SLOTS.find(
        (item) => item.value === this.data.selectedTimeSlot
      );
      const content = JSON.stringify({
        type: "booking",
        bookingId: bookingResult && bookingResult.bookingId ? bookingResult.bookingId : "",
        houseId: this.data.houseId,
        houseTitle: this.data.houseCard ? this.data.houseCard.title : "",
        date: this.data.selectedDate,
        timeSlot: this.data.selectedTimeSlot,
        timeSlotLabel: slotLabel ? slotLabel.label : this.data.selectedTimeSlot,
        contactName: this.data.contactName,
        status: "pending"
      });

      await chatService.sendMessage(conversationId, content, MESSAGE_TYPE.BOOKING);
      logger.info("booking_msg_sent", { conversationId });
    } catch (error) {
      logger.warn("booking_send_msg_failed", { err: error.message });
    }
  }
});
