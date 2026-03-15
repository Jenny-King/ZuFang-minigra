const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

const COLLECTION = {
  USERS: "users",
  SMS_CODES: "sms_codes",
  USER_IDENTITIES: "user_identities",
  USER_SESSIONS: "user_sessions"
};

const IDENTITY_TYPE = {
  PHONE: "phone",
  WECHAT_OPENID: "wechat_openid"
};

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

const SESSION_EXPIRE_DAYS = 30;

function createLogger(context) {
  const funcName = context && context.function ? context.function.name : "auth";
  const requestId = context && context.requestId ? context.requestId : "local";
  const prefix = `[${funcName}][${requestId}]`;
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

function isPhone(phone) {
  return /^1\d{10}$/.test(String(phone || "").trim());
}

function isIdCard(idCard) {
  return /(^\d{15}$)|(^\d{17}[\dXx]$)/.test(String(idCard || "").trim());
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password || "")).digest("hex");
}

function hashToken(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function buildIdentityDocId(type, identifier) {
  return crypto
    .createHash("sha256")
    .update(`${String(type || "").trim()}:${String(identifier || "").trim()}`)
    .digest("hex");
}

function genUserId() {
  return `user_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

function genSmsCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function genAccessToken() {
  return crypto.randomBytes(32).toString("hex");
}

function getSessionExpireAt() {
  return new Date(Date.now() + SESSION_EXPIRE_DAYS * 24 * 60 * 60 * 1000);
}

function maskIdCard(idCard) {
  return String(idCard || "").replace(/^(.{6}).+(.{4})$/, "$1********$2");
}

function getAccessTokenFromEvent(event) {
  return String(event?.auth?.accessToken || "").trim();
}

async function getUserDocByUserId(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    return null;
  }

  const res = await db.collection(COLLECTION.USERS)
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

  const detail = await db.collection(COLLECTION.USER_IDENTITIES)
    .doc(buildIdentityDocId(normalizedType, normalizedIdentifier))
    .get()
    .catch(() => null);

  const identity = detail?.data;
  if (!identity || !identity.userId) {
    return null;
  }

  return identity;
}

async function getIdentityByTypeAndIdentifier(type, identifier) {
  const identity = await getIdentityDocByTypeAndIdentifier(type, identifier);
  if (!identity || identity.status === IDENTITY_STATUS.DISABLED) {
    return null;
  }
  return identity;
}

async function getWechatIdentityByUserId(userId) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    return null;
  }

  const res = await db.collection(COLLECTION.USER_IDENTITIES)
    .where({
      userId: normalizedUserId,
      type: IDENTITY_TYPE.WECHAT_OPENID,
      status: _.neq(IDENTITY_STATUS.DISABLED)
    })
    .limit(1)
    .get();

  return res.data[0] || null;
}

async function getUserByPhone(phone) {
  const identity = await getIdentityByTypeAndIdentifier(IDENTITY_TYPE.PHONE, phone);
  if (!identity) {
    return null;
  }

  return getUserDocByUserId(identity.userId);
}

async function getUserByWechatOpenid(openid) {
  const identity = await getIdentityByTypeAndIdentifier(IDENTITY_TYPE.WECHAT_OPENID, openid);
  if (!identity) {
    return null;
  }

  return getUserDocByUserId(identity.userId);
}

async function serializeUser(user) {
  if (!user) {
    return null;
  }

  const wechatIdentity = await getWechatIdentityByUserId(user.userId);

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
    wechatBound: Boolean(wechatIdentity)
  };
}

async function createIdentity(type, identifier, userId) {
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
    const reactivated = {
      ...existing,
      userId: normalizedUserId,
      status: IDENTITY_STATUS.ACTIVE,
      updateTime: new Date()
    };

    await db.collection(COLLECTION.USER_IDENTITIES)
      .doc(existing._id)
      .update({
        data: {
          userId: normalizedUserId,
          status: IDENTITY_STATUS.ACTIVE,
          updateTime: reactivated.updateTime
        }
      });

    return reactivated;
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

  await db.collection(COLLECTION.USER_IDENTITIES).add({ data: identity });
  return identity;
}

async function disableIdentity(type, identifier) {
  const identity = await getIdentityByTypeAndIdentifier(type, identifier);
  if (!identity) {
    return;
  }

  await db.collection(COLLECTION.USER_IDENTITIES)
    .doc(identity._id)
    .update({
      data: {
        status: IDENTITY_STATUS.DISABLED,
        updateTime: new Date()
      }
    });
}

async function createSession(userId, source) {
  const normalizedUserId = String(userId || "").trim();
  if (!normalizedUserId) {
    throw new Error("userId 不能为空");
  }

  const accessToken = genAccessToken();
  const tokenHash = hashToken(accessToken);
  const now = new Date();
  const expireAt = getSessionExpireAt();

  await db.collection(COLLECTION.USER_SESSIONS).add({
    data: {
      _id: tokenHash,
      tokenHash,
      userId: normalizedUserId,
      source: String(source || "unknown"),
      status: SESSION_STATUS.ACTIVE,
      expireAt,
      createTime: now,
      updateTime: now,
      lastUsedTime: now
    }
  });

  return {
    accessToken,
    expireAt
  };
}

async function getSessionByAccessToken(accessToken) {
  const normalizedToken = String(accessToken || "").trim();
  if (!normalizedToken) {
    return null;
  }

  const tokenHash = hashToken(normalizedToken);
  const detail = await db.collection(COLLECTION.USER_SESSIONS)
    .doc(tokenHash)
    .get()
    .catch(() => null);

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

async function revokeSession(accessToken) {
  const normalizedToken = String(accessToken || "").trim();
  if (!normalizedToken) {
    return { revoked: false };
  }

  const tokenHash = hashToken(normalizedToken);
  const session = await getSessionByAccessToken(normalizedToken);
  if (!session) {
    return { revoked: false };
  }

  await db.collection(COLLECTION.USER_SESSIONS)
    .doc(tokenHash)
    .update({
      data: {
        status: SESSION_STATUS.REVOKED,
        updateTime: new Date()
      }
    });

  return { revoked: true };
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

  const user = await getUserDocByUserId(session.userId);
  if (!user) {
    return { ok: false, result: fail("账号不存在或已失效", 401) };
  }

  return {
    ok: true,
    user,
    session
  };
}

async function buildAuthSuccess(user, source) {
  const session = await createSession(user.userId, source);
  return success({
    userInfo: await serializeUser(user),
    accessToken: session.accessToken,
    expiresAt: session.expireAt
  });
}

async function handleWechatLogin(payload, openid, logger) {
  if (!openid) {
    return fail("当前环境无法获取微信身份", 401);
  }

  logger.info("db_query", { collection: COLLECTION.USER_IDENTITIES, type: IDENTITY_TYPE.WECHAT_OPENID });
  const boundUser = await getUserByWechatOpenid(openid);
  const now = new Date();
  const userInfo = payload.userInfo || {};

  if (boundUser) {
    await db.collection(COLLECTION.USERS)
      .doc(boundUser._id)
      .update({
        data: {
          nickName: userInfo.nickName || boundUser.nickName || "",
          avatarUrl: userInfo.avatarUrl || boundUser.avatarUrl || "",
          updateTime: now
        }
      });

    const latest = await getUserDocByUserId(boundUser.userId);
    return buildAuthSuccess(latest, "wechat");
  }

  const newUser = {
    userId: genUserId(),
    phone: "",
    nickName: userInfo.nickName || "微信用户",
    avatarUrl: userInfo.avatarUrl || "",
    role: "tenant",
    verified: false,
    status: USER_STATUS.ACTIVE,
    loginType: "wx",
    wechatId: "",
    province: "",
    city: "",
    district: "",
    createTime: now,
    updateTime: now
  };

  await db.collection(COLLECTION.USERS).add({ data: newUser });
  await createIdentity(IDENTITY_TYPE.WECHAT_OPENID, openid, newUser.userId);

  return buildAuthSuccess(newUser, "wechat");
}

async function handleSendSmsCode(payload) {
  const phone = String(payload.phone || "").trim();
  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }

  const code = genSmsCode();
  await db.collection(COLLECTION.SMS_CODES).add({
    data: {
      phone,
      code,
      expireAt: new Date(Date.now() + 5 * 60 * 1000),
      createTime: new Date()
    }
  });

  return success({ phone, expireInSeconds: 300 });
}

async function checkSmsCode(phone, code) {
  const res = await db.collection(COLLECTION.SMS_CODES)
    .where({ phone, code })
    .orderBy("createTime", "desc")
    .limit(1)
    .get();

  const record = res.data[0];
  if (!record) {
    return false;
  }

  return new Date(record.expireAt).getTime() > Date.now();
}

async function handleVerifySmsCode(payload) {
  const phone = String(payload.phone || "").trim();
  const code = String(payload.code || "").trim();
  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }
  if (!code) {
    return fail("验证码不能为空");
  }

  const valid = await checkSmsCode(phone, code);
  return valid ? success({ verified: true }) : fail("验证码错误或已过期");
}

async function loginByPhone(phone, source) {
  const user = await getUserByPhone(phone);
  if (!user) {
    return fail("用户不存在，请先注册", 404);
  }

  return buildAuthSuccess(user, source);
}

async function handleLoginWithPhoneCode(payload) {
  const phone = String(payload.phone || "").trim();
  const code = String(payload.code || "").trim();
  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }
  if (!code) {
    return fail("验证码不能为空");
  }

  const valid = await checkSmsCode(phone, code);
  if (!valid) {
    return fail("验证码错误或已过期");
  }

  return loginByPhone(phone, "phone_code");
}

async function handleLoginWithPassword(payload) {
  const phone = String(payload.phone || "").trim();
  const password = String(payload.password || "");
  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }
  if (!password) {
    return fail("密码不能为空");
  }

  const user = await getUserByPhone(phone);
  if (!user) {
    return fail("用户不存在", 404);
  }
  if (!user.passwordHash || user.passwordHash !== hashPassword(password)) {
    return fail("手机号或密码错误", 401);
  }

  return buildAuthSuccess(user, "phone_password");
}

async function handleRegister(payload) {
  const phone = String(payload.phone || "").trim();
  const nickName = String(payload.nickName || "").trim();
  const password = String(payload.password || "");
  const role = payload.role === "landlord" ? "landlord" : "tenant";

  if (!nickName) {
    return fail("昵称不能为空");
  }
  if (!isPhone(phone)) {
    return fail("手机号格式错误");
  }
  if (!password || password.length < 6) {
    return fail("密码至少6位");
  }

  const exists = await getIdentityByTypeAndIdentifier(IDENTITY_TYPE.PHONE, phone);
  if (exists) {
    return fail("手机号已注册", 409);
  }

  const now = new Date();
  const user = {
    userId: String(payload.userId || "").trim() || genUserId(),
    phone,
    nickName,
    avatarUrl: "",
    role,
    wechatId: String(payload.wechatId || "").trim(),
    verified: false,
    status: USER_STATUS.ACTIVE,
    loginType: "phone",
    passwordHash: hashPassword(password),
    province: "",
    city: "",
    district: "",
    createTime: now,
    updateTime: now
  };

  await db.collection(COLLECTION.USERS).add({ data: user });
  await createIdentity(IDENTITY_TYPE.PHONE, phone, user.userId);

  return buildAuthSuccess(user, "register");
}

async function handleVerifyIdentity(payload, event) {
  const realName = String(payload.realName || "").trim();
  const idCard = String(payload.idCard || "").trim();
  if (!realName) {
    return fail("真实姓名不能为空");
  }
  if (!isIdCard(idCard)) {
    return fail("身份证号格式错误");
  }

  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  await db.collection(COLLECTION.USERS)
    .doc(authState.user._id)
    .update({
      data: {
        realName,
        idCardEncrypted: hashPassword(idCard),
        idCardMasked: maskIdCard(idCard),
        verified: true,
        updateTime: new Date()
      }
    });

  const latest = await getUserDocByUserId(authState.user.userId);
  return success({ userInfo: await serializeUser(latest) });
}

async function handleBindWechat(event, openid) {
  if (!openid) {
    return fail("当前环境无法获取微信身份", 401);
  }

  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const existingWechatIdentity = await getIdentityByTypeAndIdentifier(IDENTITY_TYPE.WECHAT_OPENID, openid);
  if (existingWechatIdentity && existingWechatIdentity.userId !== authState.user.userId) {
    return fail("当前微信已绑定其他账号", 409);
  }

  const currentUserWechatIdentity = await getWechatIdentityByUserId(authState.user.userId);
  if (currentUserWechatIdentity && currentUserWechatIdentity.identifier !== openid) {
    return fail("当前账号已绑定其他微信身份，请先解绑", 409);
  }

  if (!existingWechatIdentity) {
    await createIdentity(IDENTITY_TYPE.WECHAT_OPENID, openid, authState.user.userId);
  }

  const latest = await getUserDocByUserId(authState.user.userId);
  return success({ userInfo: await serializeUser(latest) });
}

async function handleUnbindWechat(event, openid) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const currentUserWechatIdentity = await getWechatIdentityByUserId(authState.user.userId);
  if (!currentUserWechatIdentity) {
    return success({ userInfo: await serializeUser(authState.user) });
  }

  if (openid && currentUserWechatIdentity.identifier !== openid) {
    return fail("微信绑定状态异常", 409);
  }

  await disableIdentity(IDENTITY_TYPE.WECHAT_OPENID, currentUserWechatIdentity.identifier);
  const latest = await getUserDocByUserId(authState.user.userId);
  return success({ userInfo: await serializeUser(latest) });
}

async function handleLogout(event) {
  const accessToken = getAccessTokenFromEvent(event);
  const result = await revokeSession(accessToken);
  return success(result);
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID || "";
  const action = event && event.action ? event.action : "";
  const payload = event && event.payload ? event.payload : {};

  logger.info("start", {
    action,
    openid,
    payload: {
      ...payload,
      password: payload.password ? "***" : undefined,
      code: payload.code ? "***" : undefined
    }
  });

  try {
    let result = fail("未知 action");

    if (action === "wechatLogin") result = await handleWechatLogin(payload, openid, logger);
    if (action === "sendSmsCode") result = await handleSendSmsCode(payload);
    if (action === "verifySmsCode") result = await handleVerifySmsCode(payload);
    if (action === "loginWithPhoneCode") result = await handleLoginWithPhoneCode(payload);
    if (action === "loginWithPassword") result = await handleLoginWithPassword(payload);
    if (action === "register") result = await handleRegister(payload);
    if (action === "verifyIdentity") result = await handleVerifyIdentity(payload, event);
    if (action === "bindWechat") result = await handleBindWechat(event, openid);
    if (action === "unbindWechat") result = await handleUnbindWechat(event, openid);
    if (action === "logout") result = await handleLogout(event);

    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
