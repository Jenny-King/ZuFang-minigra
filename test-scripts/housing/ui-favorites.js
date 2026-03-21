const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入收藏页面: /package-profile/pages/favorites/index');
    const page = await miniProgram.reLaunch('/package-profile/pages/favorites/index');
    await page.waitFor(3000);

    // 截取收藏列表（可能含有空状态的 EmptyState 组件）
    await takeScreen(miniProgram, 'ui-favorites');

    console.log('强制将收藏列表置空，测试缺省占位图...');
    await page.setData({ favoriteList: [], loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeScreen(miniProgram, 'ui-favorites');
  } catch (e) {
    console.error('用例 ui-favorites 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-favorites 通信断开');
    }
  }
})();
