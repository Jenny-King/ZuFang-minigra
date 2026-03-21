const { initAutomator } = require("./base");

async function runScenario(name, task) {
  let miniProgram = null;

  try {
    console.log(`[${name}] start`);
    miniProgram = await initAutomator();
    await task(miniProgram);
    console.log(`[${name}] success`);
  } catch (error) {
    console.error(`[${name}] fail:`, error && error.stack ? error.stack : error);
    process.exitCode = 1;
  } finally {
    if (miniProgram) {
      try {
        await miniProgram.disconnect();
      } catch (disconnectError) {
        console.error(`[${name}] disconnect fail:`, disconnectError && disconnectError.message ? disconnectError.message : disconnectError);
      }
    }
  }
}

module.exports = {
  runScenario
};
