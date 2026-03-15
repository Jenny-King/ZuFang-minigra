const { callCloud } = require("./cloud/call");
const { uploadToCloud } = require("./cloud/upload");
const { REQUEST_DEFAULT } = require("../config/constants");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

function assertObject(value, fieldName) {
  if (!value || Object.prototype.toString.call(value) !== "[object Object]") {
    throw new Error(`${fieldName} 必须是对象`);
  }
}

async function getHouseList(params = {}) {
  assertObject(params, "params");

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
  assertObject(formData, "formData");
  return callCloud("house", "create", formData);
}

async function updateHouse(houseId, formData = {}) {
  assertNonEmptyString(houseId, "houseId");
  assertObject(formData, "formData");

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
  assertObject(params, "params");
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
