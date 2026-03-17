const favoriteService = require("../../../services/favorite.service");
const authUtils = require("../../../utils/auth");
const { REQUEST_DEFAULT } = require("../../../config/constants");
const { ROUTES, navigateTo } = require("../../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");

Page({
  data: {
    loading: false,
    page: REQUEST_DEFAULT.PAGE,
    pageSize: REQUEST_DEFAULT.PAGE_SIZE,
    total: 0,
    hasMore: true,
    list: [],
    errorText: "",
    titleHighlight: false,
    openActionHouseId: ""
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/favorites", query: options || {} });
    this.shouldHighlightTitle = Boolean(options && options.highlight === "1");
    this.titleHighlightTimer = null;
    this.touchStartPoint = null;
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("favorites_onload_end", { blocked: "not_login" });
      return;
    }
    logger.info("favorites_onload_end", {});
  },

  async onShow() {
    logger.info("favorites_onshow_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.info("favorites_onshow_end", { blocked: "not_login" });
      return;
    }
    await this.refreshList();
    if (this.shouldHighlightTitle) {
      this.shouldHighlightTitle = false;
      this.applyTitleHighlight();
    }
    logger.info("favorites_onshow_end", {});
  },

  onUnload() {
    this.clearTitleHighlightTimer();
  },

  async onPullDownRefresh() {
    logger.info("favorites_pulldown_start", {});
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("favorites_pulldown_end", {});
    }
  },

  async onReachBottom() {
    logger.info("favorites_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.info("favorites_reach_bottom_end", {});
  },

  normalizeList(list = []) {
    logger.debug("favorites_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalized = (Array.isArray(list) ? list : []).map((item) => {
      const house = item.houseInfo || item.house || item;
      return {
        ...item,
        houseId: house._id || item.houseId || "",
        displayTitle: fallbackText(house.title, "未命名房源"),
        displayAddress: fallbackText(house.address, "地址待完善"),
        displayPrice: formatPrice(Number(house.price) || 0),
        displayType: fallbackText(house.layoutText || house.type, "未知户型"),
        displayCreateTime: item.createTime ? formatDate(item.createTime) : "",
        displayImage: Array.isArray(house.images) && house.images.length
          ? house.images[0]
          : "/assets/images/house-placeholder.png"
      };
    });
    logger.debug("favorites_normalize_end", { count: normalized.length });
    return normalized;
  },

  async refreshList() {
    logger.info("favorites_refresh_start", {});
    this.setData({
      page: REQUEST_DEFAULT.PAGE,
      hasMore: true,
      openActionHouseId: ""
    });
    await this.fetchList({ initial: true });
    logger.info("favorites_refresh_end", {});
  },

  async loadMore() {
    logger.info("favorites_load_more_start", {});
    if (this.data.loading || !this.data.hasMore) {
      logger.info("favorites_load_more_end", { blocked: true });
      return;
    }
    await this.fetchList({ initial: false });
    logger.info("favorites_load_more_end", {});
  },

  async fetchList({ initial }) {
    logger.info("favorites_fetch_start", { initial });
    if (this.data.loading) {
      logger.info("favorites_fetch_end", { blocked: "loading" });
      return;
    }
    const page = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const pageSize = this.data.pageSize;

    this.setData({ loading: true, errorText: "" });
    try {
      logger.info("api_call", {
        func: "favorite.getList",
        params: { page, pageSize }
      });
      const result = await favoriteService.getFavoriteList({ page, pageSize });
      logger.info("api_resp", { func: "favorite.getList", code: 0 });
      const remoteList = this.normalizeList(result.list || []);
      const list = initial ? remoteList : this.data.list.concat(remoteList);
      const total = Number(result.total || 0);
      const hasMore = list.length < total;

      this.setData({
        list,
        page,
        total,
        hasMore
      });
    } catch (error) {
      this.setData({ errorText: error.message || "收藏列表加载失败" });
      logger.error("api_error", { func: "favorite.getList", err: error.message });
    } finally {
      this.setData({ loading: false });
      logger.info("favorites_fetch_end", { initial });
    }
  },

  noop() {},

  onPageTap() {
    if (this.data.openActionHouseId) {
      this.setData({ openActionHouseId: "" });
    }
  },

  onCardTouchStart(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const touch = event.changedTouches?.[0];
    if (!houseId || !touch) {
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
    const touch = event.changedTouches?.[0];
    if (!houseId || !touch || !this.touchStartPoint || this.touchStartPoint.houseId !== houseId) {
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

  async onCancelFavoriteTap(event) {
    logger.info("favorites_cancel_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.info("favorites_cancel_end", { blocked: "empty_house_id" });
      return;
    }
    try {
      logger.info("api_call", { func: "favorite.toggle", params: { houseId } });
      await favoriteService.toggleFavorite(houseId);
      logger.info("api_resp", { func: "favorite.toggle", code: 0 });
      this.setData({ openActionHouseId: "" });
      wx.showToast({ title: "已取消收藏", icon: "none" });
      await this.refreshList();
    } catch (error) {
      logger.error("api_error", { func: "favorite.toggle", err: error.message });
      wx.showToast({ title: error.message || "操作失败", icon: "none" });
    } finally {
      logger.info("favorites_cancel_end", {});
    }
  },

  onGoDetailTap(event) {
    logger.info("favorites_go_detail_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.info("favorites_go_detail_end", { blocked: "empty_house_id" });
      return;
    }
    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
    logger.info("favorites_go_detail_end", { houseId });
  },

  applyTitleHighlight() {
    logger.info("favorites_title_highlight_start", {});
    this.clearTitleHighlightTimer();
    this.setData({ titleHighlight: true });
    wx.nextTick(() => {
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 260
      });
    });
    this.titleHighlightTimer = setTimeout(() => {
      this.setData({ titleHighlight: false });
      this.titleHighlightTimer = null;
    }, 1800);
    logger.info("favorites_title_highlight_end", {});
  },

  clearTitleHighlightTimer() {
    if (this.titleHighlightTimer) {
      clearTimeout(this.titleHighlightTimer);
      this.titleHighlightTimer = null;
    }
    this.touchStartPoint = null;
  }
});
