const { initAutomator, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入目标页面: /package-house/pages/detail/index?houseId=house_001');
    const page = await miniProgram.reLaunch('/package-house/pages/detail/index?houseId=house_001');
    await page.waitFor(3000);

    console.log('查找并点击 [展开全文] 的动作...');
    const expandBtn = await page.$('.expand-btn');
    if (expandBtn) {
      await expandBtn.tap();
      await page.waitFor(1500);
    } else {
      console.log('未找到特殊的外置展开触发器，可能页面已完全展示');
    }

    await takeSimulatorScreen('ui-detail', 'simulator');
  } catch (e) {
    console.error('用例 ui-detail-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-detail-2 通信断开');
    }
  }
})();
