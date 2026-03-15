const cloud = require("wx-server-sdk");

let cloudbase = null;
let cloudbaseLoadError = null;

try {
  cloudbase = require("@cloudbase/node-sdk");
} catch (error) {
  cloudbaseLoadError = error;
}

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
let adminDb = null;

const REQUIRED_COLLECTIONS = [
  "users",
  "user_identities",
  "user_sessions",
  "houses",
  "favorites",
  "history",
  "conversations",
  "chat_messages",
  "messages",
  "regions",
  "sms_codes"
];

const DEFAULT_REGIONS = [
  { name: "全市", order: 0, status: "active" },
  { name: "南山区", order: 1, status: "active" },
  { name: "福田区", order: 2, status: "active" },
  { name: "罗湖区", order: 3, status: "active" },
  { name: "宝安区", order: 4, status: "active" },
  { name: "龙华区", order: 5, status: "active" },
  { name: "龙岗区", order: 6, status: "active" }
];

const DEFAULT_TEST_PHONES = [
  "13387395714",
  "17364071058"
];

function createLogger(context) {
  const prefix = `[bootstrap][${context?.requestId || "local"}]`;
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

function fail(message) {
  return { code: -1, message: message || "请求失败" };
}

function ensureAllowed(event) {
  const allow = Boolean(event?.payload?.allowBootstrap);
  const isProd = process.env.NODE_ENV === "production";
  if (isProd || !allow) {
    throw new Error("当前环境禁止执行初始化，请仅在开发环境手动调用并显式传入 allowBootstrap");
  }
}

function getAdminDb() {
  if (adminDb) {
    return adminDb;
  }

  if (!cloudbase) {
    throw new Error(`缺少 @cloudbase/node-sdk 依赖，请先在云函数 bootstrap 目录安装后重新部署：${cloudbaseLoadError?.message || "module not found"}`);
  }

  try {
    adminDb = cloudbase.init({ env: cloud.DYNAMIC_CURRENT_ENV }).database();
    return adminDb;
  } catch (error) {
    throw new Error(`初始化 CloudBase 管理数据库失败：${error.message}`);
  }
}

function getErrorMessage(error) {
  return error?.message || "未知错误";
}

function isCollectionAlreadyExists(error) {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("already exists")
    || message.includes("already exist")
    || message.includes("已存在")
    || message.includes("duplicate")
  );
}

async function inspectCollection(name) {
  try {
    await db.collection(name).limit(1).get();
    return { name, ready: true, created: false, message: "" };
  } catch (error) {
    return { name, ready: false, created: false, message: getErrorMessage(error) };
  }
}

async function createCollection(name) {
  const database = getAdminDb();

  try {
    await database.createCollection(name);
    return { created: true, message: "" };
  } catch (error) {
    if (isCollectionAlreadyExists(error)) {
      return { created: false, message: getErrorMessage(error) };
    }
    throw error;
  }
}

async function ensureCollectionReady(name) {
  const currentState = await inspectCollection(name);

  if (currentState.ready) {
    return currentState;
  }

  try {
    const createResult = await createCollection(name);
    const verifiedState = await inspectCollection(name);

    return {
      name,
      ready: verifiedState.ready,
      created: Boolean(createResult.created),
      message: verifiedState.ready ? "" : (verifiedState.message || createResult.message || currentState.message)
    };
  } catch (error) {
    return {
      name,
      ready: false,
      created: false,
      message: getErrorMessage(error)
    };
  }
}

async function ensureCollectionsReady(collectionNames = REQUIRED_COLLECTIONS) {
  const results = [];

  for (const name of collectionNames) {
    // 初始化阶段按顺序执行，便于控制台排查单个集合的创建结果。
    // eslint-disable-next-line no-await-in-loop
    const result = await ensureCollectionReady(name);
    results.push(result);
  }

  return results;
}

function buildCollectionSummary(collections) {
  return {
    collections,
    createdCollections: collections.filter((item) => item.created).map((item) => item.name),
    skippedCollections: collections.filter((item) => item.ready && !item.created).map((item) => item.name),
    failedCollections: collections
      .filter((item) => !item.ready)
      .map((item) => ({ name: item.name, message: item.message }))
  };
}

