const { callCloud } = require("./cloud/call");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

function assertNumber(value, fieldName) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${fieldName} 必须是数字`);
  }
}

async function geocodeAddress(address) {
  assertNonEmptyString(address, "address");
  return callCloud("map", "geocode", { address: address.trim() });
}

async function reverseGeocode(latitude, longitude) {
  assertNumber(latitude, "latitude");
  assertNumber(longitude, "longitude");

  return callCloud("map", "reverseGeocode", {
    latitude,
    longitude
  });
}

async function searchNearby(latitude, longitude, keywords = "") {
  assertNumber(latitude, "latitude");
  assertNumber(longitude, "longitude");

  return callCloud("map", "searchNearby", {
    latitude,
    longitude,
    keywords: typeof keywords === "string" ? keywords.trim() : ""
  });
}

module.exports = {
  geocodeAddress,
  reverseGeocode,
  searchNearby
};
