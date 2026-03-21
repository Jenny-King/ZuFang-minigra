const {
  ACCOUNTS,
  prepareManualTestData
} = require("../../scripts/data/prepare-manual-test-data");

let preparedPromise = null;

function buildAccountMap() {
  return ACCOUNTS.reduce((result, item) => {
    result[item.key] = item;
    return result;
  }, {});
}

async function getPreparedContext(options = {}) {
  if (!preparedPromise || options.forceRefresh) {
    preparedPromise = prepareManualTestData({ silent: true });
  }

  const summary = await preparedPromise;
  const accountsByKey = buildAccountMap();
  const primaryHouseId = String(summary?.houses?.houseIds?.[0] || "");
  const secondaryHouseId = String(summary?.houses?.houseIds?.[1] || primaryHouseId || "");
  const conversationId = String(summary?.chat?.conversationId || "");

  if (!primaryHouseId) {
    throw new Error("测试房源未准备完成，无法执行 UI 自动化。");
  }
  if (!summary?.sessions?.tenant?.accessToken || !summary?.sessions?.landlord?.accessToken) {
    throw new Error("测试账号会话未准备完成，无法执行 UI 自动化。");
  }

  return {
    summary,
    accountsByKey,
    sessions: summary.sessions,
    primaryHouseId,
    secondaryHouseId,
    conversationId,
    tenantUserId: String(summary.sessions.tenant.userInfo.userId || ""),
    landlordUserId: String(summary.sessions.landlord.userInfo.userId || "")
  };
}

module.exports = {
  ACCOUNTS,
  getPreparedContext
};
