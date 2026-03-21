const { initAutomator, ensureCurrentPage, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入我的房源管理页面: /pages/publish/index');
    const page = await miniProgram.switchTab('/pages/publish/index');
    await page.waitFor(3000);
    await ensureCurrentPage(miniProgram, 'pages/publish/index');

    await takeSimulatorScreen('ui-my-houses', 'list');

    console.log('强制清空房源列表测试缺省提示...');
    await page.setData({ houseList: [], empty: true, loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeSimulatorScreen('ui-my-houses', 'empty');
  } catch (e) {
    console.error('用例 ui-my-houses-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-my-houses-2 通信断开');
    }
  }
})();
