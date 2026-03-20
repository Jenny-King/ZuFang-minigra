/**
 * utils/filter.js
 * 房源筛选/过滤工具 — 从 home/index.js 提取
 */

const ROOM_FILTER_OPTIONS = [
  { label: "不限", value: "all" },
  { label: "一室", value: "1" },
  { label: "二室", value: "2" },
  { label: "三室", value: "3" },
  { label: "四室及以上", value: "4+" }
];

function normalizePriceInputValue(value = "") {
  return String(value || "").replace(/[^\d]/g, "").slice(0, 6);
}

function parsePriceValue(value = "") {
  const normalizedValue = normalizePriceInputValue(value);
  return normalizedValue ? Number(normalizedValue) : 0;
}

function buildPriceLabel(minPrice = "", maxPrice = "") {
  const normalizedMinPrice = parsePriceValue(minPrice);
  const normalizedMaxPrice = parsePriceValue(maxPrice);

  if (normalizedMinPrice && normalizedMaxPrice) {
    return `${normalizedMinPrice}-${normalizedMaxPrice}`;
  }

  if (normalizedMinPrice) {
    return `${normalizedMinPrice}+`;
  }

  if (normalizedMaxPrice) {
    return `${normalizedMaxPrice}以下`;
  }

  return "";
}

function normalizeRoomFilterValues(values = []) {
  const sourceValues = Array.isArray(values)
    ? values
    : [values];
  const normalizedValues = sourceValues
    .map((item) => String(item || "").trim())
    .filter((item) => ROOM_FILTER_OPTIONS.some((option) => option.value === item && item !== "all"));

  return Array.from(new Set(normalizedValues));
}

function buildRoomFilterOptions(selectedValues = []) {
  const normalizedValues = normalizeRoomFilterValues(selectedValues);
  return ROOM_FILTER_OPTIONS.map((item) => ({
    ...item,
    selected: item.value === "all"
      ? !normalizedValues.length
      : normalizedValues.includes(item.value)
  }));
}

function buildRoomFilterLabel(values = []) {
  const normalizedValues = normalizeRoomFilterValues(values);
  if (!normalizedValues.length) {
    return "";
  }

  if (normalizedValues.length > 1) {
    return "多选";
  }

  const labels = ROOM_FILTER_OPTIONS
    .filter((item) => item.value !== "all" && normalizedValues.includes(item.value))
    .map((item) => item.label);

  return labels[0] || "";
}

function clampOptionIndex(options = [], index = 0) {
  const maxIndex = Math.max((Array.isArray(options) ? options.length : 0) - 1, 0);
  const normalizedIndex = Number(index || 0);
  if (!Number.isInteger(normalizedIndex) || normalizedIndex < 0) {
    return 0;
  }

  return Math.min(normalizedIndex, maxIndex);
}

function buildDraftSelectionState(source = {}) {
  return {
    draftRegionIndex: Number(source.selectedRegionIndex || 0),
    draftRoomFilterValues: normalizeRoomFilterValues(source.selectedRoomFilterValues),
    draftRoomFilterOptions: buildRoomFilterOptions(source.selectedRoomFilterValues),
    draftMinPrice: normalizePriceInputValue(source.selectedMinPrice),
    draftMaxPrice: normalizePriceInputValue(source.selectedMaxPrice)
  };
}

function formatArea(area) {
  const normalizedArea = Number(area || 0);
  return normalizedArea > 0 ? `${normalizedArea}㎡` : "面积待定";
}

module.exports = {
  ROOM_FILTER_OPTIONS,
  normalizePriceInputValue,
  parsePriceValue,
  buildPriceLabel,
  normalizeRoomFilterValues,
  buildRoomFilterOptions,
  buildRoomFilterLabel,
  clampOptionIndex,
  buildDraftSelectionState,
  formatArea
};
