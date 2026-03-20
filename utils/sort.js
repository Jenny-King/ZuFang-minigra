/**
 * utils/sort.js
 * 房源排序工具 — 从 home/index.js 提取
 */

const { HOUSE_SORT_BY } = require("../config/constants");

const LIST_SORT_TAB_KEYS = {
  LATEST: HOUSE_SORT_BY.LATEST,
  PRICE: "price",
  AREA: "area"
};

function isPriceSort(sortValue = "") {
  return sortValue === HOUSE_SORT_BY.PRICE_ASC || sortValue === HOUSE_SORT_BY.PRICE_DESC;
}

function isAreaSort(sortValue = "") {
  return sortValue === HOUSE_SORT_BY.AREA_ASC || sortValue === HOUSE_SORT_BY.AREA_DESC;
}

function buildListSortTabs(selectedSort = HOUSE_SORT_BY.LATEST) {
  return [
    {
      key: LIST_SORT_TAB_KEYS.LATEST,
      label: "最新",
      active: selectedSort === HOUSE_SORT_BY.LATEST
    },
    {
      key: LIST_SORT_TAB_KEYS.PRICE,
      label: selectedSort === HOUSE_SORT_BY.PRICE_DESC ? "价格 ↓" : "价格 ↑",
      active: isPriceSort(selectedSort)
    },
    {
      key: LIST_SORT_TAB_KEYS.AREA,
      label: selectedSort === HOUSE_SORT_BY.AREA_DESC ? "面积 ↓" : "面积 ↑",
      active: isAreaSort(selectedSort)
    }
  ];
}

function getNextListSort(currentSort = HOUSE_SORT_BY.LATEST, tabKey = LIST_SORT_TAB_KEYS.LATEST) {
  if (tabKey === LIST_SORT_TAB_KEYS.PRICE) {
    return currentSort === HOUSE_SORT_BY.PRICE_ASC
      ? HOUSE_SORT_BY.PRICE_DESC
      : HOUSE_SORT_BY.PRICE_ASC;
  }

  if (tabKey === LIST_SORT_TAB_KEYS.AREA) {
    return currentSort === HOUSE_SORT_BY.AREA_ASC
      ? HOUSE_SORT_BY.AREA_DESC
      : HOUSE_SORT_BY.AREA_ASC;
  }

  return HOUSE_SORT_BY.LATEST;
}

function sortBySelectedTab(list = [], sortValue = HOUSE_SORT_BY.LATEST) {
  const workingList = Array.isArray(list) ? list.slice() : [];
  if (isPriceSort(sortValue)) {
    const multiplier = sortValue === HOUSE_SORT_BY.PRICE_DESC ? -1 : 1;
    return workingList.sort((left, right) => (
      Number(left.price || 0) - Number(right.price || 0)
    ) * multiplier);
  }

  if (isAreaSort(sortValue)) {
    const multiplier = sortValue === HOUSE_SORT_BY.AREA_DESC ? -1 : 1;
    return workingList.sort((left, right) => (
      Number(left.area || 0) - Number(right.area || 0)
    ) * multiplier);
  }

  return workingList.sort((left, right) => {
    const leftTime = new Date(left.createTime || 0).getTime();
    const rightTime = new Date(right.createTime || 0).getTime();
    return rightTime - leftTime;
  });
}

module.exports = {
  LIST_SORT_TAB_KEYS,
  isPriceSort,
  isAreaSort,
  buildListSortTabs,
  getNextListSort,
  sortBySelectedTab
};
