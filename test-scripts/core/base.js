const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const runSafetyCheck = require("./safety-check");

const DEFAULTS = {
  cliPaths: [
    process.env.WECHAT_DEVTOOLS_CLI || "",
    path.join(process.env.LOCALAPPDATA || "", "wechat-devtools-bin", "cli.bat"),
    "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  ].filter(Boolean),
  connectDelayMs: Number(process.env.DEVTOOLS_CONNECT_DELAY_MS || 10000),
  connectRetries: Number(process.env.DEVTOOLS_CONNECT_RETRIES || 6),
  connectRetryDelayMs: Number(process.env.DEVTOOLS_CONNECT_RETRY_DELAY_MS || 5000),
  cliTimeoutMs: Number(process.env.DEVTOOLS_CLI_TIMEOUT_MS || 180000),
  pageReadyMs: Number(process.env.UI_PAGE_READY_MS || 1800)
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function escapeForPowerShell(value) {
  return String(value).replace(/'/g, "''");
}

function resolveCliPath(cliPathArg = "") {
  const candidatePaths = [
    String(cliPathArg || "").trim(),
    ...DEFAULTS.cliPaths
  ].filter(Boolean);

  const matched = candidatePaths.find((candidate) => fs.existsSync(candidate));
  if (!matched) {
    throw new Error("未找到微信开发者工具 CLI，请通过 WECHAT_DEVTOOLS_CLI 指定 cli.bat 路径");
  }

  return matched;
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
        // Ignore timeout cleanup failure.
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

async function resolvePort(preferredPort) {
  if (preferredPort) {
    return Number(preferredPort);
  }

  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" && address ? address.port : 9420;
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

async function connectMiniProgram(wsEndpoint, attempt = 1, lastError = null) {
  try {
    const miniProgram = await automator.connect({ wsEndpoint });
    await miniProgram.systemInfo();
    return miniProgram;
  } catch (error) {
    if (attempt >= DEFAULTS.connectRetries) {
      throw error || lastError || new Error(`连接自动化 websocket 失败: ${wsEndpoint}`);
    }
    await sleep(DEFAULTS.connectRetryDelayMs);
    return connectMiniProgram(wsEndpoint, attempt + 1, error);
  }
}

async function initAutomator(options = {}) {
  runSafetyCheck();

  const cliPath = resolveCliPath(options.cliPath || process.env.WECHAT_DEVTOOLS_CLI || "");
  const projectPath = path.resolve(options.projectPath || process.cwd());
  const port = await resolvePort(options.port || process.env.DEVTOOLS_AUTO_PORT || "");

  console.log(`[ui-automator] project=${projectPath}`);
  console.log(`[ui-automator] cli=${cliPath}`);
  console.log(`[ui-automator] port=${port}`);

  const cliResult = await runCli(cliPath, [
    "auto",
    "--project",
    projectPath,
    "--auto-port",
    String(port),
    "--trust-project"
  ], DEFAULTS.cliTimeoutMs);

  if (cliResult.stderr.trim()) {
    console.log(cliResult.stderr.trim());
  }

  await sleep(DEFAULTS.connectDelayMs);
  return connectMiniProgram(`ws://127.0.0.1:${port}`);
}

async function getCurrentRoute(miniProgram) {
  return miniProgram.evaluate(() => {
    const pages = getCurrentPages();
    const current = pages[pages.length - 1];
    return current && current.route ? `/${current.route}` : "";
  });
}

async function waitForCurrentRoute(miniProgram, expectedRoute, timeoutMs = 15000, intervalMs = 300) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const route = await getCurrentRoute(miniProgram);
    if (route === expectedRoute) {
      return route;
    }
    await sleep(intervalMs);
  }
  throw new Error(`等待路由 ${expectedRoute} 超时`);
}

async function waitForPageData(page, predicate, description, options = {}) {
  const timeoutMs = Number(options.timeoutMs || 15000);
  const intervalMs = Number(options.intervalMs || 300);
  const deadline = Date.now() + timeoutMs;
  let lastData = null;

  while (Date.now() < deadline) {
    lastData = await page.data();
    if (predicate(lastData)) {
      return lastData;
    }
    await sleep(intervalMs);
  }

  throw new Error(`等待页面状态超时: ${description}`);
}

async function switchTabAndWait(miniProgram, route, waitMs = DEFAULTS.pageReadyMs) {
  const page = await miniProgram.switchTab(route);
  await waitForCurrentRoute(miniProgram, route);
  await page.waitFor(waitMs);
  return page;
}

async function reLaunchAndWait(miniProgram, route, waitMs = DEFAULTS.pageReadyMs) {
  const page = await miniProgram.reLaunch(route);
  await waitForCurrentRoute(miniProgram, route);
  await page.waitFor(waitMs);
  return page;
}

async function navigateToAndWait(miniProgram, route, waitMs = DEFAULTS.pageReadyMs) {
  const page = await miniProgram.navigateTo(route);
  await waitForCurrentRoute(miniProgram, route.split("?")[0]);
  await page.waitFor(waitMs);
  return page;
}

module.exports = {
  DEFAULTS,
  assert,
  escapeForPowerShell,
  getCurrentRoute,
  initAutomator,
  navigateToAndWait,
  reLaunchAndWait,
  resolveCliPath,
  resolvePort,
  runCli,
  runPowerShell,
  sleep,
  switchTabAndWait,
  waitForCurrentRoute,
  waitForPageData
};
