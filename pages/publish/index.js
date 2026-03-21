const paginationBehavior = require("../../behaviors/pagination");
const { normalizeCloudError } = require("../../services/cloud/error");
const houseService = require("../../services/house.service");
const mapService = require("../../services/map.service");
const authUtils = require("../../utils/auth");
const storage = require("../../utils/storage");
const { USER_ROLE, STORAGE_KEY } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatDate, formatPrice, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");
const {
  FALLBACK_CITY_LABEL,
  buildLocationState,
  buildCachedLocationPayload
} = require("../../utils/location");
const {
  normalizeCityName,
  normalizeDistrictName
} = require("../../utils/region");

const TENANT_PAGE_SIZE = 20;
const TENANT_FALLBACK_CENTER = {
  latitude: 22.5431,
  longitude: 114.0579
};
const TENANT_MAP_MIN_SCALE = 11;
const TENANT_MAP_MAX_SCALE = 18;
const TENANT_SORT_OPTIONS = [
  { key: "distance", label: "距离优先" },
  { key: "latest", label: "最新发布" },
  { key: "price", label: "价格从低到高" }
];

function getStatusMeta(status) {
  if (status === "hidden") {
    return {
      key: "hidden",
      text: "已下架",
      badgeClass: "offline"
    };
  }

  if (status === "pending") {
    return {
      key: "pending",
      text: "审核中",
      badgeClass: "warning"
    };
  }

  return {
    key: "active",
    text: "在租中",
    badgeClass: "success"
  };
}

function buildStats(list = []) {
  const normalizedList = Array.isArray(list) ? list : [];
  const activeCount = normalizedList.filter((item) => item.statusKey === "active").length;
  const pendingCount = normalizedList.filter((item) => item.statusKey === "pending").length;
  const hiddenCount = normalizedList.filter((item) => item.statusKey === "hidden").length;

  return {
    all: normalizedList.length,
    active: activeCount,
    pending: pendingCount,
    hidden: hiddenCount
  };
}

function formatPriceValue(input) {
  const price = Number(input);
  if (!Number.isFinite(price) || price < 0) {
    return "0";
  }

  return String(price);
}

function formatPublishDate(input) {
  const formatted = formatDate(input);
  if (!formatted) {
    return "";
  }

  const currentYear = new Date().getFullYear();
  const year = Number(formatted.slice(0, 4));

  if (year === currentYear) {
    return formatted.slice(5, 10);
  }

  return formatted.slice(0, 10);
}

function getVisibleList(list = [], activeFilter = "all") {
  const normalizedList = Array.isArray(list) ? list.slice() : [];
  return activeFilter === "all"
    ? normalizedList
    : normalizedList.filter((item) => item.statusKey === activeFilter);
}

function getPageMode() {
  return authUtils.hasRole(USER_ROLE.LANDLORD)
    ? USER_ROLE.LANDLORD
    : USER_ROLE.TENANT;
}

function getNavigationBarTitle(pageMode) {
  return pageMode === USER_ROLE.LANDLORD ? "我的房源" : "地图找房";
}

function buildTenantLocationData(location = {}, source = "fallback") {
  const state = buildLocationState(location, source);

  return {
    tenantCurrentCityRaw: state.currentCityRaw,
    tenantCurrentCityLabel: state.currentCityLabel || FALLBACK_CITY_LABEL,
    tenantCurrentDistrict: state.currentDistrict,
    tenantCurrentLatitude: state.currentLatitude || 0,
    tenantCurrentLongitude: state.currentLongitude || 0,
    tenantMapLatitude: state.currentLatitude || TENANT_FALLBACK_CENTER.latitude,
    tenantMapLongitude: state.currentLongitude || TENANT_FALLBACK_CENTER.longitude,
    tenantLocationReady: Boolean(state.locationReady),
    tenantLocationSource: source
  };
}

function normalizeCoordinate(value) {
  const normalized = Number(value);
  return Number.isFinite(normalized) && normalized !== 0 ? normalized : 0;
}

function buildTenantMeta(item = {}) {
  const parts = [
    fallbackText(item.layoutText || item.type, "户型待完善"),
    Number(item.area) > 0 ? `${Number(item.area)}㎡` : "面积待完善",
    fallbackText(item.region, "")
  ].filter(Boolean);

  return parts.join(" · ");
}

function buildTenantAddress(item = {}) {
  const region = String(item.region || "").trim();
  const address = fallbackText(item.address, "地址待完善");
  return region && address.indexOf(region) === -1
    ? `${region} · ${address}`
    : address;
}

