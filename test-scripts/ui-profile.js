const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入个人中心: /pages/profile/index');
    const page = await miniProgram.switchTab('/pages/profile/index');
    await page.waitFor(3000);
    const currentPage = await miniProgram.currentPage();
    if (!currentPage || currentPage.path !== 'pages/profile/index') {
      throw new Error(`当前页面不是个人中心，实际为: ${currentPage ? currentPage.path : 'unknown'}`);
    }

    console.log('先捕捉个人中心顶部首屏...');
    await takeScreen(miniProgram, 'ui-profile', 'top');

    console.log('滚动到个人中心底部，补拍底部操作区与底部 Bar...');
    await miniProgram.evaluate(() => new Promise((resolve) => {
      wx.pageScrollTo({
        scrollTop: 100000,
        duration: 350,
        success: resolve,
        fail: resolve
      });
    }));
    await page.waitFor(1200);

    await takeScreen(miniProgram, 'ui-profile', 'bottom-bar');

  } catch (e) {
    console.error('用例 ui-profile 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-profile 通信断开');
    }
  }
})();
