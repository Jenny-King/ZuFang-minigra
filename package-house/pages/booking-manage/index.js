const bookingService = require("../../../services/booking.service");
const authUtils = require("../../../utils/auth");
const { BOOKING_STATUS, BOOKING_TIME_SLOTS } = require("../../../config/constants");
const { formatDate } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const WEEKDAY_MAP = ["日", "一", "二", "三", "四", "五", "六"];

const STATUS_TEXT_MAP = {
  [BOOKING_STATUS.PENDING]: "待确认",
  [BOOKING_STATUS.CONFIRMED]: "已确认",
  [BOOKING_STATUS.REJECTED]: "已拒绝",
  [BOOKING_STATUS.RESCHEDULED]: "已改期",
  [BOOKING_STATUS.CANCELLED]: "已取消"
};

const FILTER_OPTIONS = [
  { value: "all", label: "全部" },
  { value: BOOKING_STATUS.PENDING, label: "待处理" },
  { value: BOOKING_STATUS.CONFIRMED, label: "已确认" },
  { value: BOOKING_STATUS.RESCHEDULED, label: "已改期" },
  { value: BOOKING_STATUS.REJECTED, label: "已拒绝" }
];

function getTimeSlotLabel(value) {
  const slot = BOOKING_TIME_SLOTS.find((item) => item.value === value);
  return slot ? slot.label : value || "";
}

function generateDateOptions(count = 14) {
  const list = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    list.push({
      value: `${year}-${month}-${day}`,
      weekday: i === 0 ? "今天" : i === 1 ? "明天" : `周${WEEKDAY_MAP[d.getDay()]}`,
      dayLabel: `${d.getMonth() + 1}/${d.getDate()}`
    });
  }
  return list;
}

Page({
  data: {
    loading: false,
    bookings: [],
    allBookings: [],
    filterOptions: FILTER_OPTIONS,
    activeFilter: "all",
    pendingCount: 0,
    hasMore: true,
    // 改期弹窗
    showRescheduleModal: false,
    rescheduleBookingId: "",
    rescheduleeDateOptions: [],
    timeSlots: BOOKING_TIME_SLOTS,
    rescheduleDate: "",
    rescheduleTimeSlot: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "booking-manage", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      return;
    }
    await this.loadBookings();
  },

  async onPullDownRefresh() {
    try {
      await this.loadBookings();
    } finally {
      wx.stopPullDownRefresh();
    }
  },

  async loadBookings() {
    this.setData({ loading: true });
    try {
      const result = await bookingService.getLandlordBookings(1, 50);
      const list = Array.isArray(result.list) ? result.list : [];
      const allBookings = list.map((item) => this.normalizeBooking(item));
      const pendingCount = allBookings.filter(
        (item) => item.status === BOOKING_STATUS.PENDING
      ).length;
      this.setData({ allBookings, pendingCount, hasMore: false });
      this.applyFilter();
    } catch (error) {
      logger.error("booking_manage_load_failed", { err: error.message });
      await toast.error(error.message || "加载预约失败");
    } finally {
      this.setData({ loading: false });
    }
  },

  normalizeBooking(item) {
    const status = item.status || BOOKING_STATUS.PENDING;
    return {
      ...item,
      bookingId: item._id || item.bookingId || "",
      houseTitle: item.houseTitle || "未命名房源",
      date: item.date || "",
      timeSlotLabel: getTimeSlotLabel(item.timeSlot),
      contactName: item.contactName || "",
      contactPhone: item.contactPhone || "",
      remark: item.remark || "",
      statusText: STATUS_TEXT_MAP[status] || status,
      statusClass: status,
      displayCreateTime: item.createTime ? formatDate(item.createTime) : "",
      canOperate: status === BOOKING_STATUS.PENDING
    };
  },

  onFilterTap(event) {
    const value = event.currentTarget.dataset.value || "all";
    this.setData({ activeFilter: value });
    this.applyFilter();
  },

  applyFilter() {
    const filter = this.data.activeFilter;
    const all = this.data.allBookings || [];
    const bookings = filter === "all"
      ? all
      : all.filter((item) => item.status === filter);
    this.setData({ bookings });
  },

  noop() {},

  async onConfirmTap(event) {
    const bookingId = event.currentTarget.dataset.bookingId;
    if (!bookingId) {
      return;
    }
    try {
      await bookingService.updateBookingStatus(bookingId, BOOKING_STATUS.CONFIRMED);
      await toast.success("已确认预约");
      await this.loadBookings();
    } catch (error) {
      logger.error("booking_confirm_failed", { err: error.message });
      await toast.error(error.message || "操作失败");
    }
  },

  async onRejectTap(event) {
    const bookingId = event.currentTarget.dataset.bookingId;
    if (!bookingId) {
      return;
    }
    try {
      const res = await wx.showModal({
        title: "拒绝预约",
        content: "确定要拒绝这条看房预约吗？",
        confirmColor: "#ef4444",
        cancelColor: "#999999"
      });
      if (!res.confirm) {
        return;
      }
      await bookingService.updateBookingStatus(bookingId, BOOKING_STATUS.REJECTED);
      await toast.success("已拒绝预约");
      await this.loadBookings();
    } catch (error) {
      logger.error("booking_reject_failed", { err: error.message });
      await toast.error(error.message || "操作失败");
    }
  },

  onRescheduleTap(event) {
    const bookingId = event.currentTarget.dataset.bookingId;
    if (!bookingId) {
      return;
    }
    this.setData({
      showRescheduleModal: true,
      rescheduleBookingId: bookingId,
      rescheduleeDateOptions: generateDateOptions(14),
      rescheduleDate: "",
      rescheduleTimeSlot: ""
    });
  },

  onCloseReschedule() {
    this.setData({
      showRescheduleModal: false,
      rescheduleBookingId: "",
      rescheduleDate: "",
      rescheduleTimeSlot: ""
    });
  },

  onRescheduleDateTap(event) {
    this.setData({ rescheduleDate: event.currentTarget.dataset.value });
  },

  onRescheduleTimeTap(event) {
    this.setData({ rescheduleTimeSlot: event.currentTarget.dataset.value });
  },

  async onConfirmReschedule() {
    const { rescheduleBookingId, rescheduleDate, rescheduleTimeSlot } = this.data;
    if (!rescheduleBookingId || !rescheduleDate || !rescheduleTimeSlot) {
      await toast.error("请选择日期和时间段");
      return;
    }

    try {
      await bookingService.updateBookingStatus(
        rescheduleBookingId,
        BOOKING_STATUS.RESCHEDULED,
        { newDate: rescheduleDate, newTimeSlot: rescheduleTimeSlot }
      );
      await toast.success("已改期");
      this.onCloseReschedule();
      await this.loadBookings();
    } catch (error) {
      logger.error("booking_reschedule_failed", { err: error.message });
      await toast.error(error.message || "改期失败");
    }
  }
});
