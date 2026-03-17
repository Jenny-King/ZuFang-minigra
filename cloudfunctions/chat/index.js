const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const USERS = "users";
const HOUSES = "houses";
const CONVERSATIONS = "conversations";
const CHAT_MESSAGES = "chat_messages";
const MESSAGES = "messages";
const USER_SESSIONS = "user_sessions";

const USER_STATUS = {
  DISABLED: "disabled"
};

const SESSION_STATUS = {
  ACTIVE: "active"
};
const CHAT_NOTIFICATION_TYPE = "chat";
const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image"
};

function createLogger(context) {
  const prefix = `[chat][${context?.requestId || "local"}]`;
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

async function getHouseById(houseId) {
  const normalizedHouseId = String(houseId || "").trim();
  if (!normalizedHouseId) {
    return null;
  }

  const detail = await db.collection(HOUSES).doc(normalizedHouseId).get().catch(() => null);
  return detail?.data || null;
}

function buildHouseSnapshot(house) {
  if (!house) {
    return null;
  }

  const images = Array.isArray(house.images) ? house.images.filter(Boolean) : [];
  return {
    houseId: house._id || house.houseId || "",
    title: house.title || "",
    price: Number(house.price || 0),
    address: house.address || "",
    layoutText: house.layoutText || house.type || "",
    imageUrl: images[0] || ""
  };
}

async function getHouseMapByIds(houseIds = []) {
  const normalizedIds = Array.from(new Set(
    (Array.isArray(houseIds) ? houseIds : [])
      .map((item) => String(item || "").trim())
      .filter(Boolean)
  ));

  if (!normalizedIds.length) {
    return {};
  }

  const batchSize = 20;
  const batches = [];
  for (let index = 0; index < normalizedIds.length; index += batchSize) {
    batches.push(normalizedIds.slice(index, index + batchSize));
  }

  const results = await Promise.all(
    batches.map((batchIds) => db.collection(HOUSES).where({ _id: _.in(batchIds) }).get())
  );

  return results.reduce((acc, res) => {
    (res.data || []).forEach((item) => {
      acc[item._id] = item;
    });
    return acc;
  }, {});
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

function buildConversationId(userId1, userId2, houseId) {
  const ids = [userId1, userId2].sort();
  return `${ids[0]}_${ids[1]}_${houseId || "general"}`;
}

async function getConversationById(conversationId) {
  const res = await db.collection(CONVERSATIONS).where({ conversationId }).limit(1).get();
  return res.data[0] || null;
}

async function handleGetConversations(event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const res = await db.collection(CONVERSATIONS)
    .where({ participantIds: _.all([authState.user.userId]) })
    .orderBy("lastMessageTime", "desc")
    .limit(100)
    .get();

  const conversations = res.data || [];
  const targetIds = conversations
    .map((item) => (item.participantIds || []).find((id) => id !== authState.user.userId))
    .filter(Boolean);
  const houseIds = conversations
    .map((item) => item.houseId)
    .filter(Boolean);

  let userMap = {};
  if (targetIds.length) {
    const userRes = await db.collection(USERS).where({
      userId: _.in(targetIds),
      status: _.neq(USER_STATUS.DISABLED)
    }).get();
    userMap = (userRes.data || []).reduce((acc, item) => {
      acc[item.userId] = {
        userId: item.userId,
        nickName: item.nickName || "用户",
        avatarUrl: item.avatarUrl || ""
      };
      return acc;
    }, {});
  }

  const houseMap = await getHouseMapByIds(houseIds);

  const list = conversations.map((item) => {
    const targetUserId = (item.participantIds || []).find((id) => id !== authState.user.userId) || "";
    const houseInfo = buildHouseSnapshot(houseMap[item.houseId]) || item.houseSnapshot || null;
    return {
      ...item,
      targetUserId,
      targetUser: userMap[targetUserId] || null,
      houseInfo,
      unreadCount: Number(item.unreadMap?.[authState.user.userId] || 0)
    };
  });

  return success({ list });
}

async function handleGetMessages(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const conversationId = String(payload.conversationId || "").trim();
  if (!conversationId) {
    return fail("conversationId 不能为空");
  }

  const conversation = await getConversationById(conversationId);
  if (!conversation || !(conversation.participantIds || []).includes(authState.user.userId)) {
    return fail("会话不存在或无权限", 403);
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(50, Number(payload.pageSize || 20)));
  const countRes = await db.collection(CHAT_MESSAGES).where({ conversationId }).count();
  const res = await db.collection(CHAT_MESSAGES)
    .where({ conversationId })
    .orderBy("createTime", "asc")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get();

  return success({ list: res.data || [], page, pageSize, total: countRes.total || 0 });
}

async function handleCreateConversation(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const targetUserId = String(payload.targetUserId || "").trim();
  const houseId = String(payload.houseId || "").trim();
  if (!targetUserId) {
    return fail("targetUserId 不能为空");
  }
  if (!houseId) {
    return fail("houseId 不能为空");
  }
  if (targetUserId === authState.user.userId) {
    return fail("不能和自己建立会话");
  }

  const targetUser = await getUserByUserId(targetUserId);
  if (!targetUser) {
    return fail("目标用户不存在或已失效", 404);
  }

  const house = await getHouseById(houseId);
  if (!house) {
    return fail("房源不存在", 404);
  }

  const conversationId = buildConversationId(authState.user.userId, targetUserId, houseId);
  const exists = await getConversationById(conversationId);
  if (exists) {
    return success({ conversationId: exists.conversationId });
  }

  const now = new Date();
  await db.collection(CONVERSATIONS).add({
    data: {
      conversationId,
      participantIds: [authState.user.userId, targetUserId],
      houseId,
      houseSnapshot: buildHouseSnapshot(house),
      lastMessage: "",
      lastMessageTime: now,
      unreadMap: { [authState.user.userId]: 0, [targetUserId]: 0 },
      createTime: now,
      updateTime: now
    }
  });

  return success({ conversationId });
}

async function handleSendMessage(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const conversationId = String(payload.conversationId || "").trim();
  const content = String(payload.content || "").trim();
  const messageType = String(payload.messageType || "text");
  if (!conversationId || !content) {
    return fail("参数不完整");
  }

  const conversation = await getConversationById(conversationId);
  if (!conversation || !(conversation.participantIds || []).includes(authState.user.userId)) {
    return fail("会话不存在或无权限", 403);
  }

  const receiverId = (conversation.participantIds || []).find((id) => id !== authState.user.userId) || "";
  if (!receiverId) {
    return fail("接收方不存在或已失效", 404);
  }

  const receiverUser = await getUserByUserId(receiverId);
  if (!receiverUser) {
    return fail("接收方不存在或已失效", 404);
  }

  const now = new Date();
  const lastMessagePreview = messageType === MESSAGE_TYPE.IMAGE ? "[图片]" : content;
  const addRes = await db.collection(CHAT_MESSAGES).add({
    data: {
      conversationId,
      senderId: authState.user.userId,
      receiverId,
      content,
      messageType,
      read: false,
      createTime: now
    }
  });

  const unreadMap = conversation.unreadMap || {};
  unreadMap[receiverId] = Number(unreadMap[receiverId] || 0) + 1;
  await db.collection(CONVERSATIONS).doc(conversation._id).update({
    data: {
      lastMessage: lastMessagePreview,
      lastMessageTime: now,
      unreadMap,
      updateTime: now
    }
  });

  return success({ messageId: addRes._id });
}

async function handleMarkRead(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const conversationId = String(payload.conversationId || "").trim();
  if (!conversationId) {
    return fail("conversationId 不能为空");
  }

  const conversation = await getConversationById(conversationId);
  if (!conversation || !(conversation.participantIds || []).includes(authState.user.userId)) {
    return fail("会话不存在或无权限", 403);
  }

  await db.collection(CHAT_MESSAGES)
    .where({ conversationId, receiverId: authState.user.userId, read: false })
    .update({ data: { read: true } });

  const unreadMap = conversation.unreadMap || {};
  unreadMap[authState.user.userId] = 0;
  await db.collection(CONVERSATIONS).doc(conversation._id).update({
    data: { unreadMap, updateTime: new Date() }
  });

  return success({ marked: true });
}

async function handleGetNotifications(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const page = Math.max(1, Number(payload.page || 1));
  const pageSize = Math.max(1, Math.min(20, Number(payload.pageSize || 10)));
  const where = {
    userId: authState.user.userId,
    type: _.neq(CHAT_NOTIFICATION_TYPE)
  };
  const countRes = await db.collection(MESSAGES).where(where).count();
  const unreadCountRes = await db.collection(MESSAGES)
    .where({
      ...where,
      read: false
    })
    .count();
  const res = await db.collection(MESSAGES)
    .where(where)
    .orderBy("createTime", "desc")
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .get();

  return success({
    list: res.data || [],
    page,
    pageSize,
    total: countRes.total || 0,
    unreadCount: unreadCountRes.total || 0
  });
}

async function handleMarkNotificationRead(payload, event) {
  const authState = await resolveCurrentUser(event);
  if (!authState.ok) {
    return authState.result;
  }

  const messageId = String(payload.messageId || "").trim();
  if (!messageId) {
    return fail("messageId 不能为空");
  }

  const detail = await db.collection(MESSAGES).doc(messageId).get().catch(() => null);
  const message = detail?.data;
  if (!message || message.userId !== authState.user.userId) {
    return fail("通知不存在或无权限", 404);
  }

  await db.collection(MESSAGES).doc(messageId).update({
    data: { read: true, readTime: new Date() }
  });

  return success({ marked: true });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });

  try {
    let result = fail("未知 action");
    if (action === "getConversations") result = await handleGetConversations(event);
    if (action === "getMessages") result = await handleGetMessages(payload, event);
    if (action === "createConversation") result = await handleCreateConversation(payload, event);
    if (action === "sendMessage") result = await handleSendMessage(payload, event);
    if (action === "markRead") result = await handleMarkRead(payload, event);
    if (action === "getNotifications") result = await handleGetNotifications(payload, event);
    if (action === "markNotificationRead") result = await handleMarkNotificationRead(payload, event);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
