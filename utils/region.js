/**
 * utils/region.js
 * 区域/城市筛选工具 — 从 home/index.js 提取
 */

const FALLBACK_REGION_OPTIONS = [{ label: "全部区域", value: "" }];
const CITY_WIDE_REGION_VALUE = "全市";

function buildRegionOptions(regions = []) {
  return FALLBACK_REGION_OPTIONS.concat(
    (Array.isArray(regions) ? regions : []).map((item) => ({
      label: item.name || "",
      value: item.name || "",
      city: item.city || ""
    }))
  );
}

function getRegionIndex(regionOptions = [], region = "", city = "") {
  const normalizedRegion = String(region || "").trim();
  if (!normalizedRegion) {
    return 0;
  }

  const normalizedCity = String(city || "").trim();
  const index = (Array.isArray(regionOptions) ? regionOptions : []).findIndex(
    (item) =>
      String(item?.value || "").trim() === normalizedRegion &&
      (!normalizedCity || !item.city || item.city === normalizedCity)
  );

  if (index >= 0) {
    return index;
  }

  const fallbackIndex = regionOptions.findIndex(
    (item) => String(item?.value || "").trim() === normalizedRegion
  );
  return fallbackIndex >= 0 ? fallbackIndex : 0;
}

function normalizeRegionValue(region = "") {
  const normalizedRegion = String(region || "").trim();
  return normalizedRegion === CITY_WIDE_REGION_VALUE
    ? ""
    : normalizedRegion;
}

function normalizeCityLabel(city = "") {
  const normalizedCity = String(city || "").trim();
  if (!normalizedCity) {
    return "";
  }

  return normalizedCity.endsWith("市")
    ? normalizedCity.slice(0, -1)
    : normalizedCity;
}

function normalizeDistrictName(locationDetail = {}) {
  return String(
    locationDetail?.district
    || locationDetail?.addressComponent?.district
    || locationDetail?.adInfo?.district
    || locationDetail?.region
    || ""
  ).trim();
}

function normalizeCityName(locationDetail = {}) {
  return String(
    locationDetail?.city
    || locationDetail?.addressComponent?.city
    || locationDetail?.adInfo?.city
    || ""
  ).trim();
}

function isSameCity(left = "", right = "") {
  const leftLabel = normalizeCityLabel(left);
  const rightLabel = normalizeCityLabel(right);
  return Boolean(leftLabel && rightLabel && leftLabel === rightLabel);
}

function buildCityOptions(regionOptions = []) {
  const cityMap = new Map();

  (Array.isArray(regionOptions) ? regionOptions : []).forEach((item) => {
    const cityValue = String(item?.city || "").trim();
    const cityLabel = normalizeCityLabel(cityValue);
    if (!cityValue || !cityLabel || cityMap.has(cityLabel)) {
      return;
    }

    cityMap.set(cityLabel, {
      label: cityLabel,
      value: cityValue
    });
  });

  return Array.from(cityMap.values());
}

function filterRegionOptionsByCity(regionOptions = [], city = "") {
  const normalizedCity = String(city || "").trim();
  const scopedRegionOptions = (Array.isArray(regionOptions) ? regionOptions : []).filter((item) => {
    if (!item || !item.value) {
      return false;
    }

    if (!normalizedCity) {
      return true;
    }

    return isSameCity(item.city, normalizedCity);
  });

  return FALLBACK_REGION_OPTIONS.concat(scopedRegionOptions);
}

function getFallbackCityFromRegions(regionOptions = []) {
  const cityOption = (Array.isArray(regionOptions) ? regionOptions : []).find((item) => item && item.city);
  return String(cityOption?.city || "").trim();
}

module.exports = {
  FALLBACK_REGION_OPTIONS,
  CITY_WIDE_REGION_VALUE,
  buildRegionOptions,
  getRegionIndex,
  normalizeRegionValue,
  normalizeCityLabel,
  normalizeDistrictName,
  normalizeCityName,
  isSameCity,
  buildCityOptions,
  filterRegionOptionsByCity,
  getFallbackCityFromRegions
};
