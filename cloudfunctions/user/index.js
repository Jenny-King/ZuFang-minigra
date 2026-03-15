const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

const USERS = "users";
const USER_IDENTITIES = "user_identities";
const USER_SESSIONS = "user_sessions";

const USER_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const IDENTITY_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active",
  REVOKED: "revoked"
};

const IDENTITY_TYPE = {
  WECHAT_OPENID: "wechat_openid"
};

function createLogger(context) {
  const prefix = `[user][${context?.requestId || "local"}]`;
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

function sanitizeUser(user, wechatBound = false) {
  if (!user) {
    return null;
  }

  return {
    userId: user.userId,
    nickName: user.nickName || "",
    avatarUrl: user.avatarUrl || "",
    role: user.role || "tenant",
    phone: user.phone || "",
    verified: Boolean(user.verified),
    wechatId: user.wechatId || "",
    province: user.province || "",
    city: user.city || "",
    district: user.district || "",
    idCardMasked: user.idCardMasked || "",
    wechatBound: Boolean(wechatBound)
  };
}

function getAccessTokenFromEvent(event) {
  return String(event?.auth?.accessToken || "").trim();
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

async function isWechatBound(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    return false;
  }

  const res = await db.collection(USER_IDENTITIES)
    .where({
      userId: normalizedUserId,
      type: IDENTITY_TYPE.WECHAT_OPENID,
      status: _.neq(IDENTITY_STATUS.DISABLED)
    })
    .limit(1)
    .get();

  return Boolean(res.data[0]);
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

async function buildUserResult(user) {
  return sanitizeUser(user, await isWechatBound(user.userId));
}

async function handleGetCurrentUser(event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  return success(await buildUserResult(authState.user));
}

async function handleUpdateProfile(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  if (payload.phone !== undefined) {
    const nextPhone = String(payload.phone || "").trim();
    if (nextPhone !== String(authState.user.phone || "").trim()) {
      return fail("手机号修改请走独立换绑流程", 400);
    }
  }

  const updateData = {};
  const allowFields = ["nickName", "wechatId", "province", "city", "district", "avatarUrl", "gender"];
  allowFields.forEach((field) => {
    if (payload[field] !== undefined) {
      updateData[field] = typeof payload[field] === "string" ? payload[field].trim() : payload[field];
    }
  });
  updateData.updateTime = new Date();

  await db.collection(USERS).doc(authState.user._id).update({ data: updateData });
  const latest = await getUserByUserId(authState.user.userId);
  return success(await buildUserResult(latest));
}

async function handleChangePassword(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const oldPassword = String(payload.oldPassword || "");
  const newPassword = String(payload.newPassword || "");
  if (!oldPassword || !newPassword) {
    return fail("新旧密码不能为空");
  }
  if (!authState.user.passwordHash || authState.user.passwordHash !== hashToken(oldPassword)) {
    return fail("旧密码错误", 401);
  }

  await db.collection(USERS)
    .doc(authState.user._id)
    .update({
      data: {
        passwordHash: hashToken(newPassword),
        updateTime: new Date()
      }
    });

  return success({ updated: true });
}

async function handleSwitchRole(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const role = payload.role === "landlord"
    ? "landlord"
    : payload.role === "tenant"
      ? "tenant"
      : "";

  if (!role) {
    return fail("角色不合法");
  }

  await db.collection(USERS)
    .doc(authState.user._id)
    .update({
      data: {
        role,
        updateTime: new Date()
      }
    });

  const latest = await getUserByUserId(authState.user.userId);
  return success(await buildUserResult(latest));
}

async function handleDeleteAccount(event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const now = new Date();

  await db.collection(USERS)
    .doc(authState.user._id)
    .update({
      data: {
        status: USER_STATUS.DISABLED,
        updateTime: now
      }
    });

  await db.collection(USER_IDENTITIES)
    .where({ userId: authState.user.userId })
    .update({
      data: {
        status: IDENTITY_STATUS.DISABLED,
        updateTime: now
      }
    });

  await db.collection(USER_SESSIONS)
    .where({ userId: authState.user.userId, status: SESSION_STATUS.ACTIVE })
    .update({
      data: {
        status: SESSION_STATUS.REVOKED,
        updateTime: now
      }
    });

  return success({ deleted: true, userId: authState.user.userId });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });

  try {
    let result = fail("未知 action");
    if (action === "getCurrentUser") result = await handleGetCurrentUser(event);
    if (action === "updateProfile") result = await handleUpdateProfile(payload, event);
    if (action === "changePassword") result = await handleChangePassword(payload, event);
    if (action === "switchRole") result = await handleSwitchRole(payload, event);
    if (action === "deleteAccount") result = await handleDeleteAccount(event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
