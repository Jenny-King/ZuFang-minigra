const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('利用 evaluate 拦截底层 request 原型，强行使所有接口挂机长达 10s...');
    await miniProgram.evaluate(() => {
      const _request = wx.request;
      Object.defineProperty(wx, 'request', {
        configurable: true,
        value: function(obj) {
          setTimeout(() => {
            _request(obj);
          }, 10000); 
          // 返回拦截对象
          return { abort: () => {} };
        }
      });
    });

    console.log('载入首页并观测骨架屏层级展示效果...');
    const page = await miniProgram.reLaunch('/pages/home/index');
    
    // 网络被强制 hold 住，只需稍作结构渲染等待
    await page.waitFor(1500);

    await takeScreen(miniProgram, 'ui-skeleton-smoke');
  } catch (e) {
    console.error('用例 ui-skeleton-smoke 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-skeleton-smoke 通信断开');
    }
  }
})();
