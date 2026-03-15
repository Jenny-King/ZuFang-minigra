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
const REGION_WRITE_BATCH_SIZE = 20;

const DEFAULT_REGION_GROUPS = {
  深圳市: [
    "全市",
    "福田区",
    "罗湖区",
    "南山区",
    "盐田区",
    "宝安区",
    "龙岗区",
    "龙华区",
    "坪山区",
    "光明区",
    "大鹏新区"
  ],
  北京市: [
    "全市",
    "东城区",
    "西城区",
    "朝阳区",
    "丰台区",
    "石景山区",
    "海淀区",
    "门头沟区",
    "房山区",
    "通州区",
    "顺义区",
    "昌平区",
    "大兴区",
    "怀柔区",
    "平谷区",
    "密云区",
    "延庆区"
  ],
  上海市: [
    "全市",
    "黄浦区",
    "徐汇区",
    "长宁区",
    "静安区",
    "普陀区",
    "虹口区",
    "杨浦区",
    "闵行区",
    "宝山区",
    "嘉定区",
    "浦东新区",
    "金山区",
    "松江区",
    "青浦区",
    "奉贤区",
    "崇明区"
  ],
  广州市: [
    "全市",
    "越秀区",
    "海珠区",
    "荔湾区",
    "天河区",
    "白云区",
    "黄埔区",
    "番禺区",
    "花都区",
    "南沙区",
    "从化区",
    "增城区"
  ]
};

function buildDefaultRegions(regionGroups = {}) {
  let order = 0;

  return Object.keys(regionGroups).reduce((acc, city) => {
    const districts = Array.isArray(regionGroups[city]) ? regionGroups[city] : [];

    districts.forEach((name) => {
      acc.push({
        city,
        name,
        order,
        status: "active"
      });
      order += 1;
    });

    return acc;
  }, []);
}

const DEFAULT_REGIONS = buildDefaultRegions(DEFAULT_REGION_GROUPS);

const DEFAULT_TEST_PHONES = [
  "13387395714",
  "17364071058"
];

const CURRENT_CLOUD_ENV_ID = String(cloud.DYNAMIC_CURRENT_ENV || "").trim().toLowerCase();
const PRODUCTION_ENV_ALIASES = ["prod", "production", "release"];
const NON_PRODUCTION_ENV_ALIASES = ["dev", "develop", "test", "testing", "trial", "staging", "sandbox", "local"];
const PRODUCTION_ENV_IDS = [
  process.env.BOOTSTRAP_PROD_ENV_IDS,
  process.env.PROD_CLOUD_ENV_ID
]
  .flatMap((value) => String(value || "").split(","))
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const ALLOWED_BOOTSTRAP_ENV_IDS = String(process.env.BOOTSTRAP_ALLOWED_ENV_IDS || "")
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);

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

function getCurrentEnvAlias() {
  return String(process.env.ENV_ALIAS || process.env.CLOUDBASE_ENV_ALIAS || "")
    .trim()
    .toLowerCase();
}

function ensureAllowed(event) {
  const allow = Boolean(event?.payload?.allowBootstrap);
  const envAlias = getCurrentEnvAlias();
  const nodeEnv = String(process.env.NODE_ENV || "").trim().toLowerCase();
  const isProd = nodeEnv === "production"
    || PRODUCTION_ENV_ALIASES.includes(envAlias)
    || PRODUCTION_ENV_IDS.includes(CURRENT_CLOUD_ENV_ID);
  const isExplicitNonProd = NON_PRODUCTION_ENV_ALIASES.includes(envAlias)
    || ALLOWED_BOOTSTRAP_ENV_IDS.includes(CURRENT_CLOUD_ENV_ID);

  if (isProd) {
    throw new Error("生产环境禁止执行 bootstrap/cleanup 操作");
  }

  if (!allow) {
    throw new Error("当前环境禁止执行初始化，请仅在开发环境手动调用并显式传入 allowBootstrap");
  }

  if (!isExplicitNonProd) {
    throw new Error("当前环境未显式标记为开发/测试环境，禁止执行 bootstrap/cleanup 操作；请配置 ENV_ALIAS=dev/test/staging，或将环境 ID 加入 BOOTSTRAP_ALLOWED_ENV_IDS");
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

async function runInBatches(tasks = [], batchSize = REGION_WRITE_BATCH_SIZE, handler = async () => {}) {
  const normalizedTasks = Array.isArray(tasks) ? tasks : [];
  const normalizedBatchSize = Math.max(1, Number(batchSize) || 1);

  for (let index = 0; index < normalizedTasks.length; index += normalizedBatchSize) {
    const currentBatch = normalizedTasks.slice(index, index + normalizedBatchSize);
    await Promise.all(currentBatch.map((task) => handler(task)));
  }
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
  const existingRegionRes = await regionCollection
    .limit(200)
    .get();
  const existingRegions = existingRegionRes.data || [];
  const updateTasks = [];
  const insertTasks = [];
  let inserted = 0;
  let updated = 0;

  for (const region of DEFAULT_REGIONS) {
    const matchedRegion = existingRegions.find((item) => (
      String(item?.city || "").trim() === region.city
      && String(item?.name || "").trim() === region.name
    ));

    if (matchedRegion?._id) {
      const currentCity = String(matchedRegion.city || "").trim();
      const currentName = String(matchedRegion.name || "").trim();
      const currentOrder = Number(matchedRegion.order || 0);
      const currentStatus = String(matchedRegion.status || "").trim();
      const shouldSync = (
        currentCity !== region.city
        || currentName !== region.name
        || currentOrder !== region.order
        || currentStatus !== region.status
      );

      if (shouldSync) {
        updateTasks.push({
          regionId: matchedRegion._id,
          data: region
        });
        matchedRegion.city = region.city;
        matchedRegion.name = region.name;
        matchedRegion.order = region.order;
        matchedRegion.status = region.status;
      }
      continue;
    }

    insertTasks.push(region);
    existingRegions.push({
      ...region,
      _id: `pending_insert_${insertTasks.length}`
    });
  }

  await runInBatches(updateTasks, REGION_WRITE_BATCH_SIZE, async (task) => {
    await regionCollection.doc(task.regionId).update({ data: task.data });
    updated += 1;
  });

  await runInBatches(insertTasks, REGION_WRITE_BATCH_SIZE, async (region) => {
    await regionCollection.add({ data: region });
    inserted += 1;
  });

  return {
    inserted,
    updated,
    skipped: inserted === 0 && updated === 0,
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
  const removableDocs = Array.isArray(docs)
    ? docs.filter((item) => item && item._id)
    : [];

  await runInBatches(removableDocs, REGION_WRITE_BATCH_SIZE, async (item) => {
    await db.collection(collectionName).doc(item._id).remove();
    removedIds.push(item._id);
  });

  return {
    count: removedIds.length,
    ids: removedIds
  };
}

async function handleCleanupHouses() {
  const houses = await listAllDocuments("houses", {});
  const removedHouses = await removeDocuments("houses", houses);

  return success({
    removed: {
      houses: removedHouses.count
    }
  });
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
    if (action === "cleanupHouses") result = await handleCleanupHouses();
    if (action === "cleanupTestUsers") result = await handleCleanupTestUsers(event?.payload);

    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常");
  }
};
