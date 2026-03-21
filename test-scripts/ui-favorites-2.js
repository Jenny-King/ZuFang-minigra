const { initAutomator, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入收藏页面: /package-profile/pages/favorites/index');
    const page = await miniProgram.reLaunch('/package-profile/pages/favorites/index');
    await page.waitFor(3000);

    await takeSimulatorScreen('ui-favorites', 'list');

    console.log('强制将收藏列表置空，测试缺省占位图...');
    await page.setData({ favoriteList: [], loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeSimulatorScreen('ui-favorites', 'empty');
  } catch (e) {
    console.error('用例 ui-favorites-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-favorites-2 通信断开');
    }
  }
})();
