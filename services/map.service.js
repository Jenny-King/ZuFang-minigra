const { callCloud } = require("./cloud/call");
const { assertNonEmptyString, assertNumber } = require("../utils/assert");

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
