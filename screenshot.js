const automator = require('miniprogram-automator');

async function run() {
  console.log("Launching WeChat Developer Tools via CLI...");
  try {
    const miniProgram = await automator.launch({
      cliPath: 'C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat',
      projectPath: 'C:\\Users\\Q12\\.gemini\\antigravity\\scratch\\ZuFang-minigra',
    });

    console.log("Connected to simulator! Waiting for UI to fully render...");
    const page = await miniProgram.currentPage();

    // Wait 5 seconds to ensure maps, lazy images, and data bindings render properly
    await page.waitFor(5000);

    console.log("Taking screenshot...");
    await miniProgram.screenshot({
      path: 'C:\\Users\\Q12\\.gemini\\antigravity\\scratch\\ZuFang-minigra\\ui-snapshot.png'
    });

    console.log("Screenshot successfully saved as ui-snapshot.png");
    await miniProgram.disconnect();
  } catch (error) {
    console.error("Automation error:", error);
  }
}

run();
