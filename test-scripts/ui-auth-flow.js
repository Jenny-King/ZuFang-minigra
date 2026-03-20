const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();
    
    console.log('进入登录页面...');
    const page = await miniProgram.reLaunch('/package-auth/pages/login/index');
    await page.waitFor(1500);

    console.log('不填表单，直接强制硬点击登录按钮触发必填提示拦截...');
    page.callMethod('onSubmitTap').catch(() => {});
    await page.waitFor(1000); // 等待可能弹出的原生 Toast 或表单报红

    await takeScreen(miniProgram, 'ui-auth-flow');
  } catch (e) {
    console.error('用例 ui-auth-flow 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-auth-flow 通信断开');
    }
  }
})();
