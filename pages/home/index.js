const houseService = require("../../services/house.service");
const { HOUSE_TYPE, HOUSE_SORT_BY, REQUEST_DEFAULT } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");

const FALLBACK_REGION_OPTIONS = [{ label: "全部区域", value: "" }];
const TYPE_OPTIONS = [
  { label: "全部户型", value: "" },
  { label: HOUSE_TYPE.STUDIO, value: HOUSE_TYPE.STUDIO },
  { label: HOUSE_TYPE.ONE_BEDROOM, value: HOUSE_TYPE.ONE_BEDROOM },
  { label: HOUSE_TYPE.TWO_BEDROOM, value: HOUSE_TYPE.TWO_BEDROOM },
  { label: HOUSE_TYPE.THREE_PLUS, value: HOUSE_TYPE.THREE_PLUS }
];
const SORT_OPTIONS = [
  { label: "最新发布", value: HOUSE_SORT_BY.LATEST },
  { label: "价格从低到高", value: HOUSE_SORT_BY.PRICE_ASC },
  { label: "价格从高到低", value: HOUSE_SORT_BY.PRICE_DESC }
];

function buildRegionOptions(regions = []) {
  return FALLBACK_REGION_OPTIONS.concat(
    (Array.isArray(regions) ? regions : []).map((item) => ({
      label: item.name || "",
      value: item.name || ""
    }))
  );
}

Page({
  data: {
    keyword: "",
    keywordDraft: "",
    regionOptions: FALLBACK_REGION_OPTIONS,
    typeOptions: TYPE_OPTIONS,
    sortOptions: SORT_OPTIONS,
    selectedRegionIndex: 0,
    selectedTypeIndex: 0,
    selectedSortIndex: 0,
    houseList: [],
    page: REQUEST_DEFAULT.PAGE,
    pageSize: REQUEST_DEFAULT.PAGE_SIZE,
    total: 0,
    hasMore: true,
    loading: false,
    refreshing: false,
    errorText: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "home", query: options || {} });
    await this.initPage();
  },

  async onPullDownRefresh() {
    logger.info("home_pull_down_start", {});
    try {
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
    await this.refreshList();
    logger.info("home_init_end", {});
  },

  async loadRegionOptions() {
    logger.info("home_load_regions_start", {});
    try {
      logger.info("api_call", { func: "house.getRegions", params: {} });
      const regions = await houseService.getRegions();
      const regionOptions = buildRegionOptions(regions);
      this.setData({
        regionOptions,
        selectedRegionIndex: 0
      });
      logger.info("api_resp", {
        func: "house.getRegions",
        code: 0,
        count: Array.isArray(regions) ? regions.length : 0
      });
    } catch (error) {
      this.setData({
        regionOptions: FALLBACK_REGION_OPTIONS,
        selectedRegionIndex: 0
      });
      logger.warn("home_load_regions_fallback", {
        err: error.message || "区域加载失败"
      });
    } finally {
      logger.info("home_load_regions_end", {
        count: this.data.regionOptions.length
      });
    }
  },

  buildQueryParams(targetPage) {
    logger.debug("home_build_query_start", { targetPage });
    const region = this.data.regionOptions[this.data.selectedRegionIndex]?.value || "";
    const type = this.data.typeOptions[this.data.selectedTypeIndex]?.value || "";
    const sortBy = this.data.sortOptions[this.data.selectedSortIndex]?.value || HOUSE_SORT_BY.LATEST;

    const params = {
      keyword: this.data.keyword.trim(),
      region,
      type,
      sortBy,
      page: targetPage,
      pageSize: this.data.pageSize
    };

    logger.debug("home_build_query_end", { params });
    return params;
  },

  normalizeHouseList(list = []) {
    logger.debug("home_normalize_list_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalizedList = (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      displayTitle: fallbackText(item.title, "未命名房源"),
      displayPrice: formatPrice(Number(item.price) || 0),
      displayAddress: fallbackText(item.address, "地址待完善"),
      displayType: fallbackText(item.type, "未知户型"),
      displayCreateTime: item.createTime ? formatDate(item.createTime) : ""
    }));
    logger.debug("home_normalize_list_end", { count: normalizedList.length });
    return normalizedList;
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

      logger.info("api_resp", {
        func: "house.getList",
        code: 0,
        total,
        loadedCount,
        hasMore
      });
    } catch (error) {
      const message = error.message || "加载房源失败";
      this.setData({ errorText: message });
      logger.error("api_error", { func: "house.getList", err: message });
    } finally {
      this.setData({ loading: false });
      logger.info("home_fetch_end", { initial });
    }
  },

  onKeywordInput(event) {
    logger.debug("home_keyword_input_start", {});
    this.setData({ keywordDraft: event.detail.value || "" });
    logger.debug("home_keyword_input_end", { keywordDraft: this.data.keywordDraft });
  },

  async onSearchTap() {
    logger.info("home_search_tap_start", {});
    this.setData({ keyword: this.data.keywordDraft || "" });
    await this.refreshList();
    logger.info("home_search_tap_end", {});
  },

  async onRegionChange(event) {
    logger.info("home_region_change_start", { value: event.detail.value });
    this.setData({ selectedRegionIndex: Number(event.detail.value) || 0 });
    await this.refreshList();
    logger.info("home_region_change_end", {});
  },

  async onTypeChange(event) {
    logger.info("home_type_change_start", { value: event.detail.value });
    this.setData({ selectedTypeIndex: Number(event.detail.value) || 0 });
    await this.refreshList();
    logger.info("home_type_change_end", {});
  },

  async onSortChange(event) {
    logger.info("home_sort_change_start", { value: event.detail.value });
    this.setData({ selectedSortIndex: Number(event.detail.value) || 0 });
    await this.refreshList();
    logger.info("home_sort_change_end", {});
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
  }
});
