const automator = require('miniprogram-automator');
const fs = require('fs');
const path = require('path');

(async () => {
  let miniProgram;
  try {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://127.0.0.1:9420'
    });

    console.log('进入个人中心: /pages/profile/index');
    const page = await miniProgram.switchTab('/pages/profile/index');
    await page.waitFor(3000);

    const outputsDir = path.join(__dirname, 'outputs', 'ui-profile');
    if (!fs.existsSync(outputsDir)) {
      fs.mkdirSync(outputsDir, { recursive: true });
    }

    // 截取初始渲染完毕的个人中心全貌
    const timestamp1 = Date.now();
    const screenshotPath1 = path.join(outputsDir, `${timestamp1}.png`);
    await miniProgram.screenshot({
      path: screenshotPath1,
      fullPage: true
    });
    console.log(`[v] 个人中心截图完毕: ${screenshotPath1}`);

  } catch (e) {
    console.error('用例 ui-profile 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-profile 通信断开');
    }
  }
})();
