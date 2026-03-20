/**
 * utils/location.js
 * 定位状态构建工具 — 从 home/index.js 提取
 */

const { normalizeCityLabel } = require("./region");

const FALLBACK_CITY_LABEL = "深圳";

function buildLocationState(location = {}, source = "fallback") {
  const currentCityRaw = String(location.city || "").trim();
  const currentDistrict = String(location.region || location.district || "").trim();
  const currentLatitude = Number(location.latitude || 0);
  const currentLongitude = Number(location.longitude || 0);

  return {
    currentCityRaw,
    currentCityLabel: normalizeCityLabel(currentCityRaw) || FALLBACK_CITY_LABEL,
    currentDistrict,
    currentLatitude,
    currentLongitude,
    currentLocationSource: source,
    locationReady: Boolean(currentCityRaw)
  };
}

function buildCachedLocationPayload(location = {}) {
  return {
    city: String(location.city || "").trim(),
    region: String(location.region || location.district || "").trim(),
    latitude: Number(location.latitude || 0),
    longitude: Number(location.longitude || 0),
    updateTime: new Date().toISOString()
  };
}

module.exports = {
  FALLBACK_CITY_LABEL,
  buildLocationState,
  buildCachedLocationPayload
};
