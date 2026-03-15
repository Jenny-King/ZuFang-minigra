const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const USERS = "users";
const HISTORY = "history";
const HOUSES = "houses";
const USER_SESSIONS = "user_sessions";

const USER_STATUS = {
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active"
};

function createLogger(context) {
  const prefix = `[history][${context?.requestId || "local"}]`;
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

async function handleGetList(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(20, Number(payload.pageSize || 10)));
  const where = { userId: authState.user.userId };
  const countRes = await db.collection(HISTORY).where(where).count();
  const historyRes = await db.collection(HISTORY)
    .where(where)
    .orderBy("viewTime", "desc")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get();

  const historyList = historyRes.data || [];
  const houseIds = historyList.map((item) => item.houseId).filter(Boolean);
  let houseMap = {};
  if (houseIds.length) {
    const houseRes = await db.collection(HOUSES).where({ _id: _.in(houseIds), status: "active" }).get();
    houseMap = (houseRes.data || []).reduce((acc, house) => {
      acc[house._id] = house;
      return acc;
    }, {});
  }
  const list = historyList
    .filter((item) => houseMap[item.houseId])
    .map((item) => ({ ...item, houseInfo: houseMap[item.houseId] }));

  return success({ list, page, pageSize, total: countRes.total || 0 });
}

async function handleAdd(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const houseId = String(payload.houseId || "").trim();
  if (!houseId) {
    return fail("houseId 不能为空");
  }

  const exists = await db.collection(HISTORY).where({ userId: authState.user.userId, houseId }).limit(1).get();
  const oldRecord = exists.data[0];
  if (oldRecord) {
    await db.collection(HISTORY).doc(oldRecord._id).update({
      data: { viewTime: new Date() }
    });
    return success({ updated: true, historyId: oldRecord._id });
  }

  const addRes = await db.collection(HISTORY).add({
    data: {
      userId: authState.user.userId,
      houseId,
      viewTime: new Date()
    }
  });

  return success({ created: true, historyId: addRes._id });
}

async function handleRemove(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const historyId = String(payload.historyId || "").trim();
  if (!historyId) {
    return fail("historyId 不能为空");
  }

  const detail = await db.collection(HISTORY).doc(historyId).get().catch(() => null);
  const item = detail?.data;
  if (!item || item.userId !== authState.user.userId) {
    return fail("记录不存在或无权限", 404);
  }

  await db.collection(HISTORY).doc(historyId).remove();
  return success({ removed: true, historyId });
}

async function handleClear(event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const res = await db.collection(HISTORY).where({ userId: authState.user.userId }).remove();
  return success({ removed: res.stats?.removed || 0 });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });

  try {
    let result = fail("未知 action");
    if (action === "getList") result = await handleGetList(payload, event);
    if (action === "add") result = await handleAdd(payload, event);
    if (action === "remove") result = await handleRemove(payload, event);
    if (action === "clear") result = await handleClear(event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
