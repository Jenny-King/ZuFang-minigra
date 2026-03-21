const { ROUTES } = require("../../config/routes");
const {
  navigateToAndWait,
  waitForPageData
} = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { ensureLoggedInByInjection } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-favorites-history-2", async (miniProgram) => {
  const context = await ensureLoggedInByInjection(miniProgram, { accountKey: "tenant" });

  if (Number(context.summary.counts.tenantFavorites || 0) <= 0) {
    throw new Error("租客收藏数据未准备完成");
  }
  if (Number(context.summary.counts.tenantHistory || 0) <= 0) {
    throw new Error("租客历史数据未准备完成");
  }

  const favoritesPage = await navigateToAndWait(miniProgram, ROUTES.PROFILE_FAVORITES);
  const favoritesData = await waitForPageData(favoritesPage, (data) => (
    Array.isArray(data.list)
    && data.list.length > 0
    && !data.errorText
  ), "收藏页有数据");

  console.log(`[ui-favorites-history-2] favorites=${favoritesData.list.length}`);
  await takeSimulatorScreen("ui-favorites-history", "favorites");

  const historyPage = await navigateToAndWait(miniProgram, ROUTES.PROFILE_HISTORY);
  const historyData = await waitForPageData(historyPage, (data) => (
    Array.isArray(data.list)
    && data.list.length > 0
    && !data.errorText
  ), "历史页有数据");

  console.log(`[ui-favorites-history-2] history=${historyData.list.length}`);
  await takeSimulatorScreen("ui-favorites-history", "history");
});
