const { callCloud } = require("./cloud/call");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

async function getFavoriteList(params = {}) {
  return callCloud("favorite", "getList", params);
}

async function toggleFavorite(houseId) {
  assertNonEmptyString(houseId, "houseId");
  return callCloud("favorite", "toggle", { houseId: houseId.trim() });
}

async function checkFavorite(houseId) {
  assertNonEmptyString(houseId, "houseId");
  return callCloud("favorite", "check", { houseId: houseId.trim() });
}

module.exports = {
  getFavoriteList,
  toggleFavorite,
  checkFavorite
};
