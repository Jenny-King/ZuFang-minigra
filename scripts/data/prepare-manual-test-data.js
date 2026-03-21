#!/usr/bin/env node

const crypto = require("crypto");
const fs = require("fs");
const os = require("os");
const path = require("path");

const cloudbase = require("@cloudbase/node-sdk");
const CloudBaseManager = require("@cloudbase/manager-node");

const { ENV_CONFIG_MAP } = require("../../config/env");

const AUTH_FILE = path.join(os.homedir(), ".config", ".cloudbase", "auth.json");
const PHONE_IDENTITY_TYPE = "phone";
const ACTIVE_STATUS = "active";
const SMS_CODE_STATUS = "active";
const SUPPORT_MARKER = "[TESTDATA]";
const BOOKING_MARKER = "[TESTDATA] 联调预约";

const ACCOUNTS = [
  {
    key: "landlord",
    role: "landlord",
    phone: "13387395714",
    password: "13387395714A",
    nickName: "测试房东",
    purpose: "发布、编辑、上下架、删除房源，处理聊天会话"
  },
  {
    key: "backupLandlord",
    role: "landlord",
    phone: "13387395717",
    password: "13387395717A",
    nickName: "备用房东",
    purpose: "备用房东、账号切换联调"
  },
  {
    key: "tenant",
    role: "tenant",
    phone: "17364071058",
    password: "17364071058A",
    nickName: "测试租客",
    purpose: "浏览房源、收藏、发起聊天、查看历史"
  },
  {
    key: "backupTenant",
    role: "tenant",
    phone: "18302096587",
    password: "18302096587A",
    nickName: "备用租客",
    purpose: "双账号聊天或绑定能力联调"
  }
];

const HOUSE_FIXTURES = [
  {
    title: "南山科技园 2 室精装近地铁",
    city: "深圳市",
    region: "南山区",
    address: "深圳市南山区科技园科苑路 188 号 2 栋 1203",
    latitude: 22.54041,
    longitude: 113.95421,
    price: 6200,
    area: 68,
    minRentPeriod: 6,
    type: "两室一厅",
    layoutText: "2室1厅1卫",
    floor: "12/28层",
    orientation: "南",
    description: "近地铁口，家电齐全，适合双人合租或情侣入住。",
    contactName: "林先生",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      wardrobe: true,
      hotWater: true,
      elevator: true,
      parking: true
    }
  },
  {
    title: "福田会展中心一室一厅拎包入住",
    city: "深圳市",
    region: "福田区",
    address: "深圳市福田区福华三路 66 号 1 单元 908",
    latitude: 22.53332,
    longitude: 114.05538,
    price: 5400,
    area: 49,
    minRentPeriod: 3,
    type: "一室一厅",
    layoutText: "1室1厅1卫",
    floor: "9/32层",
    orientation: "东南",
    description: "会展中心商圈，通勤方便，楼下配套成熟。",
    contactName: "周女士",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      desk: true,
      balcony: true
    }
  },
  {
    title: "广州天河体育西 3 室家庭整租",
    city: "广州市",
    region: "天河区",
    address: "广州市天河区体育西路 103 号 5 栋 1602",
    latitude: 23.13171,
    longitude: 113.32154,
    price: 7800,
    area: 96,
    minRentPeriod: 12,
    type: "三室及以上",
    layoutText: "3室2厅2卫",
    floor: "16/30层",
    orientation: "南北",
    description: "适合家庭居住，双卫设计，近商场与地铁换乘站。",
    contactName: "陈女士",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      tv: true,
      sofa: true,
      elevator: true,
      parking: true
    }
  },
  {
    title: "广州海珠江景 loft 公寓",
    city: "广州市",
    region: "海珠区",
    address: "广州市海珠区新港东路 128 号 3 栋 2107",
    latitude: 23.09788,
    longitude: 113.33462,
    price: 4600,
    area: 42,
    minRentPeriod: 6,
    type: "一室",
    layoutText: "1室0厅1卫",
    floor: "21/26层",
    orientation: "东",
    description: "复式 loft，采光好，近琶洲会展，适合单人白领。",
    contactName: "黄先生",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      balcony: true,
      elevator: true
    }
  },
  {
    title: "上海浦东张江 2 室次新房",
    city: "上海市",
    region: "浦东新区",
    address: "上海市浦东新区张衡路 199 弄 8 号 1101",
    latitude: 31.20152,
    longitude: 121.59698,
    price: 6900,
    area: 74,
    minRentPeriod: 6,
    type: "两室一厅",
    layoutText: "2室1厅1卫",
    floor: "11/18层",
    orientation: "南",
    description: "张江园区通勤友好，房屋保养新，安静宜居。",
    contactName: "赵先生",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      wardrobe: true,
      hotWater: true,
      elevator: true
    }
  },
  {
    title: "北京朝阳望京一室一厅近地铁",
    city: "北京市",
    region: "朝阳区",
    address: "北京市朝阳区阜通东大街 6 号院 2 号楼 1508",
    latitude: 39.99974,
    longitude: 116.47492,
    price: 5800,
    area: 51,
    minRentPeriod: 6,
    type: "一室一厅",
    layoutText: "1室1厅1卫",
    floor: "15/24层",
    orientation: "西南",
    description: "望京核心区，近地铁与商圈，适合互联网从业者。",
    contactName: "王女士",
    contactPhone: "13387395714",
    facilities: {
      wifi: true,
      airConditioner: true,
      refrigerator: true,
      washingMachine: true,
      desk: true,
      heating: true,
      elevator: true
    }
  }
];

