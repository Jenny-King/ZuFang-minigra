#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const DEFAULTS = {
  phones: [
    "13387395714",
    "17364071058"
  ],
  cliPaths: [
    process.env.WECHAT_DEVTOOLS_CLI || "",
    path.join(process.env.LOCALAPPDATA || "", "wechat-devtools-bin", "cli.bat"),
    "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  ].filter(Boolean),
  connectDelayMs: 10000,
  connectRetries: 6,
  connectRetryDelayMs: 5000,
  cliTimeoutMs: 180000
};

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
  const candidatePaths = [
    cliPathArg || "",
    ...DEFAULTS.cliPaths
  ].filter(Boolean);

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

  console.log(`[cleanup-test-users] 启动 DevTools auto, port=${port}`);
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

async function callCloud(miniProgram, functionName, action, payload = {}) {
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
    payload
  });
}

function normalizePhones(rawValue) {
  const source = rawValue
    ? String(rawValue).split(",")
    : DEFAULTS.phones;

  return Array.from(new Set(
    source
      .map((item) => String(item || "").trim())
      .filter((item) => /^1\d{10}$/.test(item))
  ));
}

function printSummary(result) {
  console.log("");
  console.log("[cleanup-test-users] 清理完成");
  console.log(`- phones: ${result.phones.join(", ")}`);
  console.log(`- disabled userIds: ${result.matchedDisabledUserIds.join(", ") || "(none)"}`);
  console.log(`- removed users: ${result.removed.users}`);
  console.log(`- removed identities: ${result.removed.identities}`);
  console.log(`- removed sessions: ${result.removed.sessions}`);
  console.log(`- preserved active users: ${result.preservedActiveUsers.map((item) => item.userId).join(", ") || "(none)"}`);
}

function getResultErrorMessage(result) {
  const rawMessage = result && result.message ? String(result.message) : "";
  if (rawMessage === "未知 action") {
    return "云端 bootstrap 云函数还是旧版本，尚未部署 `cleanupTestUsers`。请先在微信开发者工具中上传并部署 `cloudfunctions/bootstrap`，再重新执行 `npm run cleanup:test-users`。";
  }
  return rawMessage || "cleanupTestUsers 调用失败";
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cliPath = resolveCliPath(readOption(args, "cli", "WECHAT_DEVTOOLS_CLI", ""));
  const projectPath = path.resolve(readOption(args, "project", "MINIPROGRAM_PROJECT_PATH", process.cwd()));
  const port = await findFreePort(readOption(args, "port", "DEVTOOLS_AUTO_PORT", ""));
  const connectDelayMs = Number(readOption(args, "connect-delay-ms", "DEVTOOLS_CONNECT_DELAY_MS", DEFAULTS.connectDelayMs));
  const cliTimeoutMs = Number(readOption(args, "cli-timeout-ms", "DEVTOOLS_CLI_TIMEOUT_MS", DEFAULTS.cliTimeoutMs));
  const phones = normalizePhones(readOption(args, "phones", "TEST_USER_PHONES", ""));

  if (!phones.length) {
    throw new Error("未提供合法手机号，请通过 --phones 或 TEST_USER_PHONES 传入逗号分隔手机号");
  }

  console.log(`[cleanup-test-users] project=${projectPath}`);
  console.log(`[cleanup-test-users] phones=${phones.join(",")}`);

  const miniProgram = await startMiniProgram({
    cliPath,
    projectPath,
    port,
    connectDelayMs,
    connectRetries: DEFAULTS.connectRetries,
    connectRetryDelayMs: DEFAULTS.connectRetryDelayMs,
    cliTimeoutMs
  });

  try {
    const result = await callCloud(miniProgram, "bootstrap", "cleanupTestUsers", {
      allowBootstrap: true,
      phones
    });

    if (!result || result.code !== 0) {
      throw new Error(getResultErrorMessage(result));
    }

    printSummary(result.data || {});
  } finally {
    miniProgram.disconnect();
  }
}

main().catch((error) => {
  console.error("[cleanup-test-users] 执行失败");
  console.error(error && error.message ? error.message : error);
  process.exitCode = 1;
});
