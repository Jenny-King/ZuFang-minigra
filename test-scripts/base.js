const automator = require('miniprogram-automator');
const fs = require('fs');
const path = require('path');
const runSafetyCheck = require('./safety-check');

async function initAutomator() {
  runSafetyCheck();
  console.log('[Base] 正在连接微信开发者工具(port: 9420)...');
  const miniProgram = await automator.connect({
    wsEndpoint: 'ws://127.0.0.1:9420'
  });

  return miniProgram;
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
async function takeScreen(miniProgram, sceneName) {
  const outputsDir = path.join(__dirname, 'outputs', sceneName);
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir, { recursive: true });
  }

  const timestamp = Date.now();
  const screenshotPath = path.join(outputsDir, `${timestamp}.png`);
  console.log(`[Base] 正在捕捉屏幕并存入: ${screenshotPath}`);
  await miniProgram.screenshot({
    path: screenshotPath,
    fullPage: true
  });
  console.log(`[Base] [v] ${sceneName}/${timestamp}.png 截图完毕`);
}

module.exports = {
  initAutomator,
  mockLogin,
  takeScreen
};
