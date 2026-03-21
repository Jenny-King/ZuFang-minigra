const { initAutomator, takeSimulatorScreen } = require('../core/simulator-capture');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('利用 evaluate 拦截底层 request 原型，强行使所有接口挂机长达 10s...');
    await miniProgram.evaluate(() => {
      const originalRequest = wx.request;
      Object.defineProperty(wx, 'request', {
        configurable: true,
        value(obj) {
          setTimeout(() => {
            originalRequest(obj);
          }, 10000);
          return { abort: () => {} };
        }
      });
    });

    console.log('载入首页并观测骨架屏层级展示效果...');
    const page = await miniProgram.reLaunch('/pages/home/index');
    await page.waitFor(1500);

    await takeSimulatorScreen('ui-skeleton-smoke', 'skeleton');
  } catch (e) {
    console.error('用例 ui-skeleton-smoke-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-skeleton-smoke-2 通信断开');
    }
  }
})();