const TEST_IMAGE_URLS = [
  "https://images.pexels.com/photos/7173672/pexels-photo-7173672.jpeg?cs=srgb&dl=pexels-artbovich-7173672.jpg&fm=jpg",
  "https://images.pexels.com/photos/6316054/pexels-photo-6316054.jpeg?cs=srgb&dl=pexels-artbovich-6316054.jpg&fm=jpg",
  "https://images.pexels.com/photos/6580373/pexels-photo-6580373.jpeg?cs=srgb&dl=pexels-artbovich-6580373.jpg&fm=jpg",
  "https://images.pexels.com/photos/6316053/pexels-photo-6316053.jpeg?cs=srgb&dl=pexels-artbovich-6316053.jpg&fm=jpg",
  "https://images.pexels.com/photos/6758510/pexels-photo-6758510.jpeg?cs=srgb&dl=pexels-artbovich-6758510.jpg&fm=jpg",
  "https://images.pexels.com/photos/6588578/pexels-photo-6588578.jpeg?cs=srgb&dl=pexels-artbovich-6588578.jpg&fm=jpg",
  "https://images.pexels.com/photos/6436775/pexels-photo-6436775.jpeg?cs=srgb&dl=pexels-heyho-6436775.jpg&fm=jpg",
  "https://images.pexels.com/photos/6782567/pexels-photo-6782567.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-6782567.jpg&fm=jpg",
  "https://images.pexels.com/photos/7061662/pexels-photo-7061662.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-7061662.jpg&fm=jpg",
  "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-7031408.jpg&fm=jpg",
  "https://images.pexels.com/photos/7061678/pexels-photo-7061678.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-7061678.jpg&fm=jpg",
  "https://images.pexels.com/photos/7535034/pexels-photo-7535034.jpeg?cs=srgb&dl=pexels-heyho-7535034.jpg&fm=jpg"
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveEnvId() {
  const explicitEnvId = String(process.env.CLOUDBASE_ENV_ID || "").trim();
  if (explicitEnvId) {
    return explicitEnvId;
  }

  return ENV_CONFIG_MAP.dev.cloudEnvId;
}

function loadCredential() {
  if (!fs.existsSync(AUTH_FILE)) {
    throw new Error(`未找到 CloudBase 登录凭证：${AUTH_FILE}，请先执行 tcb login`);
  }

  const authConfig = readJson(AUTH_FILE);
  const credential = authConfig && authConfig.credential ? authConfig.credential : null;
  if (!credential) {
    throw new Error("CloudBase 登录凭证格式无效，请重新执行 tcb login");
  }

  const secretId = String(credential.tmpSecretId || "").trim();
  const secretKey = String(credential.tmpSecretKey || "").trim();
  const sessionToken = String(credential.tmpToken || "").trim();
  const expiresAt = Number(credential.tmpExpired || 0);

  if (!secretId || !secretKey || !sessionToken) {
    throw new Error("CloudBase 临时凭证缺失，请重新执行 tcb login");
  }
  if (expiresAt && Date.now() >= expiresAt) {
    throw new Error("CloudBase 临时凭证已过期，请重新执行 tcb login");
  }

  return { secretId, secretKey, sessionToken };
}

function buildPhoneIdentityDocId(phone) {
  return crypto.createHash("sha256").update(`${PHONE_IDENTITY_TYPE}:${String(phone || "").trim()}`).digest("hex");
}

function createApp() {
  const env = resolveEnvId();
  const credential = loadCredential();
  return cloudbase.init({
    env,
    secretId: credential.secretId,
    secretKey: credential.secretKey,
    sessionToken: credential.sessionToken
  });
}

function createManager() {
  const envId = resolveEnvId();
  const credential = loadCredential();
  return new CloudBaseManager({
    envId,
    secretId: credential.secretId,
    secretKey: credential.secretKey,
    token: credential.sessionToken
  });
}

function isSuccessful(result) {
  return Boolean(result) && Number(result.code) === 0;
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

async function callFunction(app, name, action, payload = {}, accessToken = "") {
  const event = {
    action,
    payload
  };

  if (accessToken) {
    event.auth = { accessToken };
  }

  const response = await app.callFunction({
    name,
    data: event
  });

  return response.result;
}

async function getIdentityDoc(db, phone) {
  const detail = await db.collection("user_identities")
    .doc(buildPhoneIdentityDocId(phone))
    .get()
    .catch(() => null);
  return detail && detail.data ? detail.data : null;
}

async function getUserDocByUserId(db, userId) {
  const response = await db.collection("users")
    .where({ userId: String(userId || "").trim() })
    .limit(20)
    .get();

  const docs = ensureArray(response.data);
  const activeDoc = docs.find((item) => item && item.status !== "disabled");
  return activeDoc || docs[0] || null;
}

async function listCollectionByWhere(db, collectionName, where, orderByField = "", orderDirection = "desc", pageSize = 100) {
  const all = [];
  let skip = 0;

  while (true) {
    let query = db.collection(collectionName).where(where);
    if (orderByField) {
      query = query.orderBy(orderByField, orderDirection);
    }

    // CloudBase 不支持无限量查询，这里用分页把小批量测试数据拉全。
    // eslint-disable-next-line no-await-in-loop
    const result = await query.skip(skip).limit(pageSize).get();
    const batch = ensureArray(result.data);
    all.push(...batch);

    if (batch.length < pageSize) {
      break;
    }

    skip += batch.length;
  }

  return all;
}

async function getLatestAvailableSmsCode(db, phone) {
  const records = await listCollectionByWhere(db, "sms_codes", { phone }, "createTime", "desc", 10);
  return records.find((item) => {
    if (!item || item.status !== SMS_CODE_STATUS) {
      return false;
    }

    const expireAt = new Date(item.expireAt).getTime();
    return Number.isFinite(expireAt) && expireAt > Date.now();
  }) || null;
}

function isCollectionMissing(error) {
  const message = String(error && error.message ? error.message : "");
  return message.includes("Db or Table not exist");
}

function isCollectionAlreadyExists(error) {
  const message = String(error && error.message ? error.message : "").toLowerCase();
  return (
    message.includes("already exists")
    || message.includes("already exist")
    || message.includes("已存在")
    || message.includes("duplicate")
  );
}

async function ensureCollectionsExist(db) {
  const manager = createManager();
  const collectionNames = ["support_feedbacks", "messages"];

  for (const name of collectionNames) {
    // eslint-disable-next-line no-await-in-loop
    const ready = await db.collection(name).limit(1).get()
      .then(() => true)
      .catch((error) => {
        if (isCollectionMissing(error)) {
          return false;
        }
        throw error;
      });

    if (ready) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await manager.database.createCollection(name).catch((error) => {
      if (isCollectionAlreadyExists(error)) {
        return null;
      }
      throw error;
    });
  }
}

async function issueSmsCode(app, db, phone, options = {}) {
  const allowCooldownSkip = Boolean(options.allowCooldownSkip);
  const sendResult = await callFunction(app, "auth", "sendSmsCode", { phone });
  if (!isSuccessful(sendResult)) {
    const latestRecord = await getLatestAvailableSmsCode(db, phone);
    if (latestRecord) {
      return {
        code: latestRecord.code,
        reusedExisting: true,
        message: sendResult.message || ""
      };
    }

    if (allowCooldownSkip && String(sendResult.message || "").includes("发送过于频繁")) {
      return {
        code: "",
        reusedExisting: false,
        skipped: true,
        message: sendResult.message || ""
      };
    }

    throw new Error(`发送验证码失败（${phone}）：${sendResult.message || "未知错误"}`);
  }

  const latestRecord = await getLatestAvailableSmsCode(db, phone);
  if (!latestRecord) {
    throw new Error(`验证码已发送，但在 sms_codes 中未找到有效记录（${phone}）`);
  }

  return {
    code: latestRecord.code,
    reusedExisting: false,
    skipped: false,
    message: sendResult.message || ""
  };
}

async function repairAccountProfile(db, account, userId) {
  const command = db.command;
  const userDoc = await getUserDocByUserId(db, userId);
  if (!userDoc || !userDoc._id) {
    return { patched: false };
  }

  const updates = {};
  if (userDoc.status !== ACTIVE_STATUS) updates.status = ACTIVE_STATUS;
  if (userDoc.role !== account.role) updates.role = account.role;
  if (String(userDoc.phone || "").trim() !== account.phone) updates.phone = account.phone;
  if (String(userDoc.nickName || "").trim() !== account.nickName) updates.nickName = account.nickName;
  if (String(userDoc.loginType || "").trim() !== "phone") updates.loginType = "phone";
  if (userDoc.data !== undefined) updates.data = command.remove();

  if (!Object.keys(updates).length) {
    return { patched: false, userDoc };
  }

  updates.updateTime = new Date();
  await db.collection("users").doc(userDoc._id).update(updates);
  return {
    patched: true,
    userDoc: {
      ...userDoc,
      ...updates
    }
  };
}

async function ensureAccount(app, db, account) {
  const summary = {
    phone: account.phone,
    role: account.role,
    purpose: account.purpose,
    created: false,
    resetPassword: false,
    patchedProfile: false,
    passwordLogin: false,
    smsLogin: false,
    smsStatus: "pending",
    smsCodeSource: "",
    userId: "",
    nickName: account.nickName
  };

  let passwordLoginResult = await callFunction(app, "auth", "loginWithPassword", {
    phone: account.phone,
    password: account.password
  });

  if (!isSuccessful(passwordLoginResult)) {
    const identity = await getIdentityDoc(db, account.phone);
    const currentUser = identity ? await getUserDocByUserId(db, identity.userId) : null;

    if (!identity || identity.status === "disabled" || !currentUser || currentUser.status === "disabled") {
      const registerResult = await callFunction(app, "auth", "register", {
        phone: account.phone,
        password: account.password,
        nickName: account.nickName,
        role: account.role
      });

      if (!isSuccessful(registerResult) && !String(registerResult.message || "").includes("手机号已注册")) {
        throw new Error(`注册测试账号失败（${account.phone}）：${registerResult.message || "未知错误"}`);
      }

      summary.created = isSuccessful(registerResult);
    } else {
      const smsState = await issueSmsCode(app, db, account.phone);
      const resetResult = await callFunction(app, "auth", "resetPassword", {
        phone: account.phone,
        code: smsState.code,
        newPassword: account.password
      });

      if (!isSuccessful(resetResult)) {
        throw new Error(`重置测试账号密码失败（${account.phone}）：${resetResult.message || "未知错误"}`);
      }

      summary.resetPassword = true;
      summary.smsCodeSource = smsState.reusedExisting ? "reused" : "sent";
    }

    passwordLoginResult = await callFunction(app, "auth", "loginWithPassword", {
      phone: account.phone,
      password: account.password
    });
  }

  if (!isSuccessful(passwordLoginResult)) {
    throw new Error(`密码登录校验失败（${account.phone}）：${passwordLoginResult.message || "未知错误"}`);
  }

  summary.passwordLogin = true;
  summary.userId = String(passwordLoginResult.data.userInfo.userId || "");
  summary.nickName = String(passwordLoginResult.data.userInfo.nickName || account.nickName);

  const profilePatch = await repairAccountProfile(db, account, summary.userId);
  summary.patchedProfile = profilePatch.patched;

  if (profilePatch.patched) {
    passwordLoginResult = await callFunction(app, "auth", "loginWithPassword", {
      phone: account.phone,
      password: account.password
    });

    if (!isSuccessful(passwordLoginResult)) {
      throw new Error(`修正账号资料后重新登录失败（${account.phone}）：${passwordLoginResult.message || "未知错误"}`);
    }

    summary.userId = String(passwordLoginResult.data.userInfo.userId || summary.userId);
    summary.nickName = String(passwordLoginResult.data.userInfo.nickName || account.nickName);
  }

  const smsState = await issueSmsCode(app, db, account.phone, { allowCooldownSkip: true });
  if (smsState.skipped) {
    summary.smsStatus = "cooldown";
    summary.smsCodeSource = "cooldown";
  } else {
    const smsLoginResult = await callFunction(app, "auth", "loginWithPhoneCode", {
      phone: account.phone,
      code: smsState.code
    });

    if (!isSuccessful(smsLoginResult)) {
      throw new Error(`验证码登录校验失败（${account.phone}）：${smsLoginResult.message || "未知错误"}`);
    }

    summary.smsLogin = true;
    summary.smsStatus = "ok";
    summary.smsCodeSource = smsState.reusedExisting ? "reused" : "sent";
  }

  return {
    summary,
    session: {
      accessToken: String(passwordLoginResult.data.accessToken || ""),
      userInfo: passwordLoginResult.data.userInfo || {}
    }
  };
}

function buildHousePayload(fixture, index) {
  const images = TEST_IMAGE_URLS.slice(index, index + 4);
  const paddedImages = images.length >= 4
    ? images
    : TEST_IMAGE_URLS.slice(0, 4);

  return {
    ...fixture,
    images: paddedImages
  };
}

async function ensureLandlordHouses(app, db, landlordSession) {
  const existing = await listCollectionByWhere(
    db,
    "houses",
    { landlordUserId: landlordSession.userInfo.userId },
    "updateTime",
    "desc",
    100
  );

  const activeOrHidden = existing.filter((item) => item && item.status !== "deleted");
  const titleMap = new Map(activeOrHidden.map((item) => [String(item.title || ""), item]));
  const houseIds = [];
  const createdTitles = [];
  const reactivatedTitles = [];

  for (let index = 0; index < HOUSE_FIXTURES.length; index += 1) {
    const fixture = HOUSE_FIXTURES[index];
    const existingHouse = titleMap.get(fixture.title);

    if (!existingHouse) {
      const createResult = await callFunction(
        app,
        "house",
        "create",
        buildHousePayload(fixture, index),
        landlordSession.accessToken
      );

      if (!isSuccessful(createResult)) {
        throw new Error(`创建房源失败（${fixture.title}）：${createResult.message || "未知错误"}`);
      }

      houseIds.push(String(createResult.data._id || ""));
      createdTitles.push(fixture.title);
      continue;
    }

    if (existingHouse.status !== ACTIVE_STATUS) {
      const updateResult = await callFunction(
        app,
        "house",
        "update",
        {
          houseId: existingHouse._id,
          status: ACTIVE_STATUS
        },
        landlordSession.accessToken
      );

      if (!isSuccessful(updateResult)) {
        throw new Error(`恢复房源失败（${fixture.title}）：${updateResult.message || "未知错误"}`);
      }

      reactivatedTitles.push(fixture.title);
    }

    houseIds.push(String(existingHouse._id || ""));
  }

  return {
    houseIds,
    createdTitles,
    reactivatedTitles,
    totalForLandlord: activeOrHidden.length + createdTitles.length
  };
}

async function ensureFavorite(db, app, tenantSession, houseId) {
  const existing = await db.collection("favorites")
    .where({ userId: tenantSession.userInfo.userId, houseId })
    .limit(1)
    .get();

  if (ensureArray(existing.data).length) {
    return { created: false };
  }

  const result = await callFunction(app, "favorite", "toggle", { houseId }, tenantSession.accessToken);
  if (!isSuccessful(result)) {
    throw new Error(`创建收藏失败：${result.message || "未知错误"}`);
  }

  return { created: true };
}

async function ensureHistory(db, app, tenantSession, houseId) {
  const existing = await db.collection("history")
    .where({ userId: tenantSession.userInfo.userId, houseId })
    .limit(1)
    .get();

  if (ensureArray(existing.data).length) {
    return { created: false };
  }

  const result = await callFunction(app, "history", "add", { houseId }, tenantSession.accessToken);
  if (!isSuccessful(result)) {
    throw new Error(`创建浏览历史失败：${result.message || "未知错误"}`);
  }

  return { created: true };
}

async function ensureConversationAndMessages(db, app, tenantSession, landlordSession, houseId) {
  const conversationResult = await callFunction(
    app,
    "chat",
    "createConversation",
    {
      targetUserId: landlordSession.userInfo.userId,
      houseId
    },
    tenantSession.accessToken
  );

  if (!isSuccessful(conversationResult)) {
    throw new Error(`创建聊天会话失败：${conversationResult.message || "未知错误"}`);
  }

  const conversationId = String(conversationResult.data.conversationId || "");
  const messageDocs = await db.collection("chat_messages")
    .where({ conversationId })
    .limit(10)
    .get();

  const messageList = ensureArray(messageDocs.data);
  const sentMessages = [];

  if (!messageList.length) {
    const tenantMessage = await callFunction(
      app,
      "chat",
      "sendMessage",
      {
        conversationId,
        content: "你好，这套房还在吗？我想周末看房。",
        messageType: "text"
      },
      tenantSession.accessToken
    );
    if (!isSuccessful(tenantMessage)) {
      throw new Error(`发送租客消息失败：${tenantMessage.message || "未知错误"}`);
    }
    sentMessages.push("tenant");

    const landlordMessage = await callFunction(
      app,
      "chat",
      "sendMessage",
      {
        conversationId,
        content: "还在的，周六下午可以安排看房。",
        messageType: "text"
      },
      landlordSession.accessToken
    );
    if (!isSuccessful(landlordMessage)) {
      throw new Error(`发送房东消息失败：${landlordMessage.message || "未知错误"}`);
    }
    sentMessages.push("landlord");
  }

  return {
    conversationId,
    createdMessages: sentMessages
  };
}

async function ensureFeedback(db, app, tenantSession) {
  const existing = await listCollectionByWhere(
    db,
    "support_feedbacks",
    { userId: tenantSession.userInfo.userId },
    "createTime",
    "desc",
    50
  );

  const feedbackDoc = existing.find((item) => String(item.content || "").includes(SUPPORT_MARKER));
  if (feedbackDoc) {
    return {
      created: false,
      feedbackId: String(feedbackDoc._id || "")
    };
  }

  const result = await callFunction(
    app,
    "support",
    "submitFeedback",
    {
      category: "suggestion",
      content: `${SUPPORT_MARKER} 反馈提交通知联调用例`,
      contact: tenantSession.userInfo.phone || ""
    },
    tenantSession.accessToken
  );

  if (!isSuccessful(result)) {
    throw new Error(`提交反馈失败：${result.message || "未知错误"}`);
  }

  return {
    created: true,
    feedbackId: String(result.data.feedbackId || "")
  };
}

async function ensureBooking(db, app, tenantSession, landlordSession, houseId) {
  const existing = await listCollectionByWhere(
    db,
    "bookings",
    {
      tenantUserId: tenantSession.userInfo.userId,
      landlordUserId: landlordSession.userInfo.userId,
      houseId
    },
    "createTime",
    "desc",
    20
  );

  const bookingDoc = existing.find((item) => String(item.remark || "").includes(BOOKING_MARKER));
  if (bookingDoc) {
    return {
      created: false,
      bookingId: String(bookingDoc._id || "")
    };
  }

  const result = await callFunction(
    app,
    "booking",
    "create",
    {
      houseId,
      landlordUserId: landlordSession.userInfo.userId,
      date: "2026-03-25",
      timeSlot: "14:00-15:00",
      contactName: tenantSession.userInfo.nickName || "测试租客",
      contactPhone: tenantSession.userInfo.phone || "17364071058",
      remark: BOOKING_MARKER
    },
    tenantSession.accessToken
  );

  if (!isSuccessful(result)) {
    throw new Error(`创建预约失败：${result.message || "未知错误"}`);
  }

  return {
    created: true,
    bookingId: String(result.data.bookingId || "")
  };
}

async function getFinalCounts(db, userIdMap) {
  const [houses, favorites, history, bookings, notifications, feedbacks] = await Promise.all([
    db.collection("houses").count(),
    db.collection("favorites").where({ userId: userIdMap.tenant }).count(),
    db.collection("history").where({ userId: userIdMap.tenant }).count(),
    db.collection("bookings").where({ tenantUserId: userIdMap.tenant }).count(),
    db.collection("messages").where({ userId: userIdMap.tenant, type: "system" }).count(),
    db.collection("support_feedbacks").where({ userId: userIdMap.tenant }).count()
  ]);

  return {
    houses: Number(houses.total || 0),
    tenantFavorites: Number(favorites.total || 0),
    tenantHistory: Number(history.total || 0),
    tenantBookings: Number(bookings.total || 0),
    tenantSystemNotifications: Number(notifications.total || 0),
    tenantFeedbacks: Number(feedbacks.total || 0)
  };
}

function printSummary(summary) {
  console.log("");
  console.log("[prepare-manual-test-data] 执行完成");
  console.log(`- env: ${summary.envId}`);
  console.log("- account validation:");
  summary.accounts.forEach((item) => {
    console.log(`  - ${item.phone} (${item.role}) password=${item.passwordLogin ? "ok" : "fail"} sms=${item.smsStatus} created=${item.created} reset=${item.resetPassword} patched=${item.patchedProfile} userId=${item.userId}`);
  });
  console.log(`- houses: total=${summary.counts.houses} created=${summary.houses.createdTitles.length} reactivated=${summary.houses.reactivatedTitles.length}`);
  console.log(`- favorite created: ${summary.favorite.created}`);
  console.log(`- history created: ${summary.history.created}`);
  console.log(`- conversation: ${summary.chat.conversationId}`);
  console.log(`- chat messages created: ${summary.chat.createdMessages.join(", ") || "(reuse existing)"}`);
  console.log(`- feedback: ${summary.feedback.feedbackId} created=${summary.feedback.created}`);
  console.log(`- booking: ${summary.booking.bookingId} created=${summary.booking.created}`);
  console.log(`- tenant counts: favorites=${summary.counts.tenantFavorites}, history=${summary.counts.tenantHistory}, bookings=${summary.counts.tenantBookings}, notifications=${summary.counts.tenantSystemNotifications}, feedbacks=${summary.counts.tenantFeedbacks}`);
}

async function main() {
  const app = createApp();
  const db = app.database();
  const envId = resolveEnvId();

  await ensureCollectionsExist(db);

  const sessions = {};
  const accountSummaries = [];

  for (const account of ACCOUNTS) {
    // eslint-disable-next-line no-await-in-loop
    const accountState = await ensureAccount(app, db, account);
    sessions[account.key] = accountState.session;
    accountSummaries.push(accountState.summary);
  }

  const houses = await ensureLandlordHouses(app, db, sessions.landlord);
  const primaryHouseId = houses.houseIds[0];
  const secondaryHouseId = houses.houseIds[1] || primaryHouseId;

  const favorite = await ensureFavorite(db, app, sessions.tenant, primaryHouseId);
  const history = await ensureHistory(db, app, sessions.tenant, secondaryHouseId);
  const chat = await ensureConversationAndMessages(db, app, sessions.tenant, sessions.landlord, primaryHouseId);
  const feedback = await ensureFeedback(db, app, sessions.tenant);
  const booking = await ensureBooking(db, app, sessions.tenant, sessions.landlord, primaryHouseId);

  const counts = await getFinalCounts(db, {
    tenant: sessions.tenant.userInfo.userId
  });

  const summary = {
    envId,
    accounts: accountSummaries,
    houses,
    favorite,
    history,
    chat,
    feedback,
    booking,
    counts
  };

  printSummary(summary);
}

main().catch((error) => {
  console.error(`[prepare-manual-test-data] 失败：${error && error.message ? error.message : "未知错误"}`);
  process.exit(1);
});
