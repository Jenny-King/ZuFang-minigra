const { initAutomator, takeSimulatorScreen } = require('./base-2');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入消息通知页面: /package-profile/pages/notifications/index');
    const page = await miniProgram.reLaunch('/package-profile/pages/notifications/index');
    await page.waitFor(3000);

    await takeSimulatorScreen('ui-notifications', 'list');

    console.log('强制清空通知列表测试空状态...');
    await page.setData({ notificationList: [], loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeSimulatorScreen('ui-notifications', 'empty');
  } catch (e) {
    console.error('用例 ui-notifications-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-notifications-2 通信断开');
    }
  }
})();
