const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

const USERS = "users";
const USER_IDENTITIES = "user_identities";
const USER_SESSIONS = "user_sessions";
const SMS_CODES = "sms_codes";

const USER_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const IDENTITY_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const IDENTITY_TYPE = {
  PHONE: "phone",
  WECHAT_OPENID: "wechat_openid"
};

const IDENTITY_PROFILE_STATUS = {
  UNSUBMITTED: "unsubmitted",
  PENDING: "pending",
  APPROVED: "approved"
};

const SESSION_STATUS = {
  ACTIVE: "active",
  REVOKED: "revoked"
};

const SMS_CODE_STATUS = {
  ACTIVE: "active",
  USED: "used"
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

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password || "")).digest("hex");
}

function buildIdentityDocId(type, identifier) {
  return crypto
    .createHash("sha256")
    .update(`${String(type || "").trim()}:${String(identifier || "").trim()}`)
    .digest("hex");
}

function isPhone(phone) {
  return /^1\d{10}$/.test(String(phone || "").trim());
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

function getIdentityProfileStatus(user) {
  if (user?.verified) {
    return IDENTITY_PROFILE_STATUS.APPROVED;
  }

  const currentStatus = String(user?.identityStatus || "").trim();
  if (currentStatus === IDENTITY_PROFILE_STATUS.PENDING) {
    return IDENTITY_PROFILE_STATUS.PENDING;
  }

  return IDENTITY_PROFILE_STATUS.UNSUBMITTED;
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
    identityStatus: getIdentityProfileStatus(user),
    identitySubmittedAt: user.identitySubmittedAt || null,
    wechatId: user.wechatId || "",
    email: user.email || "",
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

async function getIdentityDocByTypeAndIdentifier(type, identifier) {
  const normalizedType = String(type || "").trim();
  const normalizedIdentifier = String(identifier || "").trim();
  if (!normalizedType || !normalizedIdentifier) {
    return null;
  }

  const detail = await db.collection(USER_IDENTITIES)
    .doc(buildIdentityDocId(normalizedType, normalizedIdentifier))
    .get()
    .catch(() => null);

  return detail?.data || null;
}

async function getIdentityByTypeAndIdentifier(type, identifier) {
  const identity = await getIdentityDocByTypeAndIdentifier(type, identifier);
  if (!identity || identity.status === IDENTITY_STATUS.DISABLED) {
    return null;
  }
  return identity;
}

async function createOrReactivateIdentity(type, identifier, userId) {
  const normalizedType = String(type || "").trim();
  const normalizedIdentifier = String(identifier || "").trim();
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedType || !normalizedIdentifier || !normalizedUserId) {
    throw new Error("身份信息不完整");
  }

  const existing = await getIdentityDocByTypeAndIdentifier(normalizedType, normalizedIdentifier);
  if (existing && existing.status !== IDENTITY_STATUS.DISABLED && existing.userId !== normalizedUserId) {
    throw new Error("该身份已绑定其他账号");
  }

  if (existing && existing.status !== IDENTITY_STATUS.DISABLED) {
    return existing;
  }

  if (existing && existing.status === IDENTITY_STATUS.DISABLED) {
    await db.collection(USER_IDENTITIES)
      .doc(existing._id)
      .update({
        data: {
          userId: normalizedUserId,
          status: IDENTITY_STATUS.ACTIVE,
          updateTime: new Date()
        }
      });
    return {
      ...existing,
      userId: normalizedUserId,
      status: IDENTITY_STATUS.ACTIVE
    };
  }

  const now = new Date();
  const identity = {
    _id: buildIdentityDocId(normalizedType, normalizedIdentifier),
    type: normalizedType,
    identifier: normalizedIdentifier,
    userId: normalizedUserId,
    status: IDENTITY_STATUS.ACTIVE,
    createTime: now,
    updateTime: now
  };

  await db.collection(USER_IDENTITIES).add({ data: identity });
  return identity;
}

async function disableIdentity(type, identifier) {
  const identity = await getIdentityByTypeAndIdentifier(type, identifier);
  if (!identity) {
    return;
  }

  await db.collection(USER_IDENTITIES)
    .doc(identity._id)
    .update({
      data: {
        status: IDENTITY_STATUS.DISABLED,
        updateTime: new Date()
      }
    });
}

async function getAvailableSmsCodeRecord(phone, code) {
  const res = await db.collection(SMS_CODES)
    .where({
      phone,
      code,
      status: _.neq(SMS_CODE_STATUS.USED)
    })
    .orderBy("createTime", "desc")
    .limit(1)
    .get();

  const record = res.data[0];
  if (!record) {
    return null;
  }

  if (new Date(record.expireAt).getTime() <= Date.now()) {
    return null;
  }

  return record;
}

async function consumeSmsCode(phone, code) {
  const record = await getAvailableSmsCodeRecord(phone, code);
  if (!record?._id) {
    return { valid: false };
  }

  await db.collection(SMS_CODES)
    .doc(record._id)
    .update({
      data: {
        status: SMS_CODE_STATUS.USED,
        usedAt: new Date(),
        updateTime: new Date()
      }
    });

  return { valid: true, record };
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
  if (!authState.user.passwordHash || authState.user.passwordHash !== hashPassword(oldPassword)) {
    return fail("旧密码错误", 401);
  }

  await db.collection(USERS)
    .doc(authState.user._id)
    .update({
      data: {
        passwordHash: hashPassword(newPassword),
        updateTime: new Date()
      }
    });

  return success({ updated: true });
}

async function handleChangePhone(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const phone = String(payload.phone || "").trim();
  const code = String(payload.code || "").trim();
  const currentPhone = String(authState.user.phone || "").trim();

  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }
  if (!code) {
    return fail("验证码不能为空");
  }
  if (phone === currentPhone) {
    return fail("新手机号不能与当前手机号相同", 400);
  }

  const occupiedIdentity = await getIdentityByTypeAndIdentifier(IDENTITY_TYPE.PHONE, phone);
  if (occupiedIdentity && occupiedIdentity.userId !== authState.user.userId) {
    return fail("手机号已被其他账号绑定", 409);
  }

  const consumeResult = await consumeSmsCode(phone, code);
  if (!consumeResult.valid) {
    return fail("验证码错误或已过期");
  }

  try {
    await createOrReactivateIdentity(IDENTITY_TYPE.PHONE, phone, authState.user.userId);

    await db.collection(USERS)
      .doc(authState.user._id)
      .update({
        data: {
          phone,
          updateTime: new Date()
        }
      });
  } catch (error) {
    await disableIdentity(IDENTITY_TYPE.PHONE, phone).catch(() => null);
    throw error;
  }

  if (currentPhone) {
    await disableIdentity(IDENTITY_TYPE.PHONE, currentPhone);
  }

  const latest = await getUserByUserId(authState.user.userId);
  return success(await buildUserResult(latest));
}

async function handleBindEmail(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const email = String(payload.email || "").trim().toLowerCase();
  if (!isEmail(email)) {
    return fail("邮箱格式错误");
  }

  if (email === String(authState.user.email || "").trim().toLowerCase()) {
    return success(await buildUserResult(authState.user), "邮箱已绑定");
  }

  const duplicateRes = await db.collection(USERS)
    .where({
      email,
      status: _.neq(USER_STATUS.DISABLED),
      userId: _.neq(authState.user.userId)
    })
    .limit(1)
    .get();

  if (duplicateRes.data[0]) {
    return fail("邮箱已被其他账号绑定", 409);
  }

  await db.collection(USERS)
    .doc(authState.user._id)
    .update({
      data: {
        email,
        updateTime: new Date()
      }
    });

  const latest = await getUserByUserId(authState.user.userId);
  return success(await buildUserResult(latest));
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
    if (action === "changePhone") result = await handleChangePhone(payload, event);
    if (action === "bindEmail") result = await handleBindEmail(payload, event);
    if (action === "switchRole") result = await handleSwitchRole(payload, event);
    if (action === "deleteAccount") result = await handleDeleteAccount(event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
