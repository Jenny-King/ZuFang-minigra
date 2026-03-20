const houseService = require("../../services/house.service");
const mapService = require("../../services/map.service");
const {
  HOUSE_SORT_BY,
  REQUEST_DEFAULT,
  STORAGE_KEY
} = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../utils/format");
const storage = require("../../utils/storage");
const { logger } = require("../../utils/logger");
const toast = require("../../utils/toast");
const {
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
} = require("../../utils/region");
const {
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
} = require("../../utils/filter");
const {
  LIST_SORT_TAB_KEYS,
  isPriceSort,
  isAreaSort,
  buildListSortTabs,
  getNextListSort,
  sortBySelectedTab
} = require("../../utils/sort");
const {
  FALLBACK_CITY_LABEL,
  buildLocationState,
  buildCachedLocationPayload
} = require("../../utils/location");

const FEATURED_BADGES = [
  { label: "热门精选", type: "red" },
  { label: "近地铁", type: "blue" },
  { label: "品质房源", type: "green" }
];

const DROPDOWN_CLOSE_DURATION = 220;
const FILTER_DROPDOWN_KEYS = ["region", "type", "price"];

function buildDisplayAddress(item = {}) {
  const region = String(item.region || "").trim();
  const address = fallbackText(item.address, "地址待完善");
  return region && address.indexOf(region) === -1
    ? `${region} · ${address}`
    : address;
}

