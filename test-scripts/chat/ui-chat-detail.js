const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入聊天详情页面...');
    const page = await miniProgram.reLaunch('/pages/chat/index?targetId=landlord-1');
    await page.waitFor(2000);

    console.log('在聊天列表里强行塞入超长文本模拟挤压情况...');
    await page.setData({
      messageList: [
        { id: 1, text: '这几天方便看下房吗？价格还能再谈谈码？' },
        { id: 2, text: '自动图文混排及换行超级长文本溢出检测用例：'.repeat(25) }
      ]
    }).catch(()=>{});
    await page.waitFor(1000);

// 尝试拉起软键盘
    const input = await page.$('.chat-input');
    if (input) {
      await input.tap();
      await page.waitFor(1500); // 留时间给软键盘及界面动画留空间
    }
    
    await takeScreen(miniProgram, 'ui-chat-detail');
  } catch (e) {
    console.error('用例 ui-chat-detail 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-chat-detail 通信断开');
    }
  }
})();
