const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const USERS = "users";
const HOUSES = "houses";
const REGIONS = "regions";
const USER_SESSIONS = "user_sessions";

const USER_STATUS = {
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active"
};

function createLogger(context) {
  const prefix = `[house][${context?.requestId || "local"}]`;
  return {
    info(tag, data) {
      console.log(`${prefix}[INFO][${tag}]`, JSON.stringify(data || {}));
    },
    error(tag, data) {
      console.error(`${prefix}[ERROR][${tag}]`, JSON.stringify(data || {}));
    }
  };
}

function success(data) {
  return { code: 0, data: data || {} };
}

function fail(message, code = -1) {
  return { code, message: message || "请求失败" };
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function getAccessTokenFromEvent(event) {
  return String(event?.auth?.accessToken || "").trim();
}

async function getSessionByAccessToken(accessToken) {
  const normalizedToken = String(accessToken || "").trim();
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
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    return null;
  }

  const res = await db.collection(USERS)
    .where({ userId: normalizedUserId, status: _.neq(USER_STATUS.DISABLED) })
    .limit(1)
    .get();

  return res.data[0] || null;
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

  return { ok: true, user };
}

function buildListWhere(payload) {
  const where = { status: "active" };
  if (payload.keyword) {
    where.title = db.RegExp({ regexp: String(payload.keyword).trim(), options: "i" });
  }
  if (payload.region) where.region = String(payload.region).trim();
  if (payload.type) where.type = String(payload.type).trim();
  if (payload.minPrice && Number(payload.minPrice) > 0) where.price = _.gte(Number(payload.minPrice));
  if (payload.maxPrice && Number(payload.maxPrice) > 0) {
    where.price = where.price ? _.and([where.price, _.lte(Number(payload.maxPrice))]) : _.lte(Number(payload.maxPrice));
  }
  return where;
}

function getSort(payload) {
  const sortBy = payload.sortBy || "latest";
  if (sortBy === "priceAsc") return { field: "price", order: "asc" };
  if (sortBy === "priceDesc") return { field: "price", order: "desc" };
  return { field: "createTime", order: "desc" };
}

async function handleGetList(payload) {
  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(20, Number(payload.pageSize || 10)));
  const where = buildListWhere(payload);
  const sort = getSort(payload);

  const countRes = await db.collection(HOUSES).where(where).count();
  const listRes = await db.collection(HOUSES)
    .where(where)
    .orderBy(sort.field, sort.order)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get();

  return success({
    list: listRes.data || [],
    page,
    pageSize,
    total: countRes.total || 0
  });
}

async function handleGetDetail(payload) {
  const houseId = String(payload.houseId || "").trim();
  if (!houseId) return fail("houseId 不能为空");
  const detail = await db.collection(HOUSES).doc(houseId).get().catch(() => null);
  if (!detail || !detail.data || detail.data.status !== "active") return fail("房源不存在", 404);
  return success(detail.data);
}

async function handleGetRegions() {
  const res = await db.collection(REGIONS)
    .where({ status: "active" })
    .orderBy("order", "asc")
    .get();

  return success((res.data || []).map((item) => ({
    name: item.name || "",
    order: Number(item.order || 0)
  })));
}

async function handleCreate(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }
  if (authState.user.role !== "landlord" && authState.user.role !== "admin") {
    return fail("无发布权限", 403);
  }
  if (!payload.title || !payload.address || !payload.type || !Number(payload.price)) {
    return fail("参数不完整");
  }

  const now = new Date();
  const data = {
    title: String(payload.title).trim(),
    price: Number(payload.price),
    paymentMethod: String(payload.paymentMethod || ""),
    minRentPeriod: Number(payload.minRentPeriod || 0),
    area: Number(payload.area || 0),
    type: String(payload.type || "").trim(),
    floor: String(payload.floor || "").trim(),
    orientation: String(payload.orientation || "").trim(),
    address: String(payload.address || "").trim(),
    description: String(payload.description || "").trim(),
    images: Array.isArray(payload.images) ? payload.images : [],
    latitude: Number(payload.latitude || 0),
    longitude: Number(payload.longitude || 0),
    contactName: String(payload.contactName || "").trim(),
    contactPhone: String(payload.contactPhone || "").trim(),
    landlordUserId: authState.user.userId,
    facilities: payload.facilities || {},
    region: String(payload.region || "").trim(),
    status: "active",
    createTime: now,
    updateTime: now
  };

  const res = await db.collection(HOUSES).add({ data });
  return success({ _id: res._id });
}

async function handleUpdate(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const houseId = String(payload.houseId || "").trim();
  if (!houseId) {
    return fail("houseId 不能为空");
  }

  const detail = await db.collection(HOUSES).doc(houseId).get().catch(() => null);
  const house = detail?.data;
  if (!house || house.status !== "active") {
    return fail("房源不存在", 404);
  }
  if (house.landlordUserId !== authState.user.userId && authState.user.role !== "admin") {
    return fail("无编辑权限", 403);
  }

  const allowFields = [
    "title", "price", "paymentMethod", "minRentPeriod", "area", "type", "floor",
    "orientation", "address", "description", "images", "latitude", "longitude",
    "contactName", "contactPhone", "facilities", "region"
  ];
  const updateData = {};
  allowFields.forEach((field) => {
    if (payload[field] !== undefined) updateData[field] = payload[field];
  });
  updateData.updateTime = new Date();

  await db.collection(HOUSES).doc(houseId).update({ data: updateData });
  return success({ updated: true, houseId });
}

async function handleRemove(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const houseId = String(payload.houseId || "").trim();
  if (!houseId) {
    return fail("houseId 不能为空");
  }

  const detail = await db.collection(HOUSES).doc(houseId).get().catch(() => null);
  const house = detail?.data;
  if (!house || house.status !== "active") {
    return fail("房源不存在", 404);
  }
  if (house.landlordUserId !== authState.user.userId && authState.user.role !== "admin") {
    return fail("无删除权限", 403);
  }

  await db.collection(HOUSES).doc(houseId).update({
    data: { status: "deleted", updateTime: new Date() }
  });

  return success({ removed: true, houseId });
}

async function handleGetMine(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(20, Number(payload.pageSize || 10)));
  const where = { landlordUserId: authState.user.userId, status: _.neq("deleted") };

  const countRes = await db.collection(HOUSES).where(where).count();
  const listRes = await db.collection(HOUSES)
    .where(where)
    .orderBy("updateTime", "desc")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get();

  return success({ list: listRes.data || [], page, pageSize, total: countRes.total || 0 });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });

  try {
    let result = fail("未知 action");
    if (action === "getList") result = await handleGetList(payload);
    if (action === "getRegions") result = await handleGetRegions();
    if (action === "getDetail") result = await handleGetDetail(payload);
    if (action === "create") result = await handleCreate(payload, event);
    if (action === "update") result = await handleUpdate(payload, event);
    if (action === "remove") result = await handleRemove(payload, event);
    if (action === "getMine") result = await handleGetMine(payload, event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
