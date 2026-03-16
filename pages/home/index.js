const houseService = require("../../services/house.service");
const mapService = require("../../services/map.service");
const {
  HOUSE_TYPE,
  HOUSE_SORT_BY,
  PRICE_RANGE,
  REQUEST_DEFAULT,
  STORAGE_KEY
} = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../utils/format");
const storage = require("../../utils/storage");
const { logger } = require("../../utils/logger");
const toast = require("../../utils/toast");

const FALLBACK_REGION_OPTIONS = [{ label: "全部区域", value: "" }];
const FALLBACK_CITY_LABEL = "深圳";
const TYPE_OPTIONS = [
  { label: "全部户型", value: "" },
  { label: HOUSE_TYPE.STUDIO, value: HOUSE_TYPE.STUDIO },
  { label: HOUSE_TYPE.ONE_BEDROOM, value: HOUSE_TYPE.ONE_BEDROOM },
  { label: HOUSE_TYPE.TWO_BEDROOM, value: HOUSE_TYPE.TWO_BEDROOM },
  { label: HOUSE_TYPE.THREE_PLUS, value: HOUSE_TYPE.THREE_PLUS }
];
const PRICE_OPTIONS = PRICE_RANGE.map((item) => ({
  label: item.label,
  minPrice: Number(item.minPrice || 0),
  maxPrice: Number(item.maxPrice || 0)
}));
const LIST_SORT_TABS = [
  { label: "最新", value: HOUSE_SORT_BY.LATEST },
  { label: "价格 ↑", value: HOUSE_SORT_BY.PRICE_ASC },
  { label: "面积 ↑", value: "areaAsc" }
];
const FEATURED_BADGES = [
  { label: "热门精选", type: "red" },
  { label: "近地铁", type: "blue" },
  { label: "品质房源", type: "green" }
];
const FEATURED_ACCENT_CLASSES = ["accent-blue", "accent-green", "accent-gold"];
const CARD_ACCENT_CLASSES = ["accent-blue", "accent-green", "accent-gold", "accent-pink", "accent-purple"];

function buildRegionOptions(regions = []) {
  return FALLBACK_REGION_OPTIONS.concat(
    (Array.isArray(regions) ? regions : []).map((item) => ({
      label: item.name || "",
      value: item.name || "",
      city: item.city || ""
    }))
  );
}

