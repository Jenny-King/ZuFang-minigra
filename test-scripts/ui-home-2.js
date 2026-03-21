const { initAutomator, pageScrollTo, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入首页: /pages/home/index');
    const page = await miniProgram.reLaunch('/pages/home/index');
    await page.waitFor(3000);

    console.log('下划 1000px 以触发底部懒加载机制...');
    await pageScrollTo(miniProgram, 1000, 300);
    await page.waitFor(2000);

    await takeSimulatorScreen('ui-home', 'scrolled');
  } catch (e) {
    console.error('用例 ui-home-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-home-2 通信断开');
    }
  }
})();
