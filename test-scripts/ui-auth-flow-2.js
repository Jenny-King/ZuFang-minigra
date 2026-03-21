const { initAutomator, takeSimulatorScreen } = require('./simulator-capture');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入登录页面...');
    const page = await miniProgram.reLaunch('/package-auth/pages/login/index');
    await page.waitFor(1500);

    console.log('不填表单，直接强制硬点击登录按钮触发必填提示拦截...');
    page.callMethod('onSubmitTap').catch(() => {});
    await page.waitFor(1000);

    await takeSimulatorScreen('ui-auth-flow', 'simulator');
  } catch (e) {
    console.error('用例 ui-auth-flow-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-auth-flow-2 通信断开');
    }
  }
})();
