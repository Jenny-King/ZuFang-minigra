const { ROUTES } = require("../../config/routes");
const {
  navigateToAndWait,
  switchTabAndWait,
  waitForPageData
} = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { ensureLoggedInByInjection } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-settings-security-2", async (miniProgram) => {
  const context = await ensureLoggedInByInjection(miniProgram, { accountKey: "tenant" });

  const profilePage = await switchTabAndWait(miniProgram, ROUTES.PROFILE);
  await waitForPageData(profilePage, (data) => (
    Boolean(data.isLoggedIn)
    && data.userInfo
    && String(data.userInfo.phone || "") === context.account.phone
  ), "我的页登录状态");
  await takeSimulatorScreen("ui-settings-security", "profile");

  const settingsPage = await navigateToAndWait(miniProgram, ROUTES.PROFILE_SETTINGS);
  await waitForPageData(settingsPage, (data) => (
    data.userInfo
    && String(data.userInfo.displayPhone || "").trim() !== ""
    && data.phoneEntryMeta
  ), "设置页用户信息");
  await takeSimulatorScreen("ui-settings-security", "settings");

  const changePasswordPage = await navigateToAndWait(miniProgram, ROUTES.PROFILE_CHANGE_PASSWORD);
  await waitForPageData(changePasswordPage, (data) => (
    typeof data.passwordRuleText === "string"
    && data.passwordRuleText.length > 0
  ), "修改密码页");
  await takeSimulatorScreen("ui-settings-security", "change-password");
});
