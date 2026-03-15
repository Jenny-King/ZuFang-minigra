#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const DEFAULTS = {
  count: 8,
  cliPaths: [
    process.env.WECHAT_DEVTOOLS_CLI || "",
    path.join(process.env.LOCALAPPDATA || "", "wechat-devtools-bin", "cli.bat"),
    "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  ].filter(Boolean),
  connectDelayMs: 10000,
  connectRetries: 6,
  connectRetryDelayMs: 5000,
  cliTimeoutMs: 180000,
  waitMs: {
    pageReady: 1500,
    submitDone: 3500,
    storageDone: 1000,
    cloudDone: 800
  }
};

const HOUSE_TEMPLATES = [
  { title: "南门地铁口阳光一室", price: 1100, area: 28, type: "一室", floor: "6/18", orientation: "南", paymentMethod: "月付", minRentPeriod: 3 },
  { title: "校东门精装一室一厅", price: 1500, area: 45, type: "一室一厅", floor: "9/16", orientation: "东南", paymentMethod: "月付", minRentPeriod: 6 },
  { title: "图书馆旁安静两室一厅", price: 1980, area: 68, type: "两室一厅", floor: "11/20", orientation: "南", paymentMethod: "季付", minRentPeriod: 6 },
  { title: "体育馆附近拎包入住", price: 1680, area: 52, type: "一室一厅", floor: "7/15", orientation: "东", paymentMethod: "月付", minRentPeriod: 3 },
  { title: "商业街旁通风一室", price: 980, area: 25, type: "一室", floor: "4/8", orientation: "北", paymentMethod: "月付", minRentPeriod: 1 },
  { title: "地铁终点站品质两居", price: 2300, area: 75, type: "两室一厅", floor: "13/22", orientation: "南", paymentMethod: "季付", minRentPeriod: 6 },
  { title: "江景高层三室及以上", price: 3200, area: 108, type: "三室及以上", floor: "18/26", orientation: "东南", paymentMethod: "半年付", minRentPeriod: 12 },
  { title: "创业园附近通勤公寓", price: 1350, area: 36, type: "一室", floor: "5/12", orientation: "西南", paymentMethod: "月付", minRentPeriod: 3 }
];

const FACILITIES_LIST = [
  ["wifi", "airConditioner", "washingMachine", "waterHeater", "bed", "wardrobe"],
  ["wifi", "airConditioner", "refrigerator", "waterHeater", "balcony"],
  ["elevator", "parking", "wifi", "airConditioner", "washingMachine", "security"],
  ["wifi", "airConditioner", "bed", "wardrobe", "balcony"],
  ["wifi", "waterHeater", "bed"],
  ["elevator", "parking", "wifi", "airConditioner", "washingMachine", "refrigerator"],
  ["elevator", "parking", "wifi", "airConditioner", "washingMachine", "refrigerator", "balcony", "security"],
  ["wifi", "airConditioner", "washingMachine", "waterHeater", "gym"]
];

function parseArgs(argv) {
  const parsed = {};
  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }
  return parsed;
}

function readOption(args, key, envKey, fallback) {
  if (args[key] !== undefined) {
    return args[key];
  }
  if (process.env[envKey] !== undefined) {
    return process.env[envKey];
  }
  return fallback;
}

function resolveCliPath(cliPathArg) {
  const candidatePaths = [cliPathArg || "", ...DEFAULTS.cliPaths].filter(Boolean);
  const matched = candidatePaths.find((candidate) => fs.existsSync(candidate));
  if (!matched) {
    throw new Error("未找到微信开发者工具 CLI，请通过 --cli 或 WECHAT_DEVTOOLS_CLI 指定 cli.bat 路径");
  }
  return matched;
}

