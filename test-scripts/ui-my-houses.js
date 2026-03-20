const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入我的房源管理页面: /pages/publish/index');
    const page = await miniProgram.switchTab('/pages/publish/index');
    await page.waitFor(3000);

    await takeScreen(miniProgram, 'ui-my-houses');

    console.log('强制清空房源列表测试缺省提示...');
    await page.setData({ houseList: [], empty: true, loading: false }).catch(() => {});
    await page.waitFor(1000);
    await takeScreen(miniProgram, 'ui-my-houses');
  } catch (e) {
    console.error('用例 ui-my-houses 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-my-houses 通信断开');
    }
  }
})();
