const { initAutomator, takeScreen } = require('../core/base');

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
    page.callMethod('onSubmitTap').catch(e => console.log('callMethod promise return:', e.message));

    console.log('强制等待 4秒 缓冲，确保弹窗完全挂载物理剧中...');
    await page.waitFor(4000);

    // 截屏并自动归档到 outputs
    await takeScreen(miniProgram, 'ui-publish');
  } catch (e) {
    console.error('用例 ui-publish 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-publish 通信断开');
    }
  }
})();