async function initRegionsInternal(regionCollectionState = null) {
  const ensuredRegionCollection = regionCollectionState || await ensureCollectionReady("regions");

  if (!ensuredRegionCollection.ready) {
    return {
      inserted: 0,
      skipped: true,
      collectionReady: false,
      collection: ensuredRegionCollection
    };
  }

  const regionCollection = db.collection("regions");
  const queryRegionNames = DEFAULT_REGIONS.map((item) => item.name).concat(["全部区域"]);
  const existingRegionRes = await regionCollection
    .where({ name: _.in(queryRegionNames) })
    .get();
  const existingRegions = existingRegionRes.data || [];
  const existingRegionNames = new Set(existingRegions.map((item) => item.name));
  const legacyAllCityRegion = existingRegions.find((item) => item.name === "全部区域") || null;
  let inserted = 0;

  for (const region of DEFAULT_REGIONS) {
    if (existingRegionNames.has(region.name)) {
      continue;
    }
    if (region.name === "全市" && legacyAllCityRegion?._id) {
      // 兼容旧初始化数据，将“全部区域”平滑迁移为“全市”。
      // eslint-disable-next-line no-await-in-loop
      await regionCollection.doc(legacyAllCityRegion._id).update({ data: region });
      existingRegionNames.add(region.name);
      continue;
    }
    // eslint-disable-next-line no-await-in-loop
    await regionCollection.add({ data: region });
    inserted += 1;
  }

  return {
    inserted,
    skipped: inserted === 0,
    collectionReady: true,
    collection: ensuredRegionCollection
  };
}

async function handleInitCollections() {
  const collections = await ensureCollectionsReady();
  return success(buildCollectionSummary(collections));
}

async function handleInitRegions() {
  const result = await initRegionsInternal();
  return success(result);
}

async function handleInitAll() {
  const collections = await ensureCollectionsReady();
  const collectionSummary = buildCollectionSummary(collections);
  const regionCollectionState = collections.find((item) => item.name === "regions") || null;
  const regions = await initRegionsInternal(regionCollectionState);

  return success({
    ...collectionSummary,
    regions
  });
}

function normalizeCleanupPhones(inputPhones) {
  const phoneList = Array.isArray(inputPhones) && inputPhones.length
    ? inputPhones
    : DEFAULT_TEST_PHONES;

  return Array.from(new Set(
    phoneList
      .map((item) => String(item || "").trim())
      .filter((item) => /^1\d{10}$/.test(item))
  ));
}

async function listAllDocuments(collectionName, whereClause) {
  const pageSize = 100;
  let skip = 0;
  const docs = [];

  while (true) {
    // 清理脚本只会命中少量测试数据，这里用简单分页避免一次性读取过多。
    // eslint-disable-next-line no-await-in-loop
    const res = await db.collection(collectionName)
      .where(whereClause)
      .skip(skip)
      .limit(pageSize)
      .get();

    const currentBatch = Array.isArray(res?.data) ? res.data : [];
    docs.push(...currentBatch);

    if (currentBatch.length < pageSize) {
      break;
    }

    skip += currentBatch.length;
  }

  return docs;
}

async function removeDocuments(collectionName, docs) {
  const removedIds = [];

  for (const item of docs) {
    if (!item?._id) {
      continue;
    }

    // eslint-disable-next-line no-await-in-loop
    await db.collection(collectionName).doc(item._id).remove();
    removedIds.push(item._id);
  }

  return {
    count: removedIds.length,
    ids: removedIds
  };
}

async function handleCleanupTestUsers(payload = {}) {
  const phones = normalizeCleanupPhones(payload.phones);
  if (!phones.length) {
    return fail("未提供合法的测试手机号");
  }

  const activeUsers = await listAllDocuments("users", {
    phone: _.in(phones),
    status: "active"
  });
  const disabledUsers = await listAllDocuments("users", {
    phone: _.in(phones),
    status: "disabled"
  });
  const disabledUserIds = Array.from(new Set(
    disabledUsers
      .map((item) => String(item?.userId || "").trim())
      .filter(Boolean)
  ));

  let disabledIdentities = [];
  let disabledSessions = [];

  if (disabledUserIds.length) {
    disabledIdentities = await listAllDocuments("user_identities", {
      userId: _.in(disabledUserIds)
    });
    disabledSessions = await listAllDocuments("user_sessions", {
      userId: _.in(disabledUserIds)
    });
  }

  const removedUsers = await removeDocuments("users", disabledUsers);
  const removedIdentities = await removeDocuments("user_identities", disabledIdentities);
  const removedSessions = await removeDocuments("user_sessions", disabledSessions);

  return success({
    phones,
    matchedDisabledUserIds: disabledUserIds,
    preservedActiveUsers: activeUsers.map((item) => ({
      _id: item._id,
      userId: item.userId,
      phone: item.phone,
      status: item.status
    })),
    removed: {
      users: removedUsers.count,
      identities: removedIdentities.count,
      sessions: removedSessions.count
    }
  });
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  logger.info("start", { action });

  try {
    ensureAllowed(event);

    let result = fail("未知 action");

    if (action === "initCollections") result = await handleInitCollections();
    if (action === "initRegions") result = await handleInitRegions();
    if (action === "initAll") result = await handleInitAll();
    if (action === "cleanupTestUsers") result = await handleCleanupTestUsers(event?.payload);

    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常");
  }
};
