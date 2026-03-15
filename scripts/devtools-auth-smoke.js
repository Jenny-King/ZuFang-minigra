#!/usr/bin/env node

const fs = require("fs");
const net = require("net");
const path = require("path");
const { spawn } = require("child_process");
const automator = require("miniprogram-automator");

const DEFAULTS = {
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
    refreshDone: 2500,
    bindDone: 3000,
    logoutDone: 2500,
    storageDone: 1000
  }
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

  console.log(`[auth-smoke] 启动 DevTools auto, port=${port}`);
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

async function getSession(miniProgram) {
  const accessToken = await miniProgram.callWxMethod("getStorageSync", "accessToken");
  const userInfo = await miniProgram.callWxMethod("getStorageSync", "userInfo");
  return {
    accessToken: typeof accessToken === "string" ? accessToken : "",
    userInfo: userInfo && typeof userInfo === "object" ? userInfo : null
  };
}

async function clearStorage(miniProgram) {
  await miniProgram.callWxMethod("clearStorageSync");
  await sleep(DEFAULTS.waitMs.storageDone);
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

async function openProfilePage(miniProgram) {
  const page = await miniProgram.switchTab("/pages/profile/index");
  await sleep(DEFAULTS.waitMs.pageReady);
  return page;
}

async function ensureLoggedOut(miniProgram) {
  const profilePage = await openProfilePage(miniProgram);
  const data = await profilePage.data();
  if (data && data.isLoggedIn) {
    await profilePage.callMethod("onLogoutTap");
    await sleep(DEFAULTS.waitMs.logoutDone);
  }
  await clearStorage(miniProgram);
}

function sessionToSummary(session) {
  const accessToken = String(session && session.accessToken ? session.accessToken : "");
  return {
    accessTokenIssued: Boolean(accessToken),
    accessTokenPreview: accessToken ? `${accessToken.slice(0, 8)}...${accessToken.slice(-4)}` : "",
    userId: session && session.userInfo ? session.userInfo.userId : "",
    role: session && session.userInfo ? session.userInfo.role : "",
    phone: session && session.userInfo ? session.userInfo.phone : "",
    wechatBound: Boolean(session && session.userInfo && session.userInfo.wechatBound)
  };
}

function userToSummary(userInfo) {
  if (!userInfo) {
    return null;
  }

  return {
    userId: userInfo.userId || "",
    nickName: userInfo.nickName || "",
    role: userInfo.role || "",
    phone: userInfo.phone || "",
    wechatBound: Boolean(userInfo.wechatBound)
  };
}

function assertWithMessage(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertSessionMatches(session, account, stage) {
  assertWithMessage(session.accessToken, `${account.label} ${stage} 后未拿到 accessToken`);
  assertWithMessage(session.userInfo && session.userInfo.userId, `${account.label} ${stage} 后未拿到 userInfo.userId`);
  assertWithMessage(session.userInfo.phone === account.phone, `${account.label} ${stage} 返回的手机号不匹配`);
  assertWithMessage(session.userInfo.role === account.role, `${account.label} ${stage} 返回的角色不匹配`);
}

function assertUserMatches(userInfo, account, stage) {
  assertWithMessage(userInfo && userInfo.userId, `${account.label} ${stage} 未返回当前用户`);
  assertWithMessage(userInfo.phone === account.phone, `${account.label} ${stage} 当前用户手机号不匹配`);
  assertWithMessage(userInfo.role === account.role, `${account.label} ${stage} 当前用户角色不匹配`);
}

async function tryLogin(miniProgram, account) {
  const page = await miniProgram.reLaunch("/package-auth/pages/login/index");
  await sleep(DEFAULTS.waitMs.pageReady);
  await page.setData({
    mode: "password",
    phone: account.phone,
    password: account.password,
    code: "",
    submitLoading: false,
    sendingCode: false
  });
  await page.callMethod("onSubmitTap");
  await sleep(DEFAULTS.waitMs.submitDone);
  return getSession(miniProgram);
}

async function register(miniProgram, account) {
  const page = await miniProgram.reLaunch("/package-auth/pages/register/index");
  await sleep(DEFAULTS.waitMs.pageReady);
  await page.setData({
    submitLoading: false,
    formData: {
      nickName: account.nickName,
      phone: account.phone,
      password: account.password,
      role: account.role,
      wechatId: account.wechatId
    }
  });
  await page.callMethod("onSubmitTap");
  await sleep(DEFAULTS.waitMs.submitDone);
  return getSession(miniProgram);
}

async function refreshCurrentUser(miniProgram) {
  const profilePage = await openProfilePage(miniProgram);
  await profilePage.callMethod("refreshCurrentUser");
  await sleep(DEFAULTS.waitMs.refreshDone);
  const data = await profilePage.data();
  return data && data.userInfo ? data.userInfo : null;
}

async function bindWechat(miniProgram) {
  const profilePage = await openProfilePage(miniProgram);
  await profilePage.callMethod("onBindWechatTap");
  await sleep(DEFAULTS.waitMs.bindDone);
}

async function unbindWechat(miniProgram) {
  const profilePage = await openProfilePage(miniProgram);
  await profilePage.callMethod("onUnbindWechatTap");
  await sleep(DEFAULTS.waitMs.bindDone);
}

async function logout(miniProgram) {
  const profilePage = await openProfilePage(miniProgram);
  await profilePage.callMethod("onLogoutTap");
  await sleep(DEFAULTS.waitMs.logoutDone);
}

async function cleanupExistingAccount(miniProgram, account) {
  await ensureLoggedOut(miniProgram);
  const session = await tryLogin(miniProgram, account);
  if (!session.accessToken) {
    return { existed: false, deleted: false };
  }

  const result = await callCloud(miniProgram, "user", "deleteAccount", {}, {
    accessToken: session.accessToken
  });
  assertWithMessage(result && result.code === 0, `${account.label} 清理旧账号失败`);
  await clearStorage(miniProgram);

  return {
    existed: true,
    deleted: Boolean(result.data && result.data.deleted),
    deletedUserId: result.data && result.data.userId ? result.data.userId : ""
  };
}

async function runAccountFlow(miniProgram, account) {
  console.log(`[auth-smoke] 开始测试 ${account.label}: ${account.phone}`);

  const result = {
    account: account.label,
    phone: account.phone
  };

  result.cleanup = await cleanupExistingAccount(miniProgram, account);

  const registerSession = await register(miniProgram, account);
  assertSessionMatches(registerSession, account, "注册");
  result.register = sessionToSummary(registerSession);

  const registerCurrentUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(registerCurrentUser, account, "注册后 getCurrentUser");
  assertWithMessage(registerCurrentUser.wechatBound === false, `${account.label} 注册后不应自动绑定微信`);
  result.afterRegisterCurrentUser = userToSummary(registerCurrentUser);

  await bindWechat(miniProgram);
  const afterBindUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(afterBindUser, account, "绑定微信后 getCurrentUser");
  assertWithMessage(afterBindUser.wechatBound === true, `${account.label} bindWechat 后未变为已绑定`);
  result.afterBindWechat = userToSummary(afterBindUser);

  await unbindWechat(miniProgram);
  const afterUnbindUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(afterUnbindUser, account, "解绑微信后 getCurrentUser");
  assertWithMessage(afterUnbindUser.wechatBound === false, `${account.label} unbindWechat 后未恢复为未绑定`);
  result.afterUnbindWechat = userToSummary(afterUnbindUser);

  await logout(miniProgram);
  const afterLogoutSession = await getSession(miniProgram);
  assertWithMessage(!afterLogoutSession.accessToken, `${account.label} 退出登录后 accessToken 未清空`);
  result.afterLogout = sessionToSummary(afterLogoutSession);

  const loginSession = await tryLogin(miniProgram, account);
  assertSessionMatches(loginSession, account, "密码登录");
  result.login = sessionToSummary(loginSession);

  const loginCurrentUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(loginCurrentUser, account, "登录后 getCurrentUser");
  assertWithMessage(loginCurrentUser.wechatBound === false, `${account.label} 登录后初始微信状态不正确`);
  result.afterLoginCurrentUser = userToSummary(loginCurrentUser);

  await bindWechat(miniProgram);
  const afterLoginBindUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(afterLoginBindUser, account, "登录后绑定微信 getCurrentUser");
  assertWithMessage(afterLoginBindUser.wechatBound === true, `${account.label} 登录后 bindWechat 未生效`);
  result.afterLoginBindWechat = userToSummary(afterLoginBindUser);

  await unbindWechat(miniProgram);
  const afterLoginUnbindUser = await refreshCurrentUser(miniProgram);
  assertUserMatches(afterLoginUnbindUser, account, "登录后解绑微信 getCurrentUser");
  assertWithMessage(afterLoginUnbindUser.wechatBound === false, `${account.label} 登录后 unbindWechat 未生效`);
  result.afterLoginUnbindWechat = userToSummary(afterLoginUnbindUser);

  await logout(miniProgram);
  const finalSession = await getSession(miniProgram);
  assertWithMessage(!finalSession.accessToken, `${account.label} 最终退出登录后 accessToken 未清空`);
  result.finalLogout = sessionToSummary(finalSession);

  console.log(`[auth-smoke] 完成 ${account.label}: userId=${result.login.userId || result.register.userId}`);
  return result;
}

function buildAccounts(args) {
  return [
    {
      label: "landlord",
      role: "landlord",
      phone: readOption(args, "landlord-phone", "LANDLORD_PHONE", "13387395714"),
      password: readOption(args, "landlord-password", "LANDLORD_PASSWORD", "13387395714A"),
      nickName: readOption(args, "landlord-nickname", "LANDLORD_NICKNAME", "测试房东"),
      wechatId: readOption(args, "landlord-wechat-id", "LANDLORD_WECHAT_ID", "landlord_auto")
    },
    {
      label: "tenant",
      role: "tenant",
      phone: readOption(args, "tenant-phone", "TENANT_PHONE", "17364071058"),
      password: readOption(args, "tenant-password", "TENANT_PASSWORD", "17364071058A"),
      nickName: readOption(args, "tenant-nickname", "TENANT_NICKNAME", "测试租客"),
      wechatId: readOption(args, "tenant-wechat-id", "TENANT_WECHAT_ID", "tenant_auto")
    }
  ];
}

function printSummary(results) {
  console.log("");
  console.log("[auth-smoke] 测试完成，摘要如下：");
  results.forEach((item) => {
    console.log(`- ${item.account}: register=${item.register.userId}, login=${item.login.userId}, boundAfterBind=${item.afterBindWechat.wechatBound}, boundAfterLoginBind=${item.afterLoginBindWechat.wechatBound}`);
  });
  console.log("");
  console.log(JSON.stringify({ results }, null, 2));
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const cliPath = resolveCliPath(readOption(args, "cli", "WECHAT_DEVTOOLS_CLI", ""));
  const projectPath = path.resolve(readOption(args, "project", "MINIPROGRAM_PROJECT_PATH", process.cwd()));
  const port = await findFreePort(readOption(args, "port", "DEVTOOLS_AUTO_PORT", ""));
  const connectDelayMs = Number(readOption(args, "connect-delay-ms", "DEVTOOLS_CONNECT_DELAY_MS", DEFAULTS.connectDelayMs));
  const cliTimeoutMs = Number(readOption(args, "cli-timeout-ms", "DEVTOOLS_CLI_TIMEOUT_MS", DEFAULTS.cliTimeoutMs));
  const accounts = buildAccounts(args);

  console.log(`[auth-smoke] project=${projectPath}`);
  console.log(`[auth-smoke] cli=${cliPath}`);

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
    const results = [];
    for (const account of accounts) {
      // Accounts share one WeChat runtime identity, so bind/unbind must run in order.
      // eslint-disable-next-line no-await-in-loop
      results.push(await runAccountFlow(miniProgram, account));
    }
    printSummary(results);
  } finally {
    miniProgram.disconnect();
  }
}

main().catch((error) => {
  console.error("[auth-smoke] 失败:", error && error.stack ? error.stack : error);
  process.exit(1);
});
