#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const DEFAULTS = {
  phone: process.env.LANDLORD_PHONE || "13387395714",
  password: process.env.LANDLORD_PASSWORD || "13387395714A",
  cliPaths: [
    process.env.WECHAT_DEVTOOLS_CLI || "",
    path.join(process.env.LOCALAPPDATA || "", "wechat-devtools-bin", "cli.bat"),
    "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  ].filter(Boolean),
  connectDelayMs: 12000,
  connectRetries: 12,
  connectRetryDelayMs: 5000,
  cliTimeoutMs: 180000,
  pageReadyMs: 1500,
  loginDoneMs: 3500,
  imageCountPerHouse: 4
};

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
  "https://images.pexels.com/photos/7535034/pexels-photo-7535034.jpeg?cs=srgb&dl=pexels-heyho-7535034.jpg&fm=jpg",
  "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-7031407.jpg&fm=jpg",
  "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-6585598.jpg&fm=jpg",
  "https://images.pexels.com/photos/7031574/pexels-photo-7031574.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-7031574.jpg&fm=jpg",
  "https://images.pexels.com/photos/6283968/pexels-photo-6283968.jpeg?cs=srgb&dl=pexels-max-vakhtbovycn-6283968.jpg&fm=jpg",
  "https://images.pexels.com/photos/6758774/pexels-photo-6758774.jpeg?cs=srgb&dl=pexels-artbovich-6758774.jpg&fm=jpg"
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

async function connectMiniProgram(wsEndpoint, connectRetries, retryDelayMs, attempt = 1, lastError = null) {
  try {
    const miniProgram = await automator.connect({ wsEndpoint });
    await miniProgram.systemInfo();
    return miniProgram;
  } catch (error) {
    if (attempt >= connectRetries) {
      throw error || lastError || new Error(`连接自动化 websocket 失败: ${wsEndpoint}`);
    }
    await sleep(retryDelayMs);
    return connectMiniProgram(wsEndpoint, connectRetries, retryDelayMs, attempt + 1, error);
  }
}

async function startMiniProgram(options) {
  const {
    cliPath,
    projectPath,
    port,
    connectDelayMs,
    connectRetries,
    connectRetryDelayMs,
    cliTimeoutMs
  } = options;

  console.log(`[seed-six-house-test-data] 启动 DevTools auto, port=${port}`);
  const cliResult = await runCli(cliPath, [
    "auto",
    "--project",
    projectPath,
    "--auto-port",
    String(port),
    "--trust-project"
  ], cliTimeoutMs);

  if (cliResult.stderr.trim()) {
    console.log(cliResult.stderr.trim());
  }

  await sleep(connectDelayMs);
  return connectMiniProgram(`ws://127.0.0.1:${port}`, connectRetries, connectRetryDelayMs);
}

async function clearStorage(miniProgram) {
  await miniProgram.callWxMethod("clearStorageSync");
}

async function getSession(miniProgram) {
  const accessToken = await miniProgram.callWxMethod("getStorageSync", "accessToken");
  const userInfo = await miniProgram.callWxMethod("getStorageSync", "userInfo");

  return {
    accessToken: typeof accessToken === "string" ? accessToken : "",
    userInfo: userInfo && typeof userInfo === "object" ? userInfo : null
  };
}