function buildTenantMarker(item = {}, index = 0) {
  const price = Number(item.price || 0);
  const markerBgColor = item.isSelected
    ? "#05a251"
    : price >= 5000
      ? "#ff6b35"
      : "#07c160";

  return {
    id: Number(item.markerId || index + 1),
    latitude: item.latitude,
    longitude: item.longitude,
    title: item.displayTitle,
    iconPath: "/assets/images/map-pin.png",
    width: 24,
    height: 24,
    anchor: {
      x: 0.5,
      y: 1
    },
    callout: {
      content: `${price || 0}元`,
      color: "#ffffff",
      fontSize: 10,
      borderRadius: 14,
      bgColor: markerBgColor,
      padding: 6,
      display: "ALWAYS",
      textAlign: "center"
    }
  };
}

function toRadians(value) {
  return value * Math.PI / 180;
}

function calculateDistanceMeters(latitudeA, longitudeA, latitudeB, longitudeB) {
  const latA = Number(latitudeA);
  const lngA = Number(longitudeA);
  const latB = Number(latitudeB);
  const lngB = Number(longitudeB);

  if (!latA || !lngA || !latB || !lngB) {
    return 0;
  }

  const earthRadius = 6371000;
  const deltaLatitude = toRadians(latB - latA);
  const deltaLongitude = toRadians(lngB - lngA);
  const haversine = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2)
    + Math.cos(toRadians(latA))
      * Math.cos(toRadians(latB))
      * Math.sin(deltaLongitude / 2)
      * Math.sin(deltaLongitude / 2);

  return Math.round(2 * earthRadius * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine)));
}

function formatDistance(distance) {
  const normalized = Number(distance || 0);
  if (!normalized) {
    return "";
  }

  if (normalized >= 1000) {
    return `${(normalized / 1000).toFixed(1)}km`;
  }

  return `${normalized}m`;
}

function getTenantSortLabel(sortMode = "distance") {
  const matchedOption = TENANT_SORT_OPTIONS.find((item) => item.key === sortMode);
  return matchedOption?.label || TENANT_SORT_OPTIONS[0].label;
}

function sortTenantHouseList(list = [], sortMode = "distance") {
  const normalizedList = Array.isArray(list) ? list.slice() : [];

  if (sortMode === "price") {
    return normalizedList.sort((left, right) => Number(left.price || 0) - Number(right.price || 0));
  }

  if (sortMode === "latest") {
    return normalizedList;
  }

  return normalizedList.sort((left, right) => {
    const leftDistance = Number(left.distance || 0);
    const rightDistance = Number(right.distance || 0);

    if (leftDistance && rightDistance && leftDistance !== rightDistance) {
      return leftDistance - rightDistance;
    }

    if (leftDistance) {
      return -1;
    }

    if (rightDistance) {
      return 1;
    }

    return Number(left.price || 0) - Number(right.price || 0);
  });
}

function buildTenantSheetHouseList(list = [], selectedHouseId = "") {
  const normalizedList = Array.isArray(list) ? list.slice() : [];
  const currentHouseId = String(selectedHouseId || "").trim();

  if (!currentHouseId) {
    return normalizedList;
  }

  const targetIndex = normalizedList.findIndex((item) => item.houseId === currentHouseId);
  if (targetIndex <= 0) {
    return normalizedList;
  }

  const [selectedHouse] = normalizedList.splice(targetIndex, 1);
  return [selectedHouse].concat(normalizedList);
}

