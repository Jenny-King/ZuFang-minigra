const { ROUTES } = require("../../config/routes");
const { switchTabAndWait, waitForPageData } = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { loginByPasswordThroughUi } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-auth-home-2", async (miniProgram) => {
  const context = await loginByPasswordThroughUi(miniProgram, "tenant");
  const homePage = await switchTabAndWait(miniProgram, ROUTES.HOME);

  await waitForPageData(homePage, (data) => (
    Array.isArray(data.houseList)
    && data.houseList.length > 0
    && !data.errorText
  ), "登录后首页房源列表");

  console.log(`[ui-auth-home-2] loggedInPhone=${context.account.phone}`);
  await takeSimulatorScreen("ui-auth-home", "tenant-home");
});
