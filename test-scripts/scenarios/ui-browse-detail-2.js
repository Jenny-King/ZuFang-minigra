const { ROUTES } = require("../../config/routes");
const {
  navigateToAndWait,
  switchTabAndWait,
  waitForPageData
} = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { ensureLoggedInByInjection } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-browse-detail-2", async (miniProgram) => {
  const context = await ensureLoggedInByInjection(miniProgram, { accountKey: "tenant" });
  const homePage = await switchTabAndWait(miniProgram, ROUTES.HOME);

  await waitForPageData(homePage, (data) => (
    Array.isArray(data.houseList)
    && data.houseList.length > 0
    && !data.errorText
  ), "首页房源列表");

  const detailPage = await navigateToAndWait(
    miniProgram,
    `${ROUTES.HOUSE_DETAIL}?houseId=${context.primaryHouseId}`
  );

  await waitForPageData(detailPage, (data) => (
    String(data.houseId || "") === context.primaryHouseId
    && data.houseDetail
    && String(data.houseDetail.displayTitle || "").trim() !== ""
  ), "房源详情页");

  await takeSimulatorScreen("ui-browse-detail", "detail");
});
