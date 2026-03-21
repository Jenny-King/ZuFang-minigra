const bookingService = require("../../../services/booking.service");
const authUtils = require("../../../utils/auth");
const { BOOKING_STATUS, BOOKING_TIME_SLOTS } = require("../../../config/constants");
const { formatDate } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const STATUS_TEXT_MAP = {
  [BOOKING_STATUS.PENDING]: "待确认",
  [BOOKING_STATUS.CONFIRMED]: "已确认",
  [BOOKING_STATUS.REJECTED]: "已拒绝",
  [BOOKING_STATUS.RESCHEDULED]: "已改期",
  [BOOKING_STATUS.CANCELLED]: "已取消"
};

const FILTER_OPTIONS = [
  { value: "all", label: "全部" },
  { value: BOOKING_STATUS.PENDING, label: "待确认" },
  { value: BOOKING_STATUS.CONFIRMED, label: "已确认" },
  { value: BOOKING_STATUS.RESCHEDULED, label: "已改期" },
  { value: BOOKING_STATUS.REJECTED, label: "已拒绝" },
  { value: BOOKING_STATUS.CANCELLED, label: "已取消" }
];

function getTimeSlotLabel(value) {
  const slot = BOOKING_TIME_SLOTS.find((item) => item.value === value);
  return slot ? slot.label : value || "";
}

Page({
  data: {
    loading: false,
    bookings: [],
    allBookings: [],
    filterOptions: FILTER_OPTIONS,
    activeFilter: "all",
    hasMore: true
  },

  async onLoad(options) {
    logger.info("page_load", { page: "my-bookings", query: options || {} });
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
      const result = await bookingService.getMyBookings(1, 50);
      const list = Array.isArray(result.list) ? result.list : [];
      const allBookings = list.map((item) => this.normalizeBooking(item));
      this.setData({
        allBookings,
        hasMore: false
      });
      this.applyFilter();
    } catch (error) {
      logger.error("my_bookings_load_failed", { err: error.message });
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
      canCancel: status === BOOKING_STATUS.PENDING,
      rescheduleDate: item.newDate || "",
      rescheduleTimeSlotLabel: item.newTimeSlot ? getTimeSlotLabel(item.newTimeSlot) : ""
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

  async onCancelTap(event) {
    const bookingId = event.currentTarget.dataset.bookingId;
    if (!bookingId) {
      return;
    }

    try {
      const res = await wx.showModal({
        title: "取消预约",
        content: "确定要取消这条看房预约吗？",
        confirmColor: "#ef4444",
        cancelColor: "#999999"
      });

      if (!res.confirm) {
        return;
      }

      await bookingService.cancelBooking(bookingId);
      await toast.success("预约已取消");
      await this.loadBookings();
    } catch (error) {
      logger.error("booking_cancel_failed", { err: error.message });
      await toast.error(error.message || "取消失败");
    }
  }
});