Page({
  behaviors: [paginationBehavior],

  data: {
    pageMode: USER_ROLE.TENANT,

    loading: false,
    empty: false,
    errorText: "",
    list: [],
    visibleList: [],
    pageSize: 50,
    activeFilter: "all",
    stats: buildStats(),
    openActionHouseId: "",
    showDeleteModal: false,
    pendingDeleteHouseId: "",
    pendingDeleteTitle: "",

    tenantLoading: false,
    tenantErrorText: "",
    tenantLocationLoading: false,
    tenantLocationErrorText: "",
    tenantCurrentCityRaw: "",
    tenantCurrentCityLabel: FALLBACK_CITY_LABEL,
    tenantCurrentDistrict: "",
    tenantCurrentLatitude: 0,
    tenantCurrentLongitude: 0,
    tenantLocationReady: false,
    tenantLocationSource: "fallback",
    tenantMapLatitude: TENANT_FALLBACK_CENTER.latitude,
    tenantMapLongitude: TENANT_FALLBACK_CENTER.longitude,
    tenantMapScale: 13,
    tenantSheetExpanded: false,
    tenantSheetSubtitle: "地图和下方列表会保持同步",
    tenantSortMode: "distance",
    tenantSortLabel: getTenantSortLabel("distance"),
    tenantRawHouseList: [],
    tenantHouseList: [],
    tenantSheetHouseList: [],
    tenantMarkers: [],
    tenantSelectedHouseId: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "publish/index", query: options || {} });
    this.hasFirstShowHandled = false;
    this.touchStartPoint = null;

    const pageMode = getPageMode();
    this.applyPageMode(pageMode);

    if (pageMode === USER_ROLE.LANDLORD) {
      if (!authUtils.requireLogin({ redirect: true })) {
        logger.debug("publish_tab_onload_end", { blocked: "not_login", mode: pageMode });
        return;
      }

      await this.refreshList();
      logger.debug("publish_tab_onload_end", { mode: pageMode });
      return;
    }

    await this.initTenantView({ refreshLocation: true, silent: true });
    logger.debug("publish_tab_onload_end", { mode: pageMode });
  },

  async onShow() {
    logger.debug("publish_tab_onshow_start", { mode: this.data.pageMode });
    const nextMode = getPageMode();

    if (nextMode !== this.data.pageMode) {
      this.applyPageMode(nextMode);
      if (nextMode === USER_ROLE.LANDLORD) {
        if (!authUtils.requireLogin({ redirect: true })) {
          logger.debug("publish_tab_onshow_end", { blocked: "not_login", mode: nextMode });
          return;
        }
        await this.refreshList();
      } else {
        await this.initTenantView({ refreshLocation: false, silent: true });
      }
      this.hasFirstShowHandled = true;
      logger.debug("publish_tab_onshow_end", { mode: nextMode, switched: true });
      return;
    }

    if (!this.hasFirstShowHandled) {
      this.hasFirstShowHandled = true;
      logger.debug("publish_tab_onshow_end", { blocked: "first_show", mode: nextMode });
      return;
    }

    if (nextMode === USER_ROLE.LANDLORD) {
      if (!authUtils.isLoggedIn() || !authUtils.hasRole(USER_ROLE.LANDLORD)) {
        this.applyPageMode(USER_ROLE.TENANT);
        await this.initTenantView({ refreshLocation: false, silent: true });
        logger.debug("publish_tab_onshow_end", { mode: USER_ROLE.TENANT, switched: true });
        return;
      }

      await this.refreshList();
      logger.debug("publish_tab_onshow_end", { mode: nextMode });
      return;
    }

    await this.refreshTenantHouseList();
    logger.debug("publish_tab_onshow_end", { mode: nextMode });
  },

  async onPullDownRefresh() {
    logger.debug("publish_tab_pulldown_start", { mode: this.data.pageMode });
    try {
      if (this.isLandlordMode()) {
        await this.refreshList();
      } else {
        await this.refreshTenantView({ refreshLocation: true, silent: true });
      }
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("publish_tab_pulldown_end", { mode: this.data.pageMode });
    }
  },

  async onReachBottom() {
    logger.debug("publish_tab_reach_bottom_start", {
      mode: this.data.pageMode,
      hasMore: this.data.hasMore
    });
    if (!this.isLandlordMode()) {
      logger.debug("publish_tab_reach_bottom_end", { blocked: "tenant_mode" });
      return;
    }

    await this.loadMore();
    logger.debug("publish_tab_reach_bottom_end", { mode: this.data.pageMode });
  },

  isLandlordMode() {
    return this.data.pageMode === USER_ROLE.LANDLORD;
  },

  applyPageMode(pageMode) {
    this.setData({ pageMode });
    wx.setNavigationBarTitle({
      title: getNavigationBarTitle(pageMode)
    });
  },

  normalizeList(list = []) {
    logger.debug("publish_tab_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalized = (Array.isArray(list) ? list : []).map((item) => {
      const statusMeta = getStatusMeta(item.status);
      return {
        ...item,
        houseId: item._id || "",
        statusKey: statusMeta.key,
        isHidden: statusMeta.key === "hidden",
        displayStatus: statusMeta.text,
        statusBadgeClass: statusMeta.badgeClass,
        displayTitle: fallbackText(item.title, "未命名房源"),
        displayPriceValue: formatPriceValue(item.price),
        displayCreateTime: item.createTime ? formatPublishDate(item.createTime) : "",
        displayLayout: fallbackText(item.layoutText || item.type, "户型待完善"),
        displayArea: Number(item.area) > 0 ? `${Number(item.area)}㎡` : "面积待完善",
        displayFloor: fallbackText(item.floor, "楼层待完善"),
        displayImage: Array.isArray(item.images) && item.images[0] ? item.images[0] : "",
        actionLabel: statusMeta.key === "hidden" ? "上架" : "下架",
        actionStatus: statusMeta.key === "hidden" ? "active" : "hidden",
        actionButtonClass: statusMeta.key === "hidden" ? "swipe-publish" : "swipe-unpublish"
      };
    });
    logger.debug("publish_tab_normalize_end", { count: normalized.length });
    return normalized;
  },

  normalizeTenantHouseList(list = []) {
    const currentLatitude = normalizeCoordinate(this.data.tenantCurrentLatitude);
    const currentLongitude = normalizeCoordinate(this.data.tenantCurrentLongitude);
    const normalized = (Array.isArray(list) ? list : []).map((item, index) => {
      const latitude = normalizeCoordinate(item.latitude);
      const longitude = normalizeCoordinate(item.longitude);
      const distance = currentLatitude && currentLongitude && latitude && longitude
        ? calculateDistanceMeters(currentLatitude, currentLongitude, latitude, longitude)
        : 0;
      return {
        ...item,
        houseId: item._id || "",
        markerId: index + 1,
        latitude,
        longitude,
        distance,
        hasLocation: Boolean(latitude && longitude),
        displayTitle: fallbackText(item.title, "未命名房源"),
        displayPrice: formatPrice(Number(item.price) || 0),
        displayMeta: buildTenantMeta(item),
        displayAddress: buildTenantAddress(item),
        displayDistance: formatDistance(distance),
        displayImage: Array.isArray(item.images) && item.images[0]
          ? item.images[0]
          : "/assets/images/house-placeholder.png"
      };
    });

    logger.debug("tenant_map_normalize_end", { count: normalized.length });
    return normalized;
  },

  applyDerivedState(list = this.data.list, activeFilter = this.data.activeFilter) {
    const stats = buildStats(list);
    const visibleList = getVisibleList(list, activeFilter);
    const hasRawList = Array.isArray(list) && list.length > 0;

    this.setData({
      list,
      visibleList,
      stats,
      activeFilter,
      empty: !hasRawList,
      openActionHouseId: visibleList.some((item) => item.houseId === this.data.openActionHouseId)
        ? this.data.openActionHouseId
        : ""
    });
  },

  async fetchHousePage({ page, pageSize }) {
    logger.debug("api_call", {
      func: "house.getMine",
      params: { page, pageSize }
    });

    const result = await houseService.getMyHouseList({ page, pageSize });

    logger.debug("api_resp", {
      func: "house.getMine",
      code: 0,
      count: Array.isArray(result.list) ? result.list.length : 0,
      total: Number(result.total || 0)
    });

    return {
      ...result,
      list: this.normalizeList(result.list || [])
    };
  },

  async refreshList() {
    logger.debug("publish_tab_refresh_start", {});
    this.resetPaginationState();
    this.setData({
      loading: true,
      empty: false,
      errorText: "",
      list: [],
      visibleList: [],
      openActionHouseId: ""
    });

    try {
      await this.loadPage({
        initial: true,
        concat: false,
        fetcher: this.fetchHousePage.bind(this),
        onSuccess: (result) => {
          const list = Array.isArray(result.list) ? result.list : [];
          this.applyDerivedState(list, this.data.activeFilter);
        }
      });
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "getMine"
      });
      this.setData({
        empty: false,
        errorText: normalizedError.message || "我的房源加载失败"
      });
      logger.error("api_error", { func: "house.getMine", err: normalizedError.message });
    } finally {
      this.setData({ loading: false });
      logger.debug("publish_tab_refresh_end", {});
    }
  },

  async loadMore() {
    logger.debug("publish_tab_load_more_start", {
      hasMore: this.data.hasMore,
      listLoading: this.data.listLoading
    });

    if (!this.data.hasMore || this.data.listLoading) {
      logger.debug("publish_tab_load_more_end", { blocked: true });
      return;
    }

    this.setData({ loading: true });
    try {
      await this.loadPage({
        initial: false,
        concat: true,
        fetcher: this.fetchHousePage.bind(this),
        onSuccess: () => {
          this.applyDerivedState(this.data.list, this.data.activeFilter);
        }
      });
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "getMine"
      });
      this.setData({
        errorText: normalizedError.message || "我的房源加载失败"
      });
      logger.error("api_error", { func: "house.getMine", err: normalizedError.message });
    } finally {
      this.setData({ loading: false });
      logger.debug("publish_tab_load_more_end", {});
    }
  },

  async initTenantView(options = {}) {
    logger.debug("tenant_map_init_start", options);
    this.restoreTenantLocationFromCache();
    await this.refreshTenantView(options);
    logger.debug("tenant_map_init_end", {});
  },

  restoreTenantLocationFromCache() {
    const cachedLocation = storage.getStorageSync(STORAGE_KEY.CURRENT_LOCATION, null);
    if (!cachedLocation || Object.prototype.toString.call(cachedLocation) !== "[object Object]") {
      this.setData(buildTenantLocationData({}, "fallback"));
      logger.debug("tenant_map_restore_cache_end", { cached: false });
      return;
    }

    this.setData(buildTenantLocationData(cachedLocation, "cache"));
    logger.debug("tenant_map_restore_cache_end", {
      cached: true,
      city: cachedLocation.city || ""
    });
  },

  async refreshTenantView(options = {}) {
    const {
      refreshLocation = false,
      silent = false,
      fromTap = false
    } = options;

    if (refreshLocation || !this.data.tenantCurrentCityRaw) {
      await this.refreshTenantLocation({ silent, fromTap });
    }

    await this.refreshTenantHouseList();
  },

  async refreshTenantLocation(options = {}) {
    const {
      silent = false,
      fromTap = false
    } = options;
    logger.debug("tenant_map_location_start", { silent, fromTap });

    this.setData({
      tenantLocationLoading: true,
      tenantLocationErrorText: ""
    });

    try {
      const location = await wx.getLocation({ type: "gcj02" });
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
        ...buildTenantLocationData(nextLocation, "gps"),
        tenantLocationErrorText: ""
      });
      logger.debug("tenant_map_location_end", {
        city: currentCityRaw,
        district: currentDistrict
      });
      return true;
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "定位失败");
      const isPermissionDenied = /auth deny|auth denied|auth forbid|permission denied/i.test(errMsg);
      const locationErrorText = isPermissionDenied ? "定位未授权" : "定位失败";
      this.setData({ tenantLocationErrorText: locationErrorText });
      logger.warn("tenant_map_location_failed", {
        err: errMsg,
        isPermissionDenied
      });

      if (fromTap && isPermissionDenied) {
        const modalRes = await wx.showModal({
          title: "开启定位权限",
          content: "开启后可按你的当前城市展示地图房源，是否前往设置？",
          confirmText: "去设置",
          confirmColor: "#3c7bfd",
          cancelColor: "#999999"
        });

        if (modalRes.confirm) {
          const settingRes = await wx.openSetting();
          if (settingRes?.authSetting?.["scope.userLocation"]) {
            this.setData({ tenantLocationLoading: false });
            return this.refreshTenantLocation({ silent, fromTap: false });
          }
        }
      } else if (!silent) {
        wx.showToast({ title: locationErrorText, icon: "none" });
      }

      if (!this.data.tenantCurrentCityLabel) {
        this.setData(buildTenantLocationData({}, "fallback"));
      }
      return false;
    } finally {
      this.setData({ tenantLocationLoading: false });
    }
  },

  resolveTenantSelectedHouseId(tenantHouseList = []) {
    const selectedHouseId = String(this.data.tenantSelectedHouseId || "").trim();
    if (selectedHouseId && tenantHouseList.some((item) => item.houseId === selectedHouseId)) {
      return selectedHouseId;
    }

    const firstLocatedHouse = tenantHouseList.find((item) => item.hasLocation);
    return firstLocatedHouse?.houseId || tenantHouseList[0]?.houseId || "";
  },

  resolveTenantMapCenter(selectedHouse = null, tenantMarkers = []) {
    if (this.data.tenantLocationReady) {
      return {
        latitude: Number(this.data.tenantMapLatitude || TENANT_FALLBACK_CENTER.latitude),
        longitude: Number(this.data.tenantMapLongitude || TENANT_FALLBACK_CENTER.longitude)
      };
    }

    if (selectedHouse && selectedHouse.hasLocation) {
      return {
        latitude: selectedHouse.latitude,
        longitude: selectedHouse.longitude
      };
    }

    if (tenantMarkers[0]) {
      return {
        latitude: tenantMarkers[0].latitude,
        longitude: tenantMarkers[0].longitude
      };
    }

    return TENANT_FALLBACK_CENTER;
  },

  buildTenantSheetSubtitle(overrideState = {}) {
    const mergedState = {
      ...this.data,
      ...overrideState
    };

    if (mergedState.tenantErrorText) {
      return "房源加载失败，请下拉重试";
    }

    if (mergedState.tenantLocationErrorText) {
      return `${mergedState.tenantLocationErrorText}，已按当前城市为你展示房源`;
    }

    if (mergedState.tenantMarkers.length === 0 && mergedState.tenantHouseList.length > 0) {
      return "部分房源暂无地图坐标，可以先从列表里挑选";
    }

    if (mergedState.tenantSelectedHouseId) {
      return "已高亮你选中的房源，地图和列表会联动";
    }

    return "地图和下方列表会保持同步";
  },

  applyTenantHouseState(rawTenantHouseList = [], options = {}) {
    const tenantSortMode = String(options.tenantSortMode || this.data.tenantSortMode || "distance").trim() || "distance";
    const tenantHouseList = sortTenantHouseList(rawTenantHouseList, tenantSortMode);
    const tenantSelectedHouseId = this.resolveTenantSelectedHouseId(tenantHouseList);
    const tenantSheetHouseList = buildTenantSheetHouseList(tenantHouseList, tenantSelectedHouseId);
    const tenantMarkers = tenantHouseList
      .filter((item) => item.hasLocation)
      .map((item, index) => buildTenantMarker({
        ...item,
        isSelected: item.houseId === tenantSelectedHouseId
      }, index));
    const selectedHouse = tenantHouseList.find((item) => item.houseId === tenantSelectedHouseId) || null;
    const nextMapCenter = options.keepMapCenter
      ? {
          latitude: Number(this.data.tenantMapLatitude || TENANT_FALLBACK_CENTER.latitude),
          longitude: Number(this.data.tenantMapLongitude || TENANT_FALLBACK_CENTER.longitude)
        }
      : this.resolveTenantMapCenter(selectedHouse, tenantMarkers);
    const nextMapScale = options.keepMapCenter
      ? Number(this.data.tenantMapScale || 13)
      : selectedHouse && selectedHouse.hasLocation
        ? 15
        : 13;

    this.setData({
      tenantRawHouseList: Array.isArray(rawTenantHouseList) ? rawTenantHouseList.slice() : [],
      tenantSortMode,
      tenantSortLabel: getTenantSortLabel(tenantSortMode),
      tenantHouseList,
      tenantSheetHouseList,
      tenantMarkers,
      tenantSelectedHouseId,
      tenantMapLatitude: nextMapCenter.latitude,
      tenantMapLongitude: nextMapCenter.longitude,
      tenantMapScale: Math.max(
        TENANT_MAP_MIN_SCALE,
        Math.min(TENANT_MAP_MAX_SCALE, Number(nextMapScale || 13))
      ),
      tenantSheetSubtitle: this.buildTenantSheetSubtitle({
        tenantHouseList,
        tenantMarkers,
        tenantSelectedHouseId
      })
    });
  },

  syncTenantSheetHouseList(selectedHouseId = this.data.tenantSelectedHouseId, tenantHouseList = this.data.tenantHouseList) {
    this.setData({
      tenantSheetHouseList: buildTenantSheetHouseList(tenantHouseList, selectedHouseId),
      tenantSheetSubtitle: this.buildTenantSheetSubtitle({
        tenantSelectedHouseId: selectedHouseId,
        tenantHouseList
      })
    });
  },

  syncTenantMarkers(selectedHouseId = this.data.tenantSelectedHouseId, tenantHouseList = this.data.tenantHouseList) {
    const tenantMarkers = (Array.isArray(tenantHouseList) ? tenantHouseList : [])
      .filter((item) => item.hasLocation)
      .map((item, index) => buildTenantMarker({
        ...item,
        isSelected: item.houseId === selectedHouseId
      }, index));

    this.setData({ tenantMarkers });
  },

  async refreshTenantHouseList() {
    const city = String(
      this.data.tenantCurrentCityRaw || this.data.tenantCurrentCityLabel || FALLBACK_CITY_LABEL
    ).trim();

    logger.debug("tenant_map_list_start", { city });
    this.setData({
      tenantLoading: true,
      tenantErrorText: ""
    });

    try {
      logger.debug("api_call", {
        func: "house.getList",
        params: {
          city,
          page: 1,
          pageSize: TENANT_PAGE_SIZE,
          sortBy: "latest"
        }
      });

      const result = await houseService.getHouseList({
        city,
        page: 1,
        pageSize: TENANT_PAGE_SIZE,
        sortBy: "latest"
      });

      const normalizedHouseList = this.normalizeTenantHouseList(result.list || []);
      this.applyTenantHouseState(normalizedHouseList);

      logger.debug("api_resp", {
        func: "house.getList",
        code: 0,
        city,
        count: normalizedHouseList.length,
        markerCount: normalizedHouseList.filter((item) => item.hasLocation).length
      });
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "getList"
      });
      this.setData({
        tenantErrorText: normalizedError.message || "地图房源加载失败",
        tenantRawHouseList: [],
        tenantHouseList: [],
        tenantSheetHouseList: [],
        tenantMarkers: [],
        tenantSelectedHouseId: "",
        tenantSheetSubtitle: this.buildTenantSheetSubtitle({
          tenantErrorText: normalizedError.message || "地图房源加载失败",
          tenantHouseList: [],
          tenantMarkers: [],
          tenantSelectedHouseId: ""
        })
      });
      logger.error("api_error", { func: "house.getList", err: normalizedError.message });
    } finally {
      this.setData({ tenantLoading: false });
      logger.debug("tenant_map_list_end", { city });
    }
  },

  noop() {},

  onPageTap() {
    if (!this.isLandlordMode()) {
      return;
    }

    if (this.data.openActionHouseId) {
      this.setData({ openActionHouseId: "" });
    }
  },

  onStatCardTap(event) {
    const filterKey = String(event.currentTarget.dataset.filter || "").trim() || "all";
    logger.debug("publish_tab_stat_filter_start", { filterKey });
    this.applyDerivedState(this.data.list, filterKey);
    logger.debug("publish_tab_stat_filter_end", { filterKey });
  },

  onGoPublish() {
    logger.debug("publish_tab_go_publish_start", {});
    navigateTo(ROUTES.PUBLISH_EDIT);
    logger.debug("publish_tab_go_publish_end", {});
  },

  onGoBookingManage(event) {
    const houseId = String(event?.currentTarget?.dataset?.houseId || "").trim();
    const houseTitle = String(event?.currentTarget?.dataset?.houseTitle || "").trim();
    logger.debug("publish_tab_go_booking_manage_start", { houseId });
    this.setData({ openActionHouseId: "" });
    navigateTo(ROUTES.BOOKING_MANAGE, houseId ? { houseId, houseTitle } : {});
    logger.debug("publish_tab_go_booking_manage_end", { houseId });
  },

  async onGoEdit(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    logger.debug("publish_tab_go_edit_start", { houseId });
    if (!houseId) {
      logger.debug("publish_tab_go_edit_end", { blocked: "empty_house_id" });
      return;
    }

    this.setData({ openActionHouseId: "" });
    try {
      await navigateTo(ROUTES.PUBLISH_EDIT, { houseId });
    } catch (error) {
      logger.error("publish_tab_go_edit_failed", { houseId, err: error.message });
      wx.showToast({ title: error.message || "跳转编辑页失败", icon: "none" });
    }
    logger.debug("publish_tab_go_edit_end", { houseId });
  },

  onCardTouchStart(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const statusKey = String(event.currentTarget.dataset.statusKey || "").trim();
    const touch = event.changedTouches?.[0];
    if (!houseId || !touch || statusKey === "hidden") {
      this.touchStartPoint = null;
      return;
    }

    this.touchStartPoint = {
      houseId,
      x: Number(touch.clientX || 0),
      y: Number(touch.clientY || 0)
    };
  },

  onCardTouchEnd(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const statusKey = String(event.currentTarget.dataset.statusKey || "").trim();
    const touch = event.changedTouches?.[0];
    if (
      !houseId
      || !touch
      || statusKey === "hidden"
      || !this.touchStartPoint
      || this.touchStartPoint.houseId !== houseId
    ) {
      this.touchStartPoint = null;
      return;
    }

    const dx = Number(touch.clientX || 0) - this.touchStartPoint.x;
    const dy = Number(touch.clientY || 0) - this.touchStartPoint.y;
    this.touchStartPoint = null;

    if (Math.abs(dx) <= Math.abs(dy) || Math.abs(dx) < 40) {
      return;
    }

    if (dx < 0) {
      this.setData({ openActionHouseId: houseId });
      return;
    }

    if (this.data.openActionHouseId === houseId) {
      this.setData({ openActionHouseId: "" });
    }
  },

  onToggleActionsTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    if (!houseId) {
      return;
    }

    this.setData({
      openActionHouseId: this.data.openActionHouseId === houseId ? "" : houseId
    });
  },

  async updateHouseStatus(houseId, nextStatus) {
    if (!houseId || !nextStatus) {
      return;
    }

    try {
      logger.debug("api_call", { func: "house.update", params: { houseId, status: nextStatus } });
      await houseService.updateHouseStatus(houseId, nextStatus);
      logger.debug("api_resp", { func: "house.update", code: 0 });
      wx.showToast({ title: nextStatus === "hidden" ? "已下架" : "已重新上架", icon: "success" });
      this.setData({ openActionHouseId: "" });
      await this.refreshList();
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "update"
      });
      logger.error("api_error", { func: "house.update", err: normalizedError.message });
      wx.showToast({ title: normalizedError.message || "状态更新失败", icon: "none" });
    }
  },

  async onToggleStatusTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const nextStatus = String(event.currentTarget.dataset.status || "").trim();
    await this.updateHouseStatus(houseId, nextStatus);
  },

  async onRepublishTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    await this.updateHouseStatus(houseId, "active");
  },

  onDeleteHouseTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const title = String(event.currentTarget.dataset.title || "").trim();
    if (!houseId) {
      return;
    }

    this.setData({
      openActionHouseId: "",
      showDeleteModal: true,
      pendingDeleteHouseId: houseId,
      pendingDeleteTitle: title
    });
  },

  onCloseDeleteModal() {
    this.setData({
      showDeleteModal: false,
      pendingDeleteHouseId: "",
      pendingDeleteTitle: ""
    });
  },

  async onConfirmDeleteTap() {
    const houseId = String(this.data.pendingDeleteHouseId || "").trim();
    if (!houseId) {
      this.onCloseDeleteModal();
      return;
    }

    try {
      logger.debug("api_call", { func: "house.remove", params: { houseId } });
      await houseService.deleteHouse(houseId);
      logger.debug("api_resp", { func: "house.remove", code: 0 });
      wx.showToast({ title: "删除成功", icon: "success" });
      this.onCloseDeleteModal();
      await this.refreshList();
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "remove"
      });
      logger.error("api_error", { func: "house.remove", err: normalizedError.message });
      wx.showToast({ title: normalizedError.message || "删除失败", icon: "none" });
    }
  },

  async onTenantRefreshTap() {
    logger.debug("tenant_map_refresh_tap_start", {});
    await this.refreshTenantView({ refreshLocation: true, silent: false, fromTap: true });
    logger.debug("tenant_map_refresh_tap_end", {});
  },

  onToggleTenantSheet() {
    this.setData({
      tenantSheetExpanded: !this.data.tenantSheetExpanded
    });
  },

  onTenantViewModeTap(event) {
    const mode = String(event?.currentTarget?.dataset?.mode || "").trim();
    if (!mode) {
      return;
    }

    this.setData({
      tenantSheetExpanded: mode === "list"
    });
  },

  onTenantZoomIn() {
    const nextScale = Math.min(TENANT_MAP_MAX_SCALE, Number(this.data.tenantMapScale || 13) + 1);
    this.setData({ tenantMapScale: nextScale });
  },

  onTenantZoomOut() {
    const nextScale = Math.max(TENANT_MAP_MIN_SCALE, Number(this.data.tenantMapScale || 13) - 1);
    this.setData({ tenantMapScale: nextScale });
  },

  async onTenantSortTap() {
    if (!this.data.tenantRawHouseList.length) {
      return;
    }

    try {
      const result = await wx.showActionSheet({
        itemList: TENANT_SORT_OPTIONS.map((item) => item.label)
      });
      const nextSortOption = TENANT_SORT_OPTIONS[result.tapIndex];
      if (!nextSortOption || nextSortOption.key === this.data.tenantSortMode) {
        return;
      }

      this.applyTenantHouseState(this.data.tenantRawHouseList, {
        tenantSortMode: nextSortOption.key,
        keepMapCenter: true
      });
    } catch (error) {
      const errMsg = String(error?.errMsg || error?.message || "");
      if (!/cancel/i.test(errMsg)) {
        logger.warn("tenant_map_sort_failed", { err: errMsg });
      }
    }
  },

  onTenantMarkerTap(event) {
    const markerId = Number(event?.detail?.markerId || 0);
    const selectedHouse = this.data.tenantHouseList.find(
      (item) => Number(item.markerId) === markerId
    );

    if (!selectedHouse) {
      return;
    }

    this.setData({
      tenantSelectedHouseId: selectedHouse.houseId,
      tenantMapLatitude: selectedHouse.latitude || this.data.tenantMapLatitude,
      tenantMapLongitude: selectedHouse.longitude || this.data.tenantMapLongitude,
      tenantMapScale: selectedHouse.hasLocation ? 15 : this.data.tenantMapScale,
      tenantSheetSubtitle: this.buildTenantSheetSubtitle({
        tenantSelectedHouseId: selectedHouse.houseId
      })
    });
    this.syncTenantSheetHouseList(selectedHouse.houseId);
    this.syncTenantMarkers(selectedHouse.houseId);
  },

  onTenantCardTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    if (!houseId) {
      return;
    }

    const selectedHouse = this.data.tenantHouseList.find((item) => item.houseId === houseId);
    if (selectedHouse && selectedHouse.hasLocation) {
      this.setData({
        tenantSelectedHouseId: houseId,
        tenantMapLatitude: selectedHouse.latitude,
        tenantMapLongitude: selectedHouse.longitude,
        tenantMapScale: 15,
        tenantSheetSubtitle: this.buildTenantSheetSubtitle({
          tenantSelectedHouseId: houseId
        })
      });
      this.syncTenantSheetHouseList(houseId);
      this.syncTenantMarkers(houseId);
    }

    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
  }
});
