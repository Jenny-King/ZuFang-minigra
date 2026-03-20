const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入消息通知页面: /package-profile/pages/notifications/index');
    const page = await miniProgram.reLaunch('/package-profile/pages/notifications/index');
    await page.waitFor(3000);

    await takeScreen(miniProgram, 'ui-notifications');

    console.log('强制清空通知列表测试空状态...');
    await page.setData({ notificationList: [], loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeScreen(miniProgram, 'ui-notifications');
  } catch (e) {
    console.error('用例 ui-notifications 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-notifications 通信断开');
    }
  }
})();
