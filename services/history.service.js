const { callCloud } = require("./cloud/call");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

async function getHistoryList(params = {}) {
  return callCloud("history", "getList", params);
}

async function addHistory(houseId) {
  assertNonEmptyString(houseId, "houseId");
  return callCloud("history", "add", { houseId: houseId.trim() });
}

async function removeHistory(historyId) {
  assertNonEmptyString(historyId, "historyId");
  return callCloud("history", "remove", { historyId: historyId.trim() });
}

async function clearHistory() {
  return callCloud("history", "clear", {});
}

module.exports = {
  getHistoryList,
  addHistory,
  removeHistory,
  clearHistory
};
