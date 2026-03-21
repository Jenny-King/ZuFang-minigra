const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入注册页面: /package-auth/pages/register/index');
    const page = await miniProgram.reLaunch('/package-auth/pages/register/index');
    await page.waitFor(2000);

    console.log('空表单直接提交触发全字段校验报错...');
    page.callMethod('onSubmitTap').catch(() => {});
    await page.waitFor(1500);
    await takeScreen(miniProgram, 'ui-register');

    console.log('填入部分非法数据（短密码、非法手机号）并再次提交...');
    await page.setData({
      formData: {
        nickName: '测试',
        phone: '123',
        password: 'ab',
        role: 'tenant',
        wechatId: ''
      }
    });
    page.callMethod('onSubmitTap').catch(() => {});
    await page.waitFor(1500);
    await takeScreen(miniProgram, 'ui-register');
  } catch (e) {
    console.error('用例 ui-register 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-register 通信断开');
    }
  }
})();
