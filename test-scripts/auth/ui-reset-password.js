const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入重置密码页面: /package-auth/pages/reset-password/index');
    const page = await miniProgram.reLaunch('/package-auth/pages/reset-password/index');
    await page.waitFor(2000);

    console.log('空表单直接提交触发校验...');
    page.callMethod('onSubmitTap').catch(() => {});
    await page.waitFor(1500);
    await takeScreen(miniProgram, 'ui-reset-password');
  } catch (e) {
    console.error('用例 ui-reset-password 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-reset-password 通信断开');
    }
  }
})();
