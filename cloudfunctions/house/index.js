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

const PAYMENT_METHOD_OPTIONS = ["月付", "季付", "半年付", "年付"];
const PHONE_REGEXP = /^1\d{10}$/;

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

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizePositiveNumber(value, fieldName) {
  const normalized = Number(value);
  if (!Number.isFinite(normalized) || normalized <= 0) {
    throw new Error(`${fieldName} 必须大于 0`);
  }
  return normalized;
}

function normalizeOptionalNumber(value, fieldName) {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const normalized = Number(value);
  if (!Number.isFinite(normalized)) {
    throw new Error(`${fieldName} 格式错误`);
  }

  return normalized;
}

function normalizeMinRentPeriod(value) {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  const normalized = Number(value);
  if (!Number.isInteger(normalized) || normalized <= 0) {
    throw new Error("minRentPeriod 必须是正整数");
  }

  return normalized;
}

function normalizeImageList(images, { required = false } = {}) {
  if (!Array.isArray(images)) {
    throw new Error("images 必须是数组");
  }

  const normalized = images
    .map((item) => normalizeString(item))
    .filter(Boolean);

  if (required && !normalized.length) {
    throw new Error("请至少上传 1 张图片");
  }

  if (!normalized.length && images.length) {
    throw new Error("images 中包含无效图片地址");
  }

  return normalized;
}

function normalizeFacilities(facilities) {
  if (facilities === undefined) {
    return {};
  }

  if (!isPlainObject(facilities)) {
    throw new Error("facilities 必须是对象");
  }

  return Object.keys(facilities).reduce((acc, key) => {
    acc[key] = Boolean(facilities[key]);
    return acc;
  }, {});
}

function validatePaymentMethod(paymentMethod) {
  const normalized = normalizeString(paymentMethod);
  if (!PAYMENT_METHOD_OPTIONS.includes(normalized)) {
    throw new Error("paymentMethod 不合法");
  }
  return normalized;
}

function resolveCreatePaymentMethod(paymentMethod) {
  if (paymentMethod === undefined) {
    return PAYMENT_METHOD_OPTIONS[0];
  }

  return validatePaymentMethod(paymentMethod);
}

function validateContactPhone(contactPhone) {
  const normalized = normalizeString(contactPhone);
  if (!PHONE_REGEXP.test(normalized)) {
    throw new Error("contactPhone 格式错误");
  }
  return normalized;
}

function buildCreateData(payload) {
  const title = normalizeString(payload.title);
  const type = normalizeString(payload.type);
  const layoutText = normalizeString(payload.layoutText) || type;
  const address = normalizeString(payload.address);

  if (!title) {
    throw new Error("title 不能为空");
  }

  if (!type) {
    throw new Error("type 不能为空");
  }

  if (!address) {
    throw new Error("address 不能为空");
  }

  return {
    title,
    price: normalizePositiveNumber(payload.price, "price"),
    paymentMethod: resolveCreatePaymentMethod(payload.paymentMethod),
    minRentPeriod: normalizeMinRentPeriod(payload.minRentPeriod),
    area: normalizePositiveNumber(payload.area, "area"),
    type,
    layoutText,
    floor: normalizeString(payload.floor),
    orientation: normalizeString(payload.orientation),
    address,
    description: normalizeString(payload.description),
    images: normalizeImageList(payload.images, { required: true }),
    latitude: normalizeOptionalNumber(payload.latitude, "latitude"),
    longitude: normalizeOptionalNumber(payload.longitude, "longitude"),
    contactName: normalizeString(payload.contactName),
    contactPhone: validateContactPhone(payload.contactPhone),
    facilities: normalizeFacilities(payload.facilities),
    region: normalizeString(payload.region)
  };
}

function buildUpdateData(payload) {
  const updateData = {};

  if (payload.title !== undefined) {
    const title = normalizeString(payload.title);
    if (!title) {
      throw new Error("title 不能为空");
    }
    updateData.title = title;
  }

  if (payload.price !== undefined) {
    updateData.price = normalizePositiveNumber(payload.price, "price");
  }

  if (payload.paymentMethod !== undefined) {
    updateData.paymentMethod = validatePaymentMethod(payload.paymentMethod);
  }

  if (payload.minRentPeriod !== undefined) {
    updateData.minRentPeriod = normalizeMinRentPeriod(payload.minRentPeriod);
  }

  if (payload.area !== undefined) {
    updateData.area = normalizePositiveNumber(payload.area, "area");
  }

  if (payload.type !== undefined) {
    const type = normalizeString(payload.type);
    if (!type) {
      throw new Error("type 不能为空");
    }
    updateData.type = type;
  }

  if (payload.layoutText !== undefined) {
    updateData.layoutText = normalizeString(payload.layoutText);
  }

  if (payload.address !== undefined) {
    const address = normalizeString(payload.address);
    if (!address) {
      throw new Error("address 不能为空");
    }
    updateData.address = address;
  }

  if (payload.images !== undefined) {
    updateData.images = normalizeImageList(payload.images, { required: true });
  }

  if (payload.contactPhone !== undefined) {
    updateData.contactPhone = validateContactPhone(payload.contactPhone);
  }

  if (payload.description !== undefined) updateData.description = normalizeString(payload.description);
  if (payload.floor !== undefined) updateData.floor = normalizeString(payload.floor);
  if (payload.orientation !== undefined) updateData.orientation = normalizeString(payload.orientation);
  if (payload.contactName !== undefined) updateData.contactName = normalizeString(payload.contactName);
  if (payload.region !== undefined) updateData.region = normalizeString(payload.region);
  if (payload.latitude !== undefined) updateData.latitude = normalizeOptionalNumber(payload.latitude, "latitude");
  if (payload.longitude !== undefined) updateData.longitude = normalizeOptionalNumber(payload.longitude, "longitude");
  if (payload.facilities !== undefined) updateData.facilities = normalizeFacilities(payload.facilities);

  if (!Object.keys(updateData).length) {
    throw new Error("未提供可更新字段");
  }

  return updateData;
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

function canManageHouse(user, house) {
  if (!user || !house) {
    return false;
  }

  return house.landlordUserId === user.userId || user.role === "admin";
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

async function handleGetDetail(payload, event) {
  const houseId = String(payload.houseId || "").trim();
  if (!houseId) return fail("houseId 不能为空");
  const detail = await db.collection(HOUSES).doc(houseId).get().catch(() => null);
  const house = detail?.data;
  if (!house || house.status === "deleted") return fail("房源不存在", 404);
  if (house.status === "active") return success(house);

  const authState = await resolveCurrentUser(event);
  if (!authState.ok || !canManageHouse(authState.user, house)) {
    return fail("房源不存在", 404);
  }

  return success(house);
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

  const now = new Date();
  let data = null;

  try {
    data = {
      ...buildCreateData(payload),
      landlordUserId: authState.user.userId,
      status: "active",
      createTime: now,
      updateTime: now
    };
  } catch (error) {
    return fail(error.message, 400);
  }

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
  if (!house || house.status === "deleted") {
    return fail("房源不存在", 404);
  }
  if (!canManageHouse(authState.user, house)) {
    return fail("无编辑权限", 403);
  }

  let updateData = null;

  try {
    updateData = buildUpdateData(payload);
  } catch (error) {
    return fail(error.message, 400);
  }

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
  if (!house || house.status === "deleted") {
    return fail("房源不存在", 404);
  }
  if (!canManageHouse(authState.user, house)) {
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
    if (action === "getDetail") result = await handleGetDetail(payload, event);
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