function getHasActiveFilter(data = {}) {
  return Boolean(
    String(data.keyword || "").trim()
    || String(data.keywordDraft || "").trim()
    || String(data.selectedCityRaw || "").trim()
    || Number(data.selectedRegionIndex || 0) > 0
    || normalizeRoomFilterValues(data.selectedRoomFilterValues).length > 0
    || parsePriceValue(data.selectedMinPrice) > 0
    || parsePriceValue(data.selectedMaxPrice) > 0
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
    roomFilterOptions: buildRoomFilterOptions(),
    listSortTabs: buildListSortTabs(HOUSE_SORT_BY.LATEST),
    selectedRegionIndex: 0,
    selectedRoomFilterValues: [],
    selectedRoomFilterLabel: "",
    selectedMinPrice: "",
    selectedMaxPrice: "",
    selectedPriceLabel: "",
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
    topBarHeight: 0,
    dropdownTop: 0,
    topBarStyle: "",
    scrollAreaStyle: "",
    activeDropdown: "",
    dropdownVisible: false,
    dropdownEntered: false,
    draftRegionIndex: 0,
    draftRoomFilterValues: [],
    draftRoomFilterOptions: buildRoomFilterOptions(),
    draftMinPrice: "",
    draftMaxPrice: "",
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
    logger.debug("home_pull_down_start", {});
    try {
      await this.refreshCurrentLocation({ silent: true });
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("home_pull_down_end", {});
    }
  },

  async onReachBottom() {
    logger.debug("home_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.debug("home_reach_bottom_end", {});
  },

  onHide() {
    this.clearDropdownTimer();
    this.setData({
      dropdownVisible: false,
      dropdownEntered: false,
      activeDropdown: "",
      ...buildDraftSelectionState(this.data)
    });
  },

  onUnload() {
    this.clearDropdownTimer();
  },

  async initPage() {
    logger.debug("home_init_start", {});
    await this.loadRegionOptions();
    this.applyFallbackLocation();
    await this.refreshCurrentLocation({ silent: true });
    await this.refreshList();
    logger.debug("home_init_end", {});
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
    logger.debug("home_restore_cached_location_end", {
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
    logger.debug("home_apply_fallback_location_end", { city: fallbackCity });
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
    if (!this.data.dropdownVisible || this.data.activeDropdown !== "region") {
      nextState.draftRegionIndex = selectedRegionIndex;
    }
    this.setData(nextState);
    this.syncHasActiveFilter(nextState);

    logger.debug("home_sync_region_scope_end", {
      city: String(city || "").trim(),
      regionCount: scopedRegionOptions.length,
      selectedRegionIndex
    });
  },

  async loadRegionOptions() {
    logger.debug("home_load_regions_start", {});
    try {
      logger.debug("api_call", { func: "house.getRegions", params: {} });
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
      nextState.draftRegionIndex = nextState.selectedRegionIndex;
      this.setData(nextState);
      this.syncHasActiveFilter(nextState);
      logger.debug("api_resp", {
        func: "house.getRegions",
        code: 0,
        count: Array.isArray(regions) ? regions.length : 0
      });
    } catch (error) {
      this.setData({
        allRegionOptions: FALLBACK_REGION_OPTIONS,
        cityOptions: [],
        regionOptions: FALLBACK_REGION_OPTIONS,
        selectedRegionIndex: 0,
        draftRegionIndex: 0
      });
      logger.warn("home_load_regions_fallback", {
        err: error.message || "区域加载失败"
      });
    } finally {
      this.applyFallbackLocation();
      logger.debug("home_load_regions_end", {
        count: this.data.regionOptions.length
      });
    }
  },

  buildQueryParams(targetPage) {
    logger.debug("home_build_query_start", { targetPage });
    const selectedRegionOption = this.data.regionOptions[this.data.selectedRegionIndex] || {};
    const rawRegion = String(selectedRegionOption.value || "").trim();
    const region = normalizeRegionValue(rawRegion);
    const city = (region || rawRegion === CITY_WIDE_REGION_VALUE)
      ? String(selectedRegionOption.city || this.data.selectedCityRaw || this.data.currentCityRaw || "").trim()
      : String(this.data.selectedCityRaw || "").trim();
    const roomFilters = normalizeRoomFilterValues(this.data.selectedRoomFilterValues);
    const minPrice = parsePriceValue(this.data.selectedMinPrice);
    const maxPrice = parsePriceValue(this.data.selectedMaxPrice);

    const params = {
      keyword: this.data.keyword.trim(),
      city,
      region,
      roomFilters,
      minPrice,
      maxPrice,
      sortBy: this.data.selectedListSort,
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
      displayCreateTime: item.createTime ? formatDate(item.createTime) : ""
    }));
    logger.debug("home_normalize_list_end", { count: normalizedList.length });
    return normalizedList;
  },

  syncDisplayLists(sourceList = this.data.houseList) {
    const latestList = sortBySelectedTab(sourceList, this.data.selectedListSort);
    const featuredSource = sourceList
      .filter((item) => item.displayImage && item.displayImage !== "/assets/images/house-placeholder.png")
      .slice(0, 3);
    const featuredList = featuredSource.map((item, index) => ({
      ...item,
      featuredBadgeLabel: FEATURED_BADGES[index % FEATURED_BADGES.length].label,
      featuredBadgeType: FEATURED_BADGES[index % FEATURED_BADGES.length].type
    }));

    this.setData({
      featuredList,
      latestList
    });
  },

  async refreshList() {
    logger.debug("home_refresh_start", {});
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
      logger.debug("home_refresh_end", {});
    }
  },

  async loadMore() {
    logger.debug("home_load_more_start", { hasMore: this.data.hasMore, loading: this.data.loading });
    if (!this.data.hasMore || this.data.loading) {
      logger.info("home_load_more_skip", {
        hasMore: this.data.hasMore,
        loading: this.data.loading
      });
      return;
    }

    await this.fetchHouseList({ initial: false });
    logger.debug("home_load_more_end", {});
  },

  async fetchHouseList({ initial }) {
    logger.debug("home_fetch_start", { initial });
    if (this.data.loading) {
      logger.info("home_fetch_skip_loading", {});
      return;
    }

    const targetPage = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const params = this.buildQueryParams(targetPage);

    this.setData({ loading: true, errorText: "" });
    logger.debug("api_call", { func: "house.getList", params });

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

      logger.debug("api_resp", {
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
      logger.debug("home_fetch_end", { initial });
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
    logger.debug("home_search_tap_start", {});
    this.closeDropdownPanel();
    const keyword = this.data.keywordDraft || "";
    this.setData({ keyword });
    this.syncHasActiveFilter({ keyword });
    await this.refreshList();
    logger.debug("home_search_tap_end", {});
  },

  async onCityTap() {
    logger.debug("home_city_tap_start", {
      cityCount: this.data.cityOptions.length,
      selectedCity: this.data.selectedCityRaw || ""
    });
    this.closeDropdownPanel();

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
      logger.debug("home_city_tap_end", { fallbackRefresh: refreshed });
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
        logger.debug("home_city_tap_end", { action: "refresh", refreshed });
        return;
      }

      const cityOption = cityOptions[selectedIndex];
      if (!cityOption) {
        logger.debug("home_city_tap_end", { action: "noop" });
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
      logger.debug("home_city_tap_end", {
        action: isFollowCurrentCity ? "follow_location" : "switch_city",
        city: cityOption.value
      });
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "");
      if (!/cancel/i.test(errMsg)) {
        logger.warn("home_city_tap_failed", { err: errMsg });
      }
      logger.debug("home_city_tap_end", { canceled: true });
    }
  },

  clearDropdownTimer() {
    if (this.dropdownCloseTimer) {
      clearTimeout(this.dropdownCloseTimer);
      this.dropdownCloseTimer = null;
    }
  },

  openDropdownPanel(key) {
    this.clearDropdownTimer();

    if (this.data.dropdownVisible) {
      this.setData({ activeDropdown: key });
      wx.nextTick(() => {
        this.setData({ dropdownEntered: true });
      });
      return;
    }

    this.setData({
      activeDropdown: key,
      dropdownVisible: true,
      dropdownEntered: false,
      ...buildDraftSelectionState(this.data)
    });
    wx.nextTick(() => {
      this.setData({ dropdownEntered: true });
    });
  },

  closeDropdownPanel() {
    if (!this.data.dropdownVisible) {
      return;
    }

    this.clearDropdownTimer();
    this.setData({ dropdownEntered: false });
    this.dropdownCloseTimer = setTimeout(() => {
      this.setData({
        dropdownVisible: false,
        activeDropdown: "",
        dropdownEntered: false,
        ...buildDraftSelectionState(this.data)
      });
      this.dropdownCloseTimer = null;
    }, DROPDOWN_CLOSE_DURATION);
  },

  onFilterChipTap(event) {
    const key = String(event.currentTarget.dataset.key || "").trim();
    if (!FILTER_DROPDOWN_KEYS.includes(key)) {
      return;
    }

    if (this.data.dropdownVisible && this.data.activeDropdown === key && this.data.dropdownEntered) {
      this.closeDropdownPanel();
      return;
    }

    this.openDropdownPanel(key);
  },

  onCloseDropdown() {
    this.closeDropdownPanel();
  },

  noop() {},

  onSelectDropdownOption(event) {
    const key = String(event.currentTarget.dataset.key || "").trim();
    const index = Number(event.currentTarget.dataset.index);
    if (!Number.isInteger(index) || index < 0) {
      return;
    }

    if (key === "region") {
      this.setData({ draftRegionIndex: clampOptionIndex(this.data.regionOptions, index) });
    }
  },

  onToggleRoomFilter(event) {
    const value = String(event.currentTarget.dataset.value || "").trim();
    if (!value) {
      return;
    }

    if (value === "all") {
      this.setData({
        draftRoomFilterValues: [],
        draftRoomFilterOptions: buildRoomFilterOptions([])
      });
      return;
    }

    const currentValues = normalizeRoomFilterValues(this.data.draftRoomFilterValues);
    const nextValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : currentValues.concat(value);
    const normalizedValues = normalizeRoomFilterValues(nextValues);

    this.setData({
      draftRoomFilterValues: normalizedValues,
      draftRoomFilterOptions: buildRoomFilterOptions(normalizedValues)
    });
  },

  onPriceInput(event) {
    const field = String(event.currentTarget.dataset.field || "").trim();
    const value = normalizePriceInputValue(event.detail?.value);

    if (field === "min") {
      this.setData({ draftMinPrice: value });
      return;
    }

    if (field === "max") {
      this.setData({ draftMaxPrice: value });
    }
  },

  onDropdownReset() {
    this.setData({
      draftRegionIndex: 0,
      draftRoomFilterValues: [],
      draftRoomFilterOptions: buildRoomFilterOptions([]),
      draftMinPrice: "",
      draftMaxPrice: ""
    });
  },

  async onDropdownConfirm() {
    const nextMinPrice = normalizePriceInputValue(this.data.draftMinPrice);
    const nextMaxPrice = normalizePriceInputValue(this.data.draftMaxPrice);
    const parsedMinPrice = parsePriceValue(nextMinPrice);
    const parsedMaxPrice = parsePriceValue(nextMaxPrice);

    if (parsedMinPrice && parsedMaxPrice && parsedMinPrice > parsedMaxPrice) {
      toast.error("最高租金需大于等于最低租金");
      return;
    }

    const nextState = {
      selectedRegionIndex: clampOptionIndex(this.data.regionOptions, this.data.draftRegionIndex),
      selectedRoomFilterValues: normalizeRoomFilterValues(this.data.draftRoomFilterValues),
      selectedRoomFilterLabel: buildRoomFilterLabel(this.data.draftRoomFilterValues),
      roomFilterOptions: buildRoomFilterOptions(this.data.draftRoomFilterValues),
      selectedMinPrice: nextMinPrice,
      selectedMaxPrice: nextMaxPrice,
      selectedPriceLabel: buildPriceLabel(nextMinPrice, nextMaxPrice)
    };
    const hasChanged = nextState.selectedRegionIndex !== this.data.selectedRegionIndex
      || JSON.stringify(nextState.selectedRoomFilterValues) !== JSON.stringify(this.data.selectedRoomFilterValues)
      || nextState.selectedMinPrice !== this.data.selectedMinPrice
      || nextState.selectedMaxPrice !== this.data.selectedMaxPrice;

    this.setData(nextState);
    this.syncHasActiveFilter(nextState);
    this.closeDropdownPanel();

    if (!hasChanged) {
      return;
    }

    await this.refreshList();
  },

  async onListSortTap(event) {
    const sortKey = String(event.currentTarget.dataset.key || LIST_SORT_TAB_KEYS.LATEST);
    const nextSort = getNextListSort(this.data.selectedListSort, sortKey);
    if (nextSort === this.data.selectedListSort) {
      return;
    }

    this.closeDropdownPanel();
    this.setData({
      selectedListSort: nextSort,
      listSortTabs: buildListSortTabs(nextSort)
    });
    this.syncHasActiveFilter({ selectedListSort: nextSort });

    await this.refreshList();
  },

  onGoDetail(event) {
    logger.debug("home_go_detail_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.warn("home_go_detail_missing_house_id", {});
      return;
    }

    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
    logger.debug("home_go_detail_end", { houseId });
  },

  async refreshCurrentLocation(options = {}) {
    const {
      silent = false,
      fromTap = false
    } = options;
    logger.debug("home_refresh_location_start", { silent, fromTap });
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
      logger.debug("home_refresh_location_end", {
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
    const windowInfo = wx.getWindowInfo();
    const statusBarHeight = Number(windowInfo?.statusBarHeight || 0);

    this.setData({
      statusBarHeight,
      topBarHeight: 0,
      dropdownTop: 0,
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
        topBarHeight: rect.height,
        dropdownTop: Math.max(rect.height - 1, 0),
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
    this.clearDropdownTimer();
    const nextState = {
      keyword: "",
      keywordDraft: "",
      selectedCityRaw: "",
      selectedCityLabel: "",
      selectedRegionIndex: 0,
      selectedRoomFilterValues: [],
      selectedRoomFilterLabel: "",
      roomFilterOptions: buildRoomFilterOptions([]),
      selectedMinPrice: "",
      selectedMaxPrice: "",
      selectedPriceLabel: "",
      selectedListSort: HOUSE_SORT_BY.LATEST,
      listSortTabs: buildListSortTabs(HOUSE_SORT_BY.LATEST)
    };
    this.setData({
      ...nextState,
      dropdownVisible: false,
      dropdownEntered: false,
      activeDropdown: "",
      draftRegionIndex: 0,
      draftRoomFilterValues: [],
      draftRoomFilterOptions: buildRoomFilterOptions([]),
      draftMinPrice: "",
      draftMaxPrice: ""
    });
    this.syncRegionScopeWithCity(this.data.currentCityRaw, { preserveRegion: false });
    this.syncHasActiveFilter(nextState);
    await this.refreshList();
  }
});
