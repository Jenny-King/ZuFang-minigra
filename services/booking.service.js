const { callCloud } = require("./cloud/call");
const { REQUEST_DEFAULT } = require("../config/constants");
const { assertNonEmptyString, assertPositiveInteger } = require("../utils/assert");

/**
 * 创建预约
 */
async function createBooking(params = {}) {
  assertNonEmptyString(params.houseId, "houseId");
  assertNonEmptyString(params.landlordUserId, "landlordUserId");
  assertNonEmptyString(params.date, "date");
  assertNonEmptyString(params.timeSlot, "timeSlot");
  assertNonEmptyString(params.contactPhone, "contactPhone");

  return callCloud("booking", "create", {
    houseId: params.houseId.trim(),
    landlordUserId: params.landlordUserId.trim(),
    date: params.date.trim(),
    timeSlot: params.timeSlot.trim(),
    contactName: (params.contactName || "").trim(),
    contactPhone: params.contactPhone.trim(),
    remark: (params.remark || "").trim()
  });
}

/**
 * 获取我的预约列表（租客视角）
 */
async function getMyBookings(
  page = REQUEST_DEFAULT.PAGE,
  pageSize = REQUEST_DEFAULT.PAGE_SIZE
) {
  assertPositiveInteger(page, "page");
  assertPositiveInteger(pageSize, "pageSize");

  return callCloud("booking", "getMyBookings", { page, pageSize });
}

/**
 * 获取房东收到的预约列表
 */
async function getLandlordBookings(
  page = REQUEST_DEFAULT.PAGE,
  pageSize = REQUEST_DEFAULT.PAGE_SIZE
) {
  assertPositiveInteger(page, "page");
  assertPositiveInteger(pageSize, "pageSize");

  return callCloud("booking", "getLandlordBookings", { page, pageSize });
}

/**
 * 更新预约状态（房东操作）
 */
async function updateBookingStatus(bookingId, status, rescheduleInfo) {
  assertNonEmptyString(bookingId, "bookingId");
  assertNonEmptyString(status, "status");

  const params = {
    bookingId: bookingId.trim(),
    status: status.trim()
  };

  if (rescheduleInfo) {
    params.newDate = (rescheduleInfo.newDate || "").trim();
    params.newTimeSlot = (rescheduleInfo.newTimeSlot || "").trim();
  }

  return callCloud("booking", "updateStatus", params);
}

/**
 * 取消预约（租客操作）
 */
async function cancelBooking(bookingId) {
  assertNonEmptyString(bookingId, "bookingId");

  return callCloud("booking", "cancel", { bookingId: bookingId.trim() });
}

/**
 * 获取预约详情
 */
async function getBookingDetail(bookingId) {
  assertNonEmptyString(bookingId, "bookingId");

  return callCloud("booking", "getDetail", { bookingId: bookingId.trim() });
}

/**
 * 获取我的预约数量（用于 profile 仪表盘）
 */
async function getMyBookingCount() {
  return callCloud("booking", "getMyCount", {});
}

module.exports = {
  createBooking,
  getMyBookings,
  getLandlordBookings,
  updateBookingStatus,
  cancelBooking,
  getBookingDetail,
  getMyBookingCount
};