async function tryLogin(miniProgram, phone, password) {
  const page = await miniProgram.reLaunch("/package-auth/pages/login/index");
  await sleep(DEFAULTS.pageReadyMs);
  await page.setData({
    mode: "password",
    phone,
    password,
    code: "",
    submitLoading: false,
    sendingCode: false
  });
  await page.callMethod("onSubmitTap");
  await sleep(DEFAULTS.loginDoneMs);
  return getSession(miniProgram);
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

function assertCloudSuccess(result, message) {
  if (!result || result.code !== 0) {
    throw new Error(`${message}: ${result && result.message ? result.message : "请求失败"}`);
  }
}

function buildImageUrlsForHouse(index, imageCountPerHouse) {
  return Array.from({ length: imageCountPerHouse }).map((_, imageIndex) => (
    TEST_IMAGE_URLS[(index * imageCountPerHouse + imageIndex) % TEST_IMAGE_URLS.length]
  ));
}

async function uploadRemoteImage(miniProgram, options) {
  const { url, cloudPath } = options;
  return miniProgram.evaluate((targetUrl, targetCloudPath) => new Promise((resolve, reject) => {
    wx.downloadFile({
      url: targetUrl,
      success(downloadRes) {
        if (!downloadRes || downloadRes.statusCode !== 200 || !downloadRes.tempFilePath) {
          reject({
            message: `download failed: ${downloadRes ? downloadRes.statusCode : "unknown"}`
          });
          return;
        }

        wx.cloud.uploadFile({
          cloudPath: targetCloudPath,
          filePath: downloadRes.tempFilePath
        }).then((uploadRes) => {
          resolve({
            fileID: uploadRes.fileID || "",
            cloudPath: targetCloudPath
          });
        }).catch((error) => {
          reject({
            message: error && error.errMsg ? error.errMsg : error && error.message ? error.message : "upload failed"
          });
        });
      },
      fail(error) {
        reject({
          message: error && error.errMsg ? error.errMsg : error && error.message ? error.message : "download failed"
        });
      }
    });
  }), url, cloudPath);
}

function buildHousePayload(seed, index, images) {
  const titlePrefix = `[测试房源${index + 1}]`;
  return {
    ...seed,
    title: `${titlePrefix}${seed.title}`,
    images
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const phone = String(readOption(args, "phone", "LANDLORD_PHONE", DEFAULTS.phone) || "").trim();
  const password = String(readOption(args, "password", "LANDLORD_PASSWORD", DEFAULTS.password) || "").trim();
  const cliPath = resolveCliPath(readOption(args, "cli", "WECHAT_DEVTOOLS_CLI", ""));
  const projectPath = path.resolve(readOption(args, "project", "MINIPROGRAM_PROJECT_PATH", process.cwd()));
  const port = await findFreePort(readOption(args, "port", "DEVTOOLS_AUTO_PORT", ""));
  const imageCountPerHouse = Math.max(
    3,
    Number(readOption(args, "images-per-house", "SEED_IMAGES_PER_HOUSE", DEFAULTS.imageCountPerHouse)) || DEFAULTS.imageCountPerHouse
  );

  if (!phone || !password) {
    throw new Error("请通过 --phone 和 --password 提供房东账号");
  }

  let miniProgram = null;
  try {
    console.log(`[seed-six-house-test-data] project=${projectPath}`);
    console.log(`[seed-six-house-test-data] phone=${phone}`);
    console.log(`[seed-six-house-test-data] targetCount=${HOUSE_FIXTURES.length}`);
    console.log(`[seed-six-house-test-data] imagesPerHouse=${imageCountPerHouse}`);

    miniProgram = await startMiniProgram({
      cliPath,
      projectPath,
      port,
      connectDelayMs: DEFAULTS.connectDelayMs,
      connectRetries: DEFAULTS.connectRetries,
      connectRetryDelayMs: DEFAULTS.connectRetryDelayMs,
      cliTimeoutMs: DEFAULTS.cliTimeoutMs
    });

    await clearStorage(miniProgram);
    const session = await tryLogin(miniProgram, phone, password);
    if (!session.accessToken) {
      throw new Error("房东账号登录失败，请先确认账号已注册且密码正确");
    }
    if (!session.userInfo || session.userInfo.role !== "landlord") {
      throw new Error("当前账号不是房东角色，无法发布测试房源");
    }

    const auth = { accessToken: session.accessToken };
    const created = [];

    for (let index = 0; index < HOUSE_FIXTURES.length; index += 1) {
      const imageUrls = buildImageUrlsForHouse(index, imageCountPerHouse);
      const uploadedImages = [];

      for (let imageIndex = 0; imageIndex < imageUrls.length; imageIndex += 1) {
        const cityFolder = String(HOUSE_FIXTURES[index].city || "unknown-city")
          .replace(/市$/u, "")
          .replace(/\s+/g, "-");
        const cloudPath = `houses/${session.userInfo.userId}/seed-data/${cityFolder}/${Date.now()}_${index + 1}_${imageIndex + 1}.jpg`;
        const uploadResult = await uploadRemoteImage(miniProgram, {
          url: imageUrls[imageIndex],
          cloudPath
        });

        if (!uploadResult || !uploadResult.fileID) {
          throw new Error(`第 ${index + 1} 条房源第 ${imageIndex + 1} 张图片上传失败`);
        }

        uploadedImages.push(uploadResult.fileID);
      }

      const payload = buildHousePayload(HOUSE_FIXTURES[index], index, uploadedImages);
      const result = await callCloud(miniProgram, "house", "create", payload, auth);
      assertCloudSuccess(result, `创建第 ${index + 1} 条房源失败`);

      created.push({
        houseId: result.data && result.data._id ? result.data._id : "",
        title: payload.title,
        city: payload.city,
        region: payload.region,
        price: payload.price,
        imageCount: payload.images.length
      });
      console.log(`[seed-six-house-test-data] 已创建 ${index + 1}/${HOUSE_FIXTURES.length}: ${payload.title}`);
    }

    console.log("[seed-six-house-test-data] 创建完成");
    console.log(JSON.stringify({
      landlordUserId: session.userInfo.userId || "",
      createdCount: created.length,
      created
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
        // Ignore close failures during cleanup.
      }
    }
  }
}

main().catch((error) => {
  console.error("[seed-six-house-test-data] 执行失败");
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