function escapeForPowerShell(value) {
  return String(value).replace(/'/g, "''");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function runPowerShell(command, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn("powershell.exe", [
      "-NoProfile",
      "-ExecutionPolicy",
      "Bypass",
      "-Command",
      command
    ], {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });

    let stdout = "";
    let stderr = "";
    let settled = false;
    let timeoutId = null;

    function finish(error) {
      if (settled) {
        return;
      }
      settled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }

      resolve({ stdout, stderr });
    }

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => finish(error));
    child.on("close", (code) => {
      if (code === 0) {
        finish(null);
        return;
      }
      finish(new Error(`PowerShell command exited with code ${code}`));
    });

    timeoutId = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // Ignore kill failures on timeout cleanup.
      }
      finish(new Error(`PowerShell command timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

async function runCli(cliPath, cliArgs, timeoutMs) {
  const command = `& '${escapeForPowerShell(cliPath)}' ${cliArgs
    .map((arg) => `'${escapeForPowerShell(arg)}'`)
    .join(" ")}`;
  return runPowerShell(command, timeoutMs);
}

async function findFreePort(preferredPort) {
  if (preferredPort) {
    return Number(preferredPort);
  }

  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : null;
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(port);
      });
    });
  });
}

async function startMiniProgram(options) {
  const {
    cliPath,
    projectPath
  } = options;

  console.log("[seed-house-test-data] 启动 DevTools launch");
  return automator.launch({
    cliPath,
    projectPath
  });
}

async function clearStorage(miniProgram) {
  await miniProgram.callWxMethod("clearStorageSync");
  await sleep(DEFAULTS.waitMs.storageDone);
}

async function getSession(miniProgram) {
  const accessToken = await miniProgram.callWxMethod("getStorageSync", "accessToken");
  const userInfo = await miniProgram.callWxMethod("getStorageSync", "userInfo");

  return {
    accessToken: typeof accessToken === "string" ? accessToken : "",
    userInfo: userInfo && typeof userInfo === "object" ? userInfo : null
  };
}

async function callCloud(miniProgram, functionName, action, payload = {}, auth = undefined) {
  return miniProgram.evaluate((name, event) => new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name,
      data: event
    }).then((res) => resolve(res.result || res)).catch((err) => reject({
      message: err && err.message ? err.message : "cloud call failed",
      stack: err && err.stack ? err.stack : ""
    }));
  }), functionName, {
    action,
    payload,
    auth
  });
}

async function tryLogin(miniProgram, phone, password) {
  const page = await miniProgram.reLaunch("/package-auth/pages/login/index");
  await sleep(DEFAULTS.waitMs.pageReady);
  await page.setData({
    mode: "password",
    phone,
    password,
    code: "",
    submitLoading: false,
    sendingCode: false
  });
  await page.callMethod("onSubmitTap");
  await sleep(DEFAULTS.waitMs.submitDone);
  return getSession(miniProgram);
}

function assertCloudSuccess(result, message) {
  if (!result || result.code !== 0) {
    throw new Error(`${message}: ${result && result.message ? result.message : "请求失败"}`);
  }
}

function pickRegion(regions, index) {
  if (!Array.isArray(regions) || !regions.length) {
    return "";
  }
  return regions[index % regions.length].name || "";
}

function buildFacilities(index) {
  const enabledKeys = FACILITIES_LIST[index % FACILITIES_LIST.length];
  return enabledKeys.reduce((accumulator, key) => {
    accumulator[key] = true;
    return accumulator;
  }, {});
}

function buildHousePayloads(options) {
  const { phone, nickName, regions, count } = options;
  const basePhone = String(phone || "").trim();
  const contactName = nickName || `房东${basePhone.slice(-4)}`;

  return Array.from({ length: count }).map((_, index) => {
    const template = HOUSE_TEMPLATES[index % HOUSE_TEMPLATES.length];
    const region = pickRegion(regions, index);
    const regionLabel = region || "校区";
    const sequence = index + 1;

    return {
      title: `${template.title} ${sequence}号`,
      price: template.price + (index % 3) * 120,
      paymentMethod: template.paymentMethod,
      minRentPeriod: template.minRentPeriod,
      area: template.area + (index % 2) * 3,
      type: template.type,
      floor: template.floor,
      orientation: template.orientation,
      address: `${regionLabel} ${10 + sequence}栋 ${200 + sequence}室`,
      description: `测试房源 ${sequence}：适合通勤与日常居住，采光良好，支持核心链路联调。`,
      images: [],
      latitude: 0,
      longitude: 0,
      contactName,
      contactPhone: basePhone,
      facilities: buildFacilities(index),
      region
    };
  });
}

async function ensureLandlord(miniProgram, auth) {
  const currentUser = await callCloud(miniProgram, "user", "getCurrentUser", {}, auth);
  assertCloudSuccess(currentUser, "获取当前用户失败");

  const role = currentUser.data && currentUser.data.role ? currentUser.data.role : "";
  if (role === "landlord" || role === "admin") {
    return currentUser.data;
  }

  const switched = await callCloud(miniProgram, "user", "switchRole", { role: "landlord" }, auth);
  assertCloudSuccess(switched, "切换房东角色失败");
  console.log("[seed-house-test-data] 当前账号原角色不是房东，已自动切换为 landlord");
  return switched.data;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const phone = String(readOption(args, "phone", "SEED_PHONE", "") || "").trim();
  const password = String(readOption(args, "password", "SEED_PASSWORD", "") || "").trim();
  const cliPath = resolveCliPath(readOption(args, "cli", "WECHAT_DEVTOOLS_CLI", ""));
  const projectPath = path.resolve(readOption(args, "project", "WECHAT_PROJECT_PATH", process.cwd()));
  const count = Math.max(1, Number(readOption(args, "count", "SEED_HOUSE_COUNT", DEFAULTS.count)) || DEFAULTS.count);

  if (!phone || !password) {
    throw new Error("请通过 --phone 和 --password 提供账号信息");
  }

  let miniProgram = null;
  try {
    console.log(`[seed-house-test-data] project=${projectPath}`);
    console.log(`[seed-house-test-data] phone=${phone}`);
    console.log(`[seed-house-test-data] count=${count}`);

    miniProgram = await startMiniProgram({
      cliPath,
      projectPath
    });

    await clearStorage(miniProgram);
    const session = await tryLogin(miniProgram, phone, password);
    if (!session.accessToken) {
      throw new Error("账号登录失败，请先确认手机号和密码正确，且该账号已注册");
    }

    const auth = { accessToken: session.accessToken };
    const userInfo = await ensureLandlord(miniProgram, auth);
    const regionsResult = await callCloud(miniProgram, "house", "getRegions", {});
    assertCloudSuccess(regionsResult, "获取区域列表失败");

    const payloads = buildHousePayloads({
      phone,
      nickName: userInfo.nickName || "",
      regions: regionsResult.data || [],
      count
    });

    const createdIds = [];
    for (let index = 0; index < payloads.length; index += 1) {
      const createResult = await callCloud(miniProgram, "house", "create", payloads[index], auth);
      assertCloudSuccess(createResult, `创建第 ${index + 1} 条房源失败`);
      createdIds.push(createResult.data && createResult.data._id ? createResult.data._id : "");
      console.log(`[seed-house-test-data] 已创建 ${index + 1}/${payloads.length}: ${payloads[index].title}`);
      await sleep(DEFAULTS.waitMs.cloudDone);
    }

    const mineResult = await callCloud(miniProgram, "house", "getMine", {
      page: 1,
      pageSize: Math.max(20, count + 5)
    }, auth);
    assertCloudSuccess(mineResult, "查询我的房源失败");

    console.log("[seed-house-test-data] 创建完成");
    console.log(JSON.stringify({
      userId: userInfo.userId || "",
      role: userInfo.role || "landlord",
      createdCount: createdIds.length,
      createdIds,
      currentTotal: Number(mineResult.data && mineResult.data.total ? mineResult.data.total : 0)
    }, null, 2));
  } finally {
    if (miniProgram) {
      try {
        if (typeof miniProgram.close === "function") {
          await miniProgram.close();
        } else {
          miniProgram.disconnect();
        }
      } catch {
        // Ignore disconnect failures during cleanup.
      }
    }
  }
}

main().catch((error) => {
  console.error("[seed-house-test-data] 执行失败");
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
