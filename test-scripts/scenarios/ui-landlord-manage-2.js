const { ROUTES } = require("../../config/routes");
const {
  navigateToAndWait,
  switchTabAndWait,
  waitForPageData
} = require("../core/base");
const { runScenario } = require("../core/scenario-runner");
const { ensureLoggedInByInjection } = require("../core/session");
const { takeSimulatorScreen } = require("../core/simulator-capture");

runScenario("ui-landlord-manage-2", async (miniProgram) => {
  const context = await ensureLoggedInByInjection(miniProgram, { accountKey: "landlord" });

  const publishPage = await switchTabAndWait(miniProgram, ROUTES.PUBLISH);
  const publishData = await waitForPageData(publishPage, (data) => (
    String(data.pageMode || "") === "landlord"
    && Array.isArray(data.visibleList)
    && data.visibleList.length > 0
    && !data.errorText
  ), "房东房源管理页");

  console.log(`[ui-landlord-manage-2] landlordHouses=${publishData.visibleList.length}`);
  await takeSimulatorScreen("ui-landlord-manage", "publish-list");

  const editPage = await navigateToAndWait(
    miniProgram,
    `${ROUTES.PUBLISH_EDIT}?houseId=${context.primaryHouseId}`
  );
  await waitForPageData(editPage, (data) => (
    Boolean(data.isEdit)
    && String(data.houseId || "") === context.primaryHouseId
    && data.formData
    && String(data.formData.title || "").trim() !== ""
    && Array.isArray(data.imageList)
    && data.imageList.length > 0
  ), "房源编辑页回填");

  await takeSimulatorScreen("ui-landlord-manage", "edit-prefill");
});
