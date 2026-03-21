const { initAutomator, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入浏览历史页面: /package-profile/pages/history/index');
    const page = await miniProgram.reLaunch('/package-profile/pages/history/index');
    await page.waitFor(3000);

    await takeSimulatorScreen('ui-history', 'list');

    console.log('强制清空历史列表...');
    await page.setData({ historyList: [], loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeSimulatorScreen('ui-history', 'empty');
  } catch (e) {
    console.error('用例 ui-history-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-history-2 通信断开');
    }
  }
})();
