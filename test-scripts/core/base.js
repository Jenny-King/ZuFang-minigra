const automator = require('miniprogram-automator');
const fs = require('fs');
const net = require('net');
const path = require('path');
const { spawn } = require('child_process');
const runSafetyCheck = require('./safety-check');
const TEST_SCRIPTS_ROOT = path.resolve(__dirname, '..');

const DEFAULT_PORT = 9420;
const DEFAULT_CONNECT_DELAY_MS = Number(process.env.MINIPROGRAM_CONNECT_DELAY_MS || 10000);
const DEFAULT_CONNECT_RETRIES = Number(process.env.MINIPROGRAM_CONNECT_RETRIES || 6);
const DEFAULT_CONNECT_RETRY_DELAY_MS = Number(process.env.MINIPROGRAM_CONNECT_RETRY_DELAY_MS || 3000);
const DEFAULT_CLI_TIMEOUT_MS = Number(process.env.WECHAT_DEVTOOLS_CLI_TIMEOUT_MS || 180000);
const DEFAULT_CLI_PATHS = [
  process.env.WECHAT_DEVTOOLS_CLI || '',
  path.join(process.env.LOCALAPPDATA || '', 'wechat-devtools-bin', 'cli.bat'),
  'C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat'
].filter(Boolean);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function escapeForPowerShell(value) {
  return String(value).replace(/'/g, "''");
}

function resolvePort() {
  const rawPort = process.env.MINIPROGRAM_AUTOMATOR_PORT || process.env.DEVTOOLS_AUTO_PORT || DEFAULT_PORT;
  const port = Number(rawPort);
  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(`[Base] 非法端口配置: ${rawPort}`);
  }
  return port;
}

function resolveCliPath() {
  return DEFAULT_CLI_PATHS.find((candidate) => fs.existsSync(candidate)) || '';
}

function isPortListening(port, host = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;

    function finish(result) {
      if (settled) {
        return;
      }
      settled = true;
      socket.destroy();
      resolve(result);
    }

    socket.setTimeout(1000);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
    socket.connect(port, host);
  });
}

function runPowerShell(command, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn('powershell.exe', [
      '-NoProfile',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      command
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    });

    let stdout = '';
    let stderr = '';
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

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (error) => finish(error));
    child.on('close', (code) => {
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
        // Ignore kill failures during timeout cleanup.
      }
      finish(new Error(`PowerShell command timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

async function runCli(cliPath, cliArgs, timeoutMs) {
  const command = `& '${escapeForPowerShell(cliPath)}' ${cliArgs
    .map((arg) => `'${escapeForPowerShell(arg)}'`)
    .join(' ')}`;
  return runPowerShell(command, timeoutMs);
}

async function connectMiniProgram(wsEndpoint, retries = DEFAULT_CONNECT_RETRIES, retryDelayMs = DEFAULT_CONNECT_RETRY_DELAY_MS) {
  let lastError = null;
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    try {
      const miniProgram = await automator.connect({ wsEndpoint });
      await miniProgram.systemInfo();
      return miniProgram;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await sleep(retryDelayMs);
      }
    }
  }

  throw lastError || new Error(`连接自动化 websocket 失败: ${wsEndpoint}`);
}

async function ensureDevtoolsAutomationReady(port) {
  if (await isPortListening(port)) {
    return false;
  }

  const cliPath = resolveCliPath();
  if (!cliPath) {
    throw new Error(
      `[Base] 无法连接 ws://127.0.0.1:${port}，且未找到微信开发者工具 CLI。\n` +
      '请先打开当前小程序项目并启用 automation，或通过 WECHAT_DEVTOOLS_CLI 指定 cli.bat 路径。'
    );
  }

  const projectPath = path.resolve(process.env.MINIPROGRAM_PROJECT_PATH || process.cwd());
  console.log(`[Base] 检测到端口 ${port} 未监听，尝试通过 CLI 拉起微信开发者工具...`);
  const cliResult = await runCli(cliPath, [
    'auto',
    '--project',
    projectPath,
    '--auto-port',
    String(port),
    '--trust-project'
  ], DEFAULT_CLI_TIMEOUT_MS);

  if (cliResult.stderr.trim()) {
    console.log(cliResult.stderr.trim());
  }

  await sleep(DEFAULT_CONNECT_DELAY_MS);
  return true;
}

async function initAutomator() {
  runSafetyCheck();

  const port = resolvePort();
  const wsEndpoint = `ws://127.0.0.1:${port}`;
  await ensureDevtoolsAutomationReady(port);
  console.log(`[Base] 正在连接微信开发者工具(port: ${port})...`);

  try {
    return await connectMiniProgram(wsEndpoint);
  } catch (error) {
    throw new Error(
      `[Base] 连接微信开发者工具失败: ${wsEndpoint}\n` +
      '请确认微信开发者工具已打开当前项目，且 automation 已启用。\n' +
      `原始错误: ${error && error.message ? error.message : error}`
    );
  }
}

/**
 * 封装模拟登录逻辑
 * @param miniProgram Automator 实例
 * @param user object 用户信息
 */
async function mockLogin(miniProgram, user = { phone: '13387395714', role: 'landlord', userId: 'mock-user-1' }) {
  console.log(`[Base] 执行打桩模拟登录: ${user.role} (${user.phone})`);
  // 通过 callWxMethod 强制覆盖 Storage
  await miniProgram.callWxMethod('setStorageSync', 'accessToken', 'mock-token-test-' + Date.now());
  await miniProgram.callWxMethod('setStorageSync', 'userInfo', user);
  
  // 通过 evaluate 强制覆盖 app.js 运行时 globalData
  await miniProgram.evaluate((userData) => {
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.accessToken = 'mock-token-test-' + Date.now();
      app.globalData.userInfo = userData;
    }
  }, user);
  console.log('[Base] 模拟登录凭证注入完成');
}

/**
 * 封装截图保存逻辑
 * @param miniProgram Automator 实例
 * @param name 截屏标识短名
 */
async function takeScreen(miniProgram, sceneName, shotLabel = '') {
  const outputsDir = path.join(TEST_SCRIPTS_ROOT, 'outputs', sceneName);
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const normalizedLabel = String(shotLabel || '').trim().replace(/[^\w-]+/g, '-');
  const screenshotName = normalizedLabel ? `${timestamp}-${normalizedLabel}.png` : `${timestamp}.png`;
  const screenshotPath = path.join(outputsDir, screenshotName);
  console.log(`[Base] 正在捕捉屏幕并存入: ${screenshotPath}`);
  const screenshotBase64 = await miniProgram.screenshot();
  if (!screenshotBase64 || typeof screenshotBase64 !== 'string') {
    throw new Error(`[Base] 截图失败，未返回有效图片数据: ${sceneName}`);
  }

  fs.writeFileSync(screenshotPath, screenshotBase64, 'base64');
  const fileStat = fs.statSync(screenshotPath);
  if (!fileStat.size) {
    throw new Error(`[Base] 截图文件写入失败: ${screenshotPath}`);
  }

  console.log(`[Base] [v] ${sceneName}/${path.basename(screenshotPath)} 截图完毕 (${fileStat.size} bytes)`);
  return screenshotPath;
}

module.exports = {
  initAutomator,
  mockLogin,
  takeScreen
};
