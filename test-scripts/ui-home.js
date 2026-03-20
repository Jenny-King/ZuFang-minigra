const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入首页: /pages/home/index');
    const page = await miniProgram.reLaunch('/pages/home/index');
    await page.waitFor(3000);

    console.log('下划 1000px 以触发底部懒加载机制...');
    // Automator 不支持传统的页面 DOM scroll，通过底层 evaluate 的 wx API 搞定
    await miniProgram.evaluate(() => {
      return new Promise((resolve) => {
        wx.pageScrollTo({
          scrollTop: 1000,
          duration: 300,
          success: resolve,
          fail: resolve
        });
      });
    });
    
    // 给 loading 圈转起来 2s 缓冲
    await page.waitFor(2000);

    await takeScreen(miniProgram, 'ui-home');
  } catch (e) {
    console.error('用例 ui-home 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-home 通信断开');
    }
  }
})();
