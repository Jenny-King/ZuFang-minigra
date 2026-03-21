const { initAutomator, takeSimulatorScreen } = require('../core/simulator-capture');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入目标页面: /pages/publish/edit');
    const page = await miniProgram.reLaunch('/pages/publish/edit');
    await page.waitFor(3000);

    console.log('跳过实际交互验证，利用 setData 注入到第3步表单...');
    await page.setData({ currentStep: 2 });
    await page.waitFor(1500);

    console.log('调用原生 onSubmitTap 触发发布逻辑（预期验证拦截并弹窗）...');
    page.callMethod('onSubmitTap').catch((error) => {
      console.log('callMethod promise return:', error && error.message ? error.message : error);
    });

    console.log('强制等待 4 秒缓冲，确保弹窗完全挂载...');
    await page.waitFor(4000);

    await takeSimulatorScreen('ui-publish', 'submit-blocked');
  } catch (e) {
    console.error('用例 ui-publish-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-publish-2 通信断开');
    }
  }
})();
