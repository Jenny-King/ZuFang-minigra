const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

const USERS = "users";
const HOUSES = "houses";
const BOOKINGS = "bookings";
const USER_SESSIONS = "user_sessions";

const USER_STATUS = {
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active"
};

const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  REJECTED: "rejected",
  RESCHEDULED: "rescheduled",
  CANCELLED: "cancelled"
};

function createLogger(context) {
  const prefix = `[booking][${context?.requestId || "local"}]`;
  return {
    info(tag, data) {
      console.log(`${prefix}[INFO][${tag}]`, JSON.stringify(data || {}));
    },
    error(tag, data) {
      console.error(`${prefix}[ERROR][${tag}]`, JSON.stringify(data || {}));
    }
  };
}

function success(data, message = "") {
  return {
    code: 0,
    data: data === undefined ? null : data,
    message: String(message || "")
  };
}

function fail(message, code = -1, data = null) {
  return {
    code,
    data: data === undefined ? null : data,
    message: message || "请求失败"
  };
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function getAccessTokenFromEvent(event) {
  return String(event?.auth?.accessToken || "").trim();
}

function getPayload(event) {
  const payload = event?.payload;
  return payload && Object.prototype.toString.call(payload) === "[object Object]"
    ? payload
    : (event || {});
}

function normalizeString(value) {
  return String(value || "").trim();
}

async function getSessionByAccessToken(accessToken) {
  const normalizedToken = normalizeString(accessToken);
  if (!normalizedToken) {
    return null;
  }

  const tokenHash = hashToken(normalizedToken);
  const detail = await db.collection(USER_SESSIONS).doc(tokenHash).get().catch(() => null);
  const session = detail?.data;

  if (!session || !session.userId) {
    return null;
  }
  if (session.status !== SESSION_STATUS.ACTIVE) {
    return null;
  }
  if (new Date(session.expireAt).getTime() <= Date.now()) {
    return null;
  }

  return session;
}

async function getUserByUserId(userId) {
  const normalizedUserId = normalizeString(userId);
  if (!normalizedUserId) {
    return null;
  }

  const res = await db.collection(USERS)
    .where({ userId: normalizedUserId, status: _.neq(USER_STATUS.DISABLED) })
    .limit(1)
    .get();

  return res.data[0] || null;
}

async function getHouseById(houseId) {
  const normalizedHouseId = normalizeString(houseId);
  if (!normalizedHouseId) {
    return null;
  }

  const detail = await db.collection(HOUSES).doc(normalizedHouseId).get().catch(() => null);
  return detail?.data || null;
}

async function getBookingById(bookingId) {
  const normalizedBookingId = normalizeString(bookingId);
  if (!normalizedBookingId) {
    return null;
  }

  const detail = await db.collection(BOOKINGS).doc(normalizedBookingId).get().catch(() => null);
  return detail?.data || null;
}

async function resolveCurrentUser(event) {
  const accessToken = getAccessTokenFromEvent(event);
  if (!accessToken) {
    return { ok: false, result: fail("未登录或登录已过期", 401) };
  }

  const session = await getSessionByAccessToken(accessToken);
  if (!session) {
    return { ok: false, result: fail("未登录或登录已过期", 401) };
  }

  const user = await getUserByUserId(session.userId);
  if (!user) {
    return { ok: false, result: fail("账号不存在或已失效", 401) };
  }

  return { ok: true, user, session };
}

async function handleCreate(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const houseId = normalizeString(payload.houseId);
  const payloadLandlordUserId = normalizeString(payload.landlordUserId);
  const date = normalizeString(payload.date);
  const timeSlot = normalizeString(payload.timeSlot);
  const contactName = normalizeString(payload.contactName);
  const contactPhone = normalizeString(payload.contactPhone);
  const remark = normalizeString(payload.remark);

  if (!houseId || !date || !timeSlot || !contactPhone) {
    return fail("缺少必要参数", 400);
  }

  const house = await getHouseById(houseId);
  if (!house) {
    return fail("房源不存在", 404);
  }

  const landlordUserId = normalizeString(house.landlordUserId || payloadLandlordUserId);
  if (!landlordUserId) {
    return fail("房东信息缺失", 400);
  }

  if (payloadLandlordUserId && payloadLandlordUserId !== landlordUserId) {
    return fail("房东信息不匹配", 400);
  }

  if (authState.user.userId === landlordUserId) {
    return fail("不能预约自己发布的房源", 400);
  }

  const now = new Date();
  const booking = {
    houseId,
    houseTitle: normalizeString(house.title),
    landlordUserId,
    tenantUserId: authState.user.userId,
    date,
    timeSlot,
    contactName: contactName || normalizeString(authState.user.nickName),
    contactPhone,
    remark,
    status: BOOKING_STATUS.PENDING,
    createTime: now,
    updateTime: now
  };

  const result = await db.collection(BOOKINGS).add({ data: booking });

  return success({
    bookingId: result._id
  }, "预约创建成功");
}

async function handleGetMyBookings(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(50, Number(payload.pageSize || 10)));
  const skip = (page - 1) * pageSize;
  const where = { tenantUserId: authState.user.userId };

  const countRes = await db.collection(BOOKINGS).where(where).count();
  const listRes = await db.collection(BOOKINGS)
    .where(where)
    .orderBy("createTime", "desc")
    .skip(skip)
    .limit(pageSize)
    .get();

  return success({
    list: listRes.data || [],
    total: countRes.total || 0,
    page,
    pageSize
  });
}

