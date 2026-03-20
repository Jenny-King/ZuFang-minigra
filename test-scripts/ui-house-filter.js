const { initAutomator, takeScreen } = require('./base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入租房首页...');
    const page = await miniProgram.reLaunch('/pages/home/index');
    await page.waitFor(3000);

    console.log('劫持页面渲染的 Data 将列表置空...');
    await page.setData({
      houseList: [],
      loading: false,
      isRefresh: false
    }).catch(() => {});
    await page.waitFor(1000);

    console.log('点击首页高优先级层级的下拉筛选菜单（如果支持）');
    // 如果没有该 CSS 类则可能直接点不中而略过
    const filterItem = await page.$('.van-dropdown-menu__item');
    if (filterItem) {
      await filterItem.tap();
      await page.waitFor(1000);
    }

    await takeScreen(miniProgram, 'ui-house-filter');
  } catch (e) {
    console.error('用例 ui-house-filter 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-house-filter 通信断开');
    }
  }
})();
