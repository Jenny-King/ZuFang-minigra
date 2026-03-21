#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const DEFAULTS = {
  count: 8,
  imageCountPerHouse: 3,
  cliPaths: [
    process.env.WECHAT_DEVTOOLS_CLI || "",
    path.join(process.env.LOCALAPPDATA || "", "wechat-devtools-bin", "cli.bat"),
    "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  ].filter(Boolean),
  connectDelayMs: 12000,
  connectRetries: 12,
  connectRetryDelayMs: 5000,
  cliTimeoutMs: 180000,
  waitMs: {
    pageReady: 1500,
    submitDone: 3500,
    storageDone: 1000
  }
};

const TEST_IMAGE_URLS = [
  "https://images.pexels.com/photos/7173672/pexels-photo-7173672.jpeg?cs=srgb&dl=pexels-artbovich-7173672.jpg&fm=jpg",
  "https://images.pexels.com/photos/6316054/pexels-photo-6316054.jpeg?cs=srgb&dl=pexels-artbovich-6316054.jpg&fm=jpg",
  "https://images.pexels.com/photos/6580373/pexels-photo-6580373.jpeg?cs=srgb&dl=pexels-artbovich-6580373.jpg&fm=jpg",
  "https://images.pexels.com/photos/6316053/pexels-photo-6316053.jpeg?cs=srgb&dl=pexels-artbovich-6316053.jpg&fm=jpg",
  "https://images.pexels.com/photos/6758510/pexels-photo-6758510.jpeg?cs=srgb&dl=pexels-artbovich-6758510.jpg&fm=jpg",
  "https://images.pexels.com/photos/6588578/pexels-photo-6588578.jpeg?cs=srgb&dl=pexels-artbovich-6588578.jpg&fm=jpg",
  "https://images.pexels.com/photos/6436775/pexels-photo-6436775.jpeg?cs=srgb&dl=pexels-heyho-6436775.jpg&fm=jpg"
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

  console.log(`[upload-house-test-images] 启动 DevTools auto, port=${port}`);
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

function buildImageUrlsForHouse(index, imageCountPerHouse) {
  return Array.from({ length: imageCountPerHouse }).map((_, imageIndex) => (
    TEST_IMAGE_URLS[(index + imageIndex) % TEST_IMAGE_URLS.length]
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

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const phone = String(readOption(args, "phone", "SEED_PHONE", "") || "").trim();
  const password = String(readOption(args, "password", "SEED_PASSWORD", "") || "").trim();
  const cliPath = resolveCliPath(readOption(args, "cli", "WECHAT_DEVTOOLS_CLI", ""));
  const projectPath = path.resolve(readOption(args, "project", "WECHAT_PROJECT_PATH", process.cwd()));
  const port = await findFreePort(readOption(args, "port", "WECHAT_AUTO_PORT", ""));
  const count = Math.max(1, Number(readOption(args, "count", "SEED_HOUSE_COUNT", DEFAULTS.count)) || DEFAULTS.count);
  const imageCountPerHouse = Math.max(
    1,
    Number(readOption(args, "images-per-house", "SEED_IMAGES_PER_HOUSE", DEFAULTS.imageCountPerHouse)) || DEFAULTS.imageCountPerHouse
  );

  if (!phone || !password) {
    throw new Error("请通过 --phone 和 --password 提供账号信息");
  }

  let miniProgram = null;
  try {
    console.log(`[upload-house-test-images] project=${projectPath}`);
    console.log(`[upload-house-test-images] phone=${phone}`);
    console.log(`[upload-house-test-images] targetCount=${count}`);
    console.log(`[upload-house-test-images] imagesPerHouse=${imageCountPerHouse}`);

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
      throw new Error("账号登录失败，请先确认手机号和密码正确，且该账号已注册");
    }

    const auth = { accessToken: session.accessToken };
    const mineResult = await callCloud(miniProgram, "house", "getMine", {
      page: 1,
      pageSize: Math.max(20, count + 5)
    }, auth);
    assertCloudSuccess(mineResult, "查询我的房源失败");

    const houses = Array.isArray(mineResult.data && mineResult.data.list)
      ? mineResult.data.list.slice(0, count)
      : [];
    if (!houses.length) {
      throw new Error("当前账号下没有可绑定图片的房源");
    }

    const updated = [];
    for (let houseIndex = 0; houseIndex < houses.length; houseIndex += 1) {
      const house = houses[houseIndex];
      const houseId = String(house && house._id ? house._id : "");
      const title = house && house.title ? house.title : `house_${houseIndex + 1}`;
      if (!houseId) {
        throw new Error(`第 ${houseIndex + 1} 条房源缺少 _id，无法更新图片`);
      }

      const urls = buildImageUrlsForHouse(houseIndex, imageCountPerHouse);
      const images = [];
      for (let imageIndex = 0; imageIndex < urls.length; imageIndex += 1) {
        const cloudPath = `houses/${session.userInfo && session.userInfo.userId ? session.userInfo.userId : "seed"}/seed-images/${Date.now()}_${houseId}_${imageIndex}.jpg`;
        const uploadResult = await uploadRemoteImage(miniProgram, {
          url: urls[imageIndex],
          cloudPath
        });
        if (!uploadResult || !uploadResult.fileID) {
          throw new Error(`房源 ${title} 第 ${imageIndex + 1} 张图片上传失败`);
        }
        images.push(uploadResult.fileID);
      }

      const updateResult = await callCloud(miniProgram, "house", "update", {
        houseId,
        images
      }, auth);
      assertCloudSuccess(updateResult, `更新房源 ${title} 图片失败`);

      updated.push({
        houseId,
        title,
        imageCount: images.length
      });
      console.log(`[upload-house-test-images] 已绑定 ${houseIndex + 1}/${houses.length}: ${title}`);
    }

    console.log("[upload-house-test-images] 绑定完成");
    console.log(JSON.stringify({
      updatedCount: updated.length,
      updated
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
  console.error("[upload-house-test-images] 执行失败");
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});
