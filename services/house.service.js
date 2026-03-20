const { callCloud } = require("./cloud/call");
const { uploadToCloud } = require("./cloud/upload");
const { REQUEST_DEFAULT } = require("../config/constants");
const { assertNonEmptyString, assertPlainObject } = require("../utils/assert");

async function getHouseList(params = {}) {
  assertPlainObject(params, "params");

  const normalizedParams = {
    page: REQUEST_DEFAULT.PAGE,
    pageSize: REQUEST_DEFAULT.PAGE_SIZE,
    ...params
  };

  return callCloud("house", "getList", normalizedParams);
}

async function getRegions() {
  return callCloud("house", "getRegions", {});
}

async function getHouseDetail(houseId) {
  assertNonEmptyString(houseId, "houseId");
  return callCloud("house", "getDetail", { houseId: houseId.trim() });
}

async function createHouse(formData = {}) {
  assertPlainObject(formData, "formData");
  return callCloud("house", "create", formData);
}

async function updateHouse(houseId, formData = {}) {
  assertNonEmptyString(houseId, "houseId");
  assertPlainObject(formData, "formData");

  return callCloud("house", "update", {
    houseId: houseId.trim(),
    ...formData
  });
}

async function updateHouseStatus(houseId, status) {
  assertNonEmptyString(houseId, "houseId");
  assertNonEmptyString(status, "status");

  return callCloud("house", "update", {
    houseId: houseId.trim(),
    status: status.trim()
  });
}

async function deleteHouse(houseId) {
  assertNonEmptyString(houseId, "houseId");
  return callCloud("house", "remove", { houseId: houseId.trim() });
}

async function getMyHouseList(params = {}) {
  assertPlainObject(params, "params");
  return callCloud("house", "getMine", params);
}

async function uploadHouseImage(filePath, cloudPath) {
  assertNonEmptyString(filePath, "filePath");
  assertNonEmptyString(cloudPath, "cloudPath");
  return uploadToCloud(filePath, cloudPath);
}

module.exports = {
  getHouseList,
  getRegions,
  getHouseDetail,
  createHouse,
  updateHouse,
  updateHouseStatus,
  deleteHouse,
  getMyHouseList,
  uploadHouseImage
};
