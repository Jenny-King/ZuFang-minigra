const { initAutomator, takeScreen } = require('../core/base');

(async () => {
  let miniProgram;
  try {
    miniProgram = await initAutomator();

    console.log('进入目标页面: /pages/chat/index');
    const page = await miniProgram.reLaunch('/pages/chat/index?targetId=landlord-test');
    await page.waitFor(2000);

    console.log('尝试输入一段逾 200 字超长文...');
    const chatInput = await page.$('.chat-input');
    const longText = '自动长文本测试'.repeat(30); 
    
    if (chatInput) {
      await chatInput.input(longText);
    } else {
      // 通过 evaluate 赋值强行注入到 data 或者通过其他方式如果组件没有暴露出标准 input
      console.log('未检测到默认 chat-input 节点');
    }

    const sendBtn = await page.$('.send-btn');
    if (sendBtn) {
      await sendBtn.tap();
    } else {
      // 触发表单等其他兜底手法
      page.callMethod('onSendTap').catch(() => {});
    }
    
    await page.waitFor(2000);

    await takeScreen(miniProgram, 'ui-chat');
  } catch (e) {
    console.error('用例 ui-chat 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-chat 通信断开');
    }
  }
})();
