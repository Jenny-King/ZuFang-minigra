const { initAutomator, takeSimulatorScreen } = require('../simulator-capture');

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
      console.log('未检测到默认 chat-input 节点');
    }

    const sendBtn = await page.$('.send-btn');
    if (sendBtn) {
      await sendBtn.tap();
    } else {
      page.callMethod('onSendTap').catch(() => {});
    }

    await page.waitFor(2000);
    await takeSimulatorScreen('ui-chat', 'simulator');
  } catch (e) {
    console.error('用例 ui-chat-2 执行异常:', e);
  } finally {
    if (miniProgram) {
      await miniProgram.disconnect();
      console.log('ui-chat-2 通信断开');
    }
  }
})();
