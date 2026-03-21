const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入个人中心: /pages/profile/index');
    const page = await miniProgram.switchTab('/pages/profile/index');
    await page.waitFor(3000);

    await takeScreen(miniProgram, 'ui-profile');

  } catch (e) {
    console.error('用例 ui-profile 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-profile 通信断开');
    }
  }
})();