async function handleGetLandlordBookings(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(50, Number(payload.pageSize || 10)));
  const skip = (page - 1) * pageSize;
  const where = { landlordUserId: authState.user.userId };

  const countRes = await db.collection(BOOKINGS).where(where).count();
  const listRes = await db.collection(BOOKINGS)
    .where(where)
    .orderBy("createTime", "desc")
    .skip(skip)
    .limit(pageSize)
    .get();

  return success({
    list: listRes.data || [],
    total: countRes.total || 0,
    page,
    pageSize
  });
}

async function handleUpdateStatus(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const bookingId = normalizeString(payload.bookingId);
  const status = normalizeString(payload.status);
  const newDate = normalizeString(payload.newDate);
  const newTimeSlot = normalizeString(payload.newTimeSlot);

  if (!bookingId || !status) {
    return fail("缺少必要参数", 400);
  }

  const booking = await getBookingById(bookingId);
  if (!booking) {
    return fail("预约不存在", 404);
  }

  if (booking.landlordUserId !== authState.user.userId) {
    return fail("无权操作此预约", 403);
  }

  const updateData = {
    status,
    updateTime: new Date()
  };

  if (status === BOOKING_STATUS.RESCHEDULED) {
    if (!newDate || !newTimeSlot) {
      return fail("改期时间不能为空", 400);
    }
    updateData.newDate = newDate;
    updateData.newTimeSlot = newTimeSlot;
  }

  await db.collection(BOOKINGS).doc(bookingId).update({ data: updateData });

  return success({
    updated: true
  }, "预约状态已更新");
}

async function handleCancel(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const bookingId = normalizeString(payload.bookingId);
  if (!bookingId) {
    return fail("缺少预约 ID", 400);
  }

  const booking = await getBookingById(bookingId);
  if (!booking) {
    return fail("预约不存在", 404);
  }

  if (booking.tenantUserId !== authState.user.userId) {
    return fail("无权取消此预约", 403);
  }

  if (booking.status !== BOOKING_STATUS.PENDING) {
    return fail("仅待确认的预约可取消", 400);
  }

  await db.collection(BOOKINGS).doc(bookingId).update({
    data: {
      status: BOOKING_STATUS.CANCELLED,
      updateTime: new Date()
    }
  });

  return success({
    cancelled: true
  }, "预约已取消");
}

async function handleGetDetail(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const bookingId = normalizeString(payload.bookingId);
  if (!bookingId) {
    return fail("缺少预约 ID", 400);
  }

  const booking = await getBookingById(bookingId);
  if (!booking) {
    return fail("预约不存在", 404);
  }

  if (booking.tenantUserId !== authState.user.userId && booking.landlordUserId !== authState.user.userId) {
    return fail("无权查看此预约", 403);
  }

  return success(booking);
}

async function handleGetMyCount(event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const countRes = await db.collection(BOOKINGS)
    .where({ tenantUserId: authState.user.userId })
    .count();

  return success({
    count: countRes.total || 0
  });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = normalizeString(event?.action);
  const payload = getPayload(event);
  logger.info("start", { action });

  try {
    let result = fail(`未知操作: ${action}`, 400);

    if (action === "create") result = await handleCreate(payload, event);
    if (action === "getMyBookings") result = await handleGetMyBookings(payload, event);
    if (action === "getLandlordBookings") result = await handleGetLandlordBookings(payload, event);
    if (action === "updateStatus") result = await handleUpdateStatus(payload, event);
    if (action === "cancel") result = await handleCancel(payload, event);
    if (action === "getDetail") result = await handleGetDetail(payload, event);
    if (action === "getMyCount") result = await handleGetMyCount(event);

    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