function getRegionIndex(regionOptions = [], region = "") {
  const normalizedRegion = String(region || "").trim();
  if (!normalizedRegion) {
    return 0;
  }

  const matchedIndex = (Array.isArray(regionOptions) ? regionOptions : []).findIndex(
    (item) => String(item?.value || "").trim() === normalizedRegion
  );
  return matchedIndex >= 0 ? matchedIndex : 0;
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

function getFallbackCityFromRegions(regionOptions = []) {
  const cityOption = (Array.isArray(regionOptions) ? regionOptions : []).find((item) => item && item.city);
  return String(cityOption?.city || "").trim();
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

function formatArea(area) {
  const normalizedArea = Number(area || 0);
  return normalizedArea > 0 ? `${normalizedArea}㎡` : "面积待定";
}

function buildDisplayAddress(item = {}) {
  const region = String(item.region || "").trim();
  const address = fallbackText(item.address, "地址待完善");
  return region && address.indexOf(region) === -1
    ? `${region} · ${address}`
    : address;
}

function sortBySelectedTab(list = [], sortValue = HOUSE_SORT_BY.LATEST) {
  const workingList = Array.isArray(list) ? list.slice() : [];
  if (sortValue === HOUSE_SORT_BY.PRICE_ASC) {
    return workingList.sort((left, right) => Number(left.price || 0) - Number(right.price || 0));
  }

  if (sortValue === "areaAsc") {
    return workingList.sort((left, right) => Number(left.area || 0) - Number(right.area || 0));
  }

  return workingList.sort((left, right) => {
    const leftTime = new Date(left.createTime || 0).getTime();
    const rightTime = new Date(right.createTime || 0).getTime();
    return rightTime - leftTime;
  });
}

function getHasActiveFilter(data = {}) {
  return Boolean(
    String(data.keyword || "").trim()
    || String(data.keywordDraft || "").trim()
    || String(data.selectedCityRaw || "").trim()
    || Number(data.selectedRegionIndex || 0) > 0
    || Number(data.selectedTypeIndex || 0) > 0
    || Number(data.selectedPriceIndex || 0) > 0
    || String(data.selectedListSort || HOUSE_SORT_BY.LATEST) !== HOUSE_SORT_BY.LATEST
  );
}

Page({
  data: {
    keyword: "",
    keywordDraft: "",
    allRegionOptions: FALLBACK_REGION_OPTIONS,
    regionOptions: FALLBACK_REGION_OPTIONS,
    cityOptions: [],
    typeOptions: TYPE_OPTIONS,
    priceOptions: PRICE_OPTIONS,
    listSortTabs: LIST_SORT_TABS,
    selectedRegionIndex: 0,
    selectedTypeIndex: 0,
    selectedPriceIndex: 0,
    selectedListSort: HOUSE_SORT_BY.LATEST,
    houseList: [],
    featuredList: [],
    latestList: [],
    page: REQUEST_DEFAULT.PAGE,
    pageSize: REQUEST_DEFAULT.PAGE_SIZE,
    total: 0,
    hasMore: true,
    currentCityRaw: "",
    currentCityLabel: FALLBACK_CITY_LABEL,
    selectedCityRaw: "",
    selectedCityLabel: "",
    currentDistrict: "",
    currentLatitude: 0,
    currentLongitude: 0,
    currentLocationSource: "fallback",
    locationReady: false,
    locationLoading: false,
    locationErrorText: "",
    statusBarHeight: 0,
    topBarStyle: "",
    scrollAreaStyle: "",
    hasActiveFilter: false,
    loading: false,
    refreshing: false,
    errorText: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "home", query: options || {} });
    this.initTopBarMetrics();
    wx.nextTick(() => {
      this.measureTopBarHeight();
    });
    this.restoreCachedLocation();
    await this.initPage();
    this.measureTopBarHeight();
  },

  async onPullDownRefresh() {
    logger.info("home_pull_down_start", {});
    try {
      await this.refreshCurrentLocation({ silent: true });
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("home_pull_down_end", {});
    }
  },

  async onReachBottom() {
    logger.info("home_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.info("home_reach_bottom_end", {});
  },

  async initPage() {
    logger.info("home_init_start", {});
    await this.loadRegionOptions();
    this.applyFallbackLocation();
    await this.refreshCurrentLocation({ silent: true });
    await this.refreshList();
    logger.info("home_init_end", {});
  },

  restoreCachedLocation() {
    const cachedLocation = storage.getStorageSync(STORAGE_KEY.CURRENT_LOCATION, null);
    if (!cachedLocation || Object.prototype.toString.call(cachedLocation) !== "[object Object]") {
      logger.info("home_restore_cached_location_skip", {});
      return;
    }

    this.setData({
      ...buildLocationState(cachedLocation, "cache")
    });
    logger.info("home_restore_cached_location_end", {
      city: cachedLocation.city || "",
      region: cachedLocation.region || ""
    });
  },

  applyFallbackLocation() {
    if (this.data.currentCityRaw) {
      return;
    }

    const fallbackCity = getFallbackCityFromRegions(this.data.regionOptions);
    if (!fallbackCity) {
      this.setData({
        currentCityLabel: FALLBACK_CITY_LABEL,
        currentLocationSource: "fallback",
        locationReady: false
      });
      return;
    }

    this.setData({
      ...buildLocationState({ city: fallbackCity }, "fallback")
    });
    this.syncRegionScopeWithCity(fallbackCity, { preserveRegion: true });
    this.syncHasActiveFilter(buildLocationState({ city: fallbackCity }, "fallback"));
    logger.info("home_apply_fallback_location_end", { city: fallbackCity });
  },

  syncRegionScopeWithCity(city, options = {}) {
    const {
      preserveRegion = false,
      preferredRegion = ""
    } = options;
    const allRegionOptions = this.data.allRegionOptions.length
      ? this.data.allRegionOptions
      : FALLBACK_REGION_OPTIONS;
    const scopedRegionOptions = filterRegionOptionsByCity(allRegionOptions, city);
    const currentRegion = preferredRegion
      || (preserveRegion ? this.data.regionOptions[this.data.selectedRegionIndex]?.value || "" : "");
    const selectedRegionIndex = getRegionIndex(scopedRegionOptions, currentRegion);

    const nextState = {
      regionOptions: scopedRegionOptions,
      selectedRegionIndex
    };
    this.setData(nextState);
    this.syncHasActiveFilter(nextState);

    logger.info("home_sync_region_scope_end", {
      city: String(city || "").trim(),
      regionCount: scopedRegionOptions.length,
      selectedRegionIndex
    });
  },

  async loadRegionOptions() {
    logger.info("home_load_regions_start", {});
    try {
      logger.info("api_call", { func: "house.getRegions", params: {} });
      const regions = await houseService.getRegions();
      const allRegionOptions = buildRegionOptions(regions);
      const cityOptions = buildCityOptions(allRegionOptions);
      const scopedCity = this.data.selectedCityRaw || this.data.currentCityRaw || getFallbackCityFromRegions(allRegionOptions);
      const regionOptions = filterRegionOptionsByCity(allRegionOptions, scopedCity);
      const nextState = {
        allRegionOptions,
        cityOptions,
        regionOptions,
        selectedRegionIndex: getRegionIndex(regionOptions, this.data.regionOptions[this.data.selectedRegionIndex]?.value || "")
      };
      this.setData(nextState);
      this.syncHasActiveFilter(nextState);
      logger.info("api_resp", {
        func: "house.getRegions",
        code: 0,
        count: Array.isArray(regions) ? regions.length : 0
      });
    } catch (error) {
      this.setData({
        allRegionOptions: FALLBACK_REGION_OPTIONS,
        cityOptions: [],
        regionOptions: FALLBACK_REGION_OPTIONS,
        selectedRegionIndex: 0
      });
      logger.warn("home_load_regions_fallback", {
        err: error.message || "区域加载失败"
      });
    } finally {
      this.applyFallbackLocation();
      logger.info("home_load_regions_end", {
        count: this.data.regionOptions.length
      });
    }
  },

  buildQueryParams(targetPage) {
    logger.debug("home_build_query_start", { targetPage });
    const selectedRegionOption = this.data.regionOptions[this.data.selectedRegionIndex] || {};
    const selectedPriceOption = this.data.priceOptions[this.data.selectedPriceIndex] || {};
    const region = selectedRegionOption.value || "";
    const city = region
      ? String(selectedRegionOption.city || this.data.selectedCityRaw || "").trim()
      : String(this.data.selectedCityRaw || "").trim();
    const type = this.data.typeOptions[this.data.selectedTypeIndex]?.value || "";
    const sortBy = this.data.selectedListSort === "areaAsc"
      ? HOUSE_SORT_BY.LATEST
      : this.data.selectedListSort;

    const params = {
      keyword: this.data.keyword.trim(),
      city,
      region,
      type,
      minPrice: Number(selectedPriceOption.minPrice || 0),
      maxPrice: Number(selectedPriceOption.maxPrice || 0),
      sortBy,
      page: targetPage,
      pageSize: this.data.pageSize
    };

    logger.debug("home_build_query_end", { params });
    return params;
  },

  normalizeHouseList(list = []) {
    logger.debug("home_normalize_list_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalizedList = (Array.isArray(list) ? list : []).map((item, index) => ({
      ...item,
      displayTitle: fallbackText(item.title, "未命名房源"),
      displayPrice: formatPrice(Number(item.price) || 0, ""),
      displayAddress: buildDisplayAddress(item),
      displayType: fallbackText(item.layoutText || item.type, "未知户型"),
      displayArea: formatArea(item.area),
      displayRegion: fallbackText(item.region || normalizeCityLabel(item.city), "区域待定"),
      displayImage: Array.isArray(item.images) && item.images.length
        ? item.images[0]
        : "/assets/images/house-placeholder.png",
      displayCreateTime: item.createTime ? formatDate(item.createTime) : "",
      accentClass: CARD_ACCENT_CLASSES[index % CARD_ACCENT_CLASSES.length]
    }));
    logger.debug("home_normalize_list_end", { count: normalizedList.length });
    return normalizedList;
  },

  syncDisplayLists(sourceList = this.data.houseList) {
    const latestList = sortBySelectedTab(sourceList, this.data.selectedListSort).map((item, index) => ({
      ...item,
      accentClass: CARD_ACCENT_CLASSES[index % CARD_ACCENT_CLASSES.length]
    }));
    const featuredSource = sourceList
      .filter((item) => item.displayImage && item.displayImage !== "/assets/images/house-placeholder.png")
      .slice(0, 3);
    const featuredList = featuredSource.map((item, index) => ({
      ...item,
      accentClass: FEATURED_ACCENT_CLASSES[index % FEATURED_ACCENT_CLASSES.length],
      featuredBadgeLabel: FEATURED_BADGES[index % FEATURED_BADGES.length].label,
      featuredBadgeType: FEATURED_BADGES[index % FEATURED_BADGES.length].type
    }));

    this.setData({
      featuredList,
      latestList
    });
  },

  async refreshList() {
    logger.info("home_refresh_start", {});
    this.setData({
      refreshing: true,
      errorText: "",
      page: REQUEST_DEFAULT.PAGE,
      hasMore: true
    });

    try {
      await this.fetchHouseList({ initial: true });
    } finally {
      this.setData({ refreshing: false });
      logger.info("home_refresh_end", {});
    }
  },

  async loadMore() {
    logger.info("home_load_more_start", { hasMore: this.data.hasMore, loading: this.data.loading });
    if (!this.data.hasMore || this.data.loading) {
      logger.info("home_load_more_skip", {
        hasMore: this.data.hasMore,
        loading: this.data.loading
      });
      return;
    }

    await this.fetchHouseList({ initial: false });
    logger.info("home_load_more_end", {});
  },

  async fetchHouseList({ initial }) {
    logger.info("home_fetch_start", { initial });
    if (this.data.loading) {
      logger.info("home_fetch_skip_loading", {});
      return;
    }

    const targetPage = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const params = this.buildQueryParams(targetPage);

    this.setData({ loading: true, errorText: "" });
    logger.info("api_call", { func: "house.getList", params });

    try {
      const result = await houseService.getHouseList(params);
      const remoteList = this.normalizeHouseList(result.list || []);
      const mergedList = initial ? remoteList : this.data.houseList.concat(remoteList);
      const total = Number(result.total || 0);
      const loadedCount = mergedList.length;
      const hasMore = loadedCount < total;

      this.setData({
        houseList: mergedList,
        page: targetPage,
        total,
        hasMore
      });
      this.syncDisplayLists(mergedList);

      logger.info("api_resp", {
        func: "house.getList",
        code: 0,
        total,
        loadedCount,
        hasMore
      });
    } catch (error) {
      const message = error.message || "加载房源失败";
      this.setData({
        errorText: message,
        houseList: [],
        featuredList: [],
        latestList: []
      });
      logger.error("api_error", { func: "house.getList", err: message });
    } finally {
      this.setData({ loading: false });
      logger.info("home_fetch_end", { initial });
    }
  },

  onKeywordInput(event) {
    logger.debug("home_keyword_input_start", {});
    const keywordDraft = event.detail.value || "";
    this.setData({ keywordDraft });
    this.syncHasActiveFilter({ keywordDraft });
    logger.debug("home_keyword_input_end", { keywordDraft: this.data.keywordDraft });
  },

  async onSearchTap() {
    logger.info("home_search_tap_start", {});
    const keyword = this.data.keywordDraft || "";
    this.setData({ keyword });
    this.syncHasActiveFilter({ keyword });
    await this.refreshList();
    logger.info("home_search_tap_end", {});
  },

  async onCityTap() {
    logger.info("home_city_tap_start", {
      cityCount: this.data.cityOptions.length,
      selectedCity: this.data.selectedCityRaw || ""
    });

    const cityOptions = this.data.cityOptions;
    if (!cityOptions.length) {
      const refreshed = await this.refreshCurrentLocation({ silent: false, fromTap: true });
      if (refreshed) {
        const nextState = {
          selectedCityRaw: "",
          selectedCityLabel: ""
        };
        this.setData(nextState);
        this.syncHasActiveFilter(nextState);
        this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: false });
        await this.refreshList();
      }
      logger.info("home_city_tap_end", { fallbackRefresh: refreshed });
      return;
    }

    const currentCityRaw = this.data.currentCityRaw || getFallbackCityFromRegions(this.data.allRegionOptions);
    const refreshActionLabel = "重新定位当前城市";
    const itemList = cityOptions.map((item) => (
      isSameCity(item.value, currentCityRaw)
        ? `${item.label}（当前定位）`
        : item.label
    )).concat(refreshActionLabel);

    try {
      const result = await wx.showActionSheet({ itemList });
      const selectedIndex = Number(result?.tapIndex);
      const refreshIndex = itemList.length - 1;

      if (selectedIndex === refreshIndex) {
        const refreshed = await this.refreshCurrentLocation({ silent: false, fromTap: true });
        if (refreshed) {
          const nextState = {
            selectedCityRaw: "",
            selectedCityLabel: ""
          };
          this.setData(nextState);
          this.syncHasActiveFilter(nextState);
          this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: false });
          await this.refreshList();
        }
        logger.info("home_city_tap_end", { action: "refresh", refreshed });
        return;
      }

      const cityOption = cityOptions[selectedIndex];
      if (!cityOption) {
        logger.info("home_city_tap_end", { action: "noop" });
        return;
      }

      const isFollowCurrentCity = isSameCity(cityOption.value, currentCityRaw);
      const nextState = {
        selectedCityRaw: isFollowCurrentCity ? "" : cityOption.value,
        selectedCityLabel: isFollowCurrentCity ? "" : cityOption.label
      };
      this.setData(nextState);
      this.syncRegionScopeWithCity(cityOption.value, { preserveRegion: false });
      this.syncHasActiveFilter(nextState);
      await this.refreshList();
      logger.info("home_city_tap_end", {
        action: isFollowCurrentCity ? "follow_location" : "switch_city",
        city: cityOption.value
      });
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "");
      if (!/cancel/i.test(errMsg)) {
        logger.warn("home_city_tap_failed", { err: errMsg });
      }
      logger.info("home_city_tap_end", { canceled: true });
    }
  },

  async openSelectorSheet(options = {}) {
    const {
      itemList = [],
      currentIndex = 0
    } = options;
    if (!itemList.length) {
      return -1;
    }

    try {
      const result = await wx.showActionSheet({
        itemList: itemList.map((item, index) => (index === currentIndex ? `${item} ✓` : item))
      });
      return Number(result?.tapIndex);
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "");
      if (!/cancel/i.test(errMsg)) {
        logger.warn("home_selector_sheet_failed", { err: errMsg });
      }
      return -1;
    }
  },

  async onOpenRegionFilter() {
    const selectedIndex = await this.openSelectorSheet({
      itemList: this.data.regionOptions.map((item) => item.label),
      currentIndex: this.data.selectedRegionIndex
    });

    if (selectedIndex < 0 || selectedIndex === this.data.selectedRegionIndex) {
      return;
    }

    this.setData({ selectedRegionIndex: selectedIndex });
    this.syncHasActiveFilter({ selectedRegionIndex: selectedIndex });
    await this.refreshList();
  },

  async onOpenTypeFilter() {
    const selectedIndex = await this.openSelectorSheet({
      itemList: this.data.typeOptions.map((item) => item.label),
      currentIndex: this.data.selectedTypeIndex
    });

    if (selectedIndex < 0 || selectedIndex === this.data.selectedTypeIndex) {
      return;
    }

    this.setData({ selectedTypeIndex: selectedIndex });
    this.syncHasActiveFilter({ selectedTypeIndex: selectedIndex });
    await this.refreshList();
  },

  async onOpenPriceFilter() {
    const selectedIndex = await this.openSelectorSheet({
      itemList: this.data.priceOptions.map((item) => item.label),
      currentIndex: this.data.selectedPriceIndex
    });

    if (selectedIndex < 0 || selectedIndex === this.data.selectedPriceIndex) {
      return;
    }

    this.setData({ selectedPriceIndex: selectedIndex });
    this.syncHasActiveFilter({ selectedPriceIndex: selectedIndex });
    await this.refreshList();
  },

  async onOpenMoreFilter() {
    try {
      const result = await wx.showActionSheet({
        itemList: ["重新定位", "清空筛选"]
      });
      const selectedIndex = Number(result?.tapIndex);

      if (selectedIndex === 0) {
        const refreshed = await this.refreshCurrentLocation({ silent: false, fromTap: true });
        if (refreshed && !this.data.selectedCityRaw) {
          this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: true });
        }
        await this.refreshList();
        return;
      }

      if (selectedIndex === 1) {
        const nextState = {
          keyword: "",
          keywordDraft: "",
          selectedCityRaw: "",
          selectedCityLabel: "",
          selectedRegionIndex: 0,
          selectedTypeIndex: 0,
          selectedPriceIndex: 0,
          selectedListSort: HOUSE_SORT_BY.LATEST
        };
        this.setData(nextState);
        this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: false });
        this.syncHasActiveFilter(nextState);
        await this.refreshList();
      }
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "");
      if (!/cancel/i.test(errMsg)) {
        logger.warn("home_more_filter_failed", { err: errMsg });
      }
    }
  },

  async onListSortTap(event) {
    const sortValue = String(event.currentTarget.dataset.value || HOUSE_SORT_BY.LATEST);
    if (sortValue === this.data.selectedListSort) {
      return;
    }

    this.setData({ selectedListSort: sortValue });
    this.syncHasActiveFilter({ selectedListSort: sortValue });
    if (sortValue === "areaAsc") {
      this.syncDisplayLists();
      return;
    }

    await this.refreshList();
  },

  onGoDetail(event) {
    logger.info("home_go_detail_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.warn("home_go_detail_missing_house_id", {});
      return;
    }

    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
    logger.info("home_go_detail_end", { houseId });
  },

  async refreshCurrentLocation(options = {}) {
    const {
      silent = false,
      fromTap = false
    } = options;
    logger.info("home_refresh_location_start", { silent, fromTap });
    this.setData({
      locationLoading: true,
      locationErrorText: ""
    });

    try {
      const location = await wx.getLocation({
        type: "gcj02"
      });
      const latitude = Number(location?.latitude || 0);
      const longitude = Number(location?.longitude || 0);

      if (!latitude || !longitude) {
        throw new Error("未获取到有效定位坐标");
      }

      const reverseGeocodeResult = await mapService.reverseGeocode(latitude, longitude);
      const currentCityRaw = normalizeCityName(reverseGeocodeResult);
      const currentDistrict = normalizeDistrictName(reverseGeocodeResult);
      const nextLocation = buildCachedLocationPayload({
        city: currentCityRaw,
        region: currentDistrict,
        latitude,
        longitude
      });

      storage.setStorageSync(STORAGE_KEY.CURRENT_LOCATION, nextLocation);
      this.setData({
        ...buildLocationState(nextLocation, "gps"),
        locationErrorText: ""
      });
      if (!this.data.selectedCityRaw) {
        this.syncRegionScopeWithCity(currentCityRaw, { preserveRegion: true });
      }
      logger.info("home_refresh_location_end", {
        city: currentCityRaw,
        district: currentDistrict,
        latitude,
        longitude
      });
      return true;
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "定位失败");
      const isPermissionDenied = /auth deny|auth denied|auth forbid|permission denied/i.test(errMsg);
      const locationErrorText = isPermissionDenied ? "定位未授权" : "定位失败";
      this.setData({ locationErrorText });
      logger.warn("home_refresh_location_failed", {
        err: errMsg,
        isPermissionDenied
      });

      if (fromTap && isPermissionDenied) {
        const modalRes = await wx.showModal({
          title: "开启定位权限",
          content: "开启后可自动定位当前城市，是否前往设置？",
          confirmText: "去设置",
          confirmColor: "#3c7bfd",
          cancelColor: "#999999"
        });

        if (modalRes.confirm) {
          const settingRes = await wx.openSetting();
          if (settingRes?.authSetting?.["scope.userLocation"]) {
            this.setData({ locationLoading: false });
            return await this.refreshCurrentLocation({ silent, fromTap: false });
          }
        }
      } else if (!silent) {
        toast.error(locationErrorText);
      }

      return false;
    } finally {
      this.setData({ locationLoading: false });
    }
  },

  initTopBarMetrics() {
    const systemInfo = wx.getSystemInfoSync();
    const statusBarHeight = Number(systemInfo?.statusBarHeight || 0);

    this.setData({
      statusBarHeight,
      topBarStyle: "",
      scrollAreaStyle: ""
    });
  },

  measureTopBarHeight() {
    const query = wx.createSelectorQuery();
    query.select("#homeTopBar").boundingClientRect();
    query.exec((result = []) => {
      const rect = result[0];
      if (!rect || !rect.height) {
        return;
      }

      this.setData({
        scrollAreaStyle: `padding-top:${rect.height}px;`
      });
    });
  },

  syncHasActiveFilter(nextData = {}) {
    this.setData({
      hasActiveFilter: getHasActiveFilter({
        ...this.data,
        ...nextData
      })
    });
  },

  async resetFilter() {
    const nextState = {
      keyword: "",
      keywordDraft: "",
      selectedCityRaw: "",
      selectedCityLabel: "",
      selectedRegionIndex: 0,
      selectedTypeIndex: 0,
      selectedPriceIndex: 0,
      selectedListSort: HOUSE_SORT_BY.LATEST
    };
    this.setData(nextState);
    this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: false });
    this.syncHasActiveFilter(nextState);
    await this.refreshList();
  }
});
