const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

const COLLECTION = {
  USERS: "users",
  USER_SESSIONS: "user_sessions",
  SUPPORT_FEEDBACKS: "support_feedbacks",
  MESSAGES: "messages"
};

const USER_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active",
  REVOKED: "revoked"
};

const FEEDBACK_STATUS = {
  SUBMITTED: "submitted"
};

const FEEDBACK_CATEGORY = {
  BUG: "bug",
  ACCOUNT: "account",
  LISTING: "listing",
  SUGGESTION: "suggestion",
  OTHER: "other"
};

const NOTIFICATION_TYPE = {
  SYSTEM: "system"
};

function createLogger(context) {
  const prefix = `[support][${context?.requestId || "local"}]`;
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

function normalizeString(value, maxLength = 500) {
  return String(value || "").trim().slice(0, maxLength);
}

async function getUserByUserId(userId) {
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

async function handleSubmitFeedback(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const category = normalizeString(payload.category, 32);
  const content = normalizeString(payload.content, 500);
  const contact = normalizeString(payload.contact, 100);
  const allowedCategories = Object.values(FEEDBACK_CATEGORY);

  if (!allowedCategories.includes(category)) {
    return fail("反馈类型不合法", 400);
  }
  if (!content || content.length < 5) {
    return fail("反馈内容至少 5 个字", 400);
  }

  const now = new Date();
  const feedback = {
    category,
    content,
    contact,
    userId: authState.user.userId,
    userSnapshot: {
      nickName: authState.user.nickName || "",
      phone: authState.user.phone || "",
      email: authState.user.email || ""
    },
    status: FEEDBACK_STATUS.SUBMITTED,
    source: "miniProgram",
    createTime: now,
    updateTime: now
  };

  const addRes = await db.collection(COLLECTION.SUPPORT_FEEDBACKS).add({
    data: feedback
  });

  await db.collection(COLLECTION.MESSAGES).add({
    data: {
      userId: authState.user.userId,
      type: NOTIFICATION_TYPE.SYSTEM,
      title: "反馈提交成功",
      content: "我们已收到你的反馈，客服会尽快跟进处理。",
      relatedId: addRes?._id || "",
      relatedType: "supportFeedback",
      read: false,
      createTime: now,
      updateTime: now
    }
  });

  return success({
    feedbackId: addRes?._id || "",
    status: FEEDBACK_STATUS.SUBMITTED,
    submittedAt: now
  });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });

  try {
    let result = fail("未知 action");
    if (action === "submitFeedback") result = await handleSubmitFeedback(payload, event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (error) {
    logger.error("fail", { action, err: error.message, stack: error.stack });
    return fail(error.message || "服务异常", 500);
  }
};
