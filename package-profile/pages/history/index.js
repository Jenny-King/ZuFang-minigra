const historyService = require("../../../services/history.service");
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
    openActionHistoryId: ""
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/history", query: options || {} });
    this.shouldHighlightTitle = Boolean(options && options.highlight === "1");
    this.titleHighlightTimer = null;
    this.touchStartPoint = null;
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("history_onload_end", { blocked: "not_login" });
      return;
    }
    logger.debug("history_onload_end", {});
  },

  async onShow() {
    logger.debug("history_onshow_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.debug("history_onshow_end", { blocked: "not_login" });
      return;
    }
    await this.refreshList();
    if (this.shouldHighlightTitle) {
      this.shouldHighlightTitle = false;
      this.applyTitleHighlight();
    }
    logger.debug("history_onshow_end", {});
  },

  onUnload() {
    this.clearTitleHighlightTimer();
  },

  async onPullDownRefresh() {
    logger.debug("history_pulldown_start", {});
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("history_pulldown_end", {});
    }
  },

  async onReachBottom() {
    logger.debug("history_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.debug("history_reach_bottom_end", {});
  },

  normalizeList(list = []) {
    logger.debug("history_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalized = (Array.isArray(list) ? list : []).map((item) => {
      const house = item.houseInfo || item.house || {};
      return {
        ...item,
        historyId: item._id || item.historyId || "",
        houseId: item.houseId || house._id || "",
        displayTitle: fallbackText(house.title, "未命名房源"),
        displayAddress: fallbackText(house.address, "地址待完善"),
        displayPrice: formatPrice(Number(house.price) || 0),
        displayType: fallbackText(house.layoutText || house.type, "未知户型"),
        displayViewTime: item.viewTime ? formatDate(item.viewTime) : "",
        displayImage: Array.isArray(house.images) && house.images.length
          ? house.images[0]
          : "/assets/images/house-placeholder.png"
      };
    });
    logger.debug("history_normalize_end", { count: normalized.length });
    return normalized;
  },

  async refreshList() {
    logger.debug("history_refresh_start", {});
    this.setData({
      page: REQUEST_DEFAULT.PAGE,
      hasMore: true,
      openActionHistoryId: ""
    });
    await this.fetchList({ initial: true });
    logger.debug("history_refresh_end", {});
  },

  async loadMore() {
    logger.debug("history_load_more_start", {});
    if (this.data.loading || !this.data.hasMore) {
      logger.debug("history_load_more_end", { blocked: true });
      return;
    }
    await this.fetchList({ initial: false });
    logger.debug("history_load_more_end", {});
  },

  async fetchList({ initial }) {
    logger.debug("history_fetch_start", { initial });
    if (this.data.loading) {
      logger.debug("history_fetch_end", { blocked: "loading" });
      return;
    }
    const page = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const pageSize = this.data.pageSize;

    this.setData({ loading: true, errorText: "" });
    try {
      logger.debug("api_call", {
        func: "history.getList",
        params: { page, pageSize }
      });
      const result = await historyService.getHistoryList({ page, pageSize });
      logger.debug("api_resp", { func: "history.getList", code: 0 });
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
      this.setData({ errorText: error.message || "历史记录加载失败" });
      logger.error("api_error", { func: "history.getList", err: error.message });
    } finally {
      this.setData({ loading: false });
      logger.debug("history_fetch_end", { initial });
    }
  },

  noop() {},

  onPageTap() {
    if (this.data.openActionHistoryId) {
      this.setData({ openActionHistoryId: "" });
    }
  },

  onCardTouchStart(event) {
    const historyId = String(event.currentTarget.dataset.historyId || "").trim();
    const touch = event.changedTouches?.[0];
    if (!historyId || !touch) {
      return;
    }

    this.touchStartPoint = {
      historyId,
      x: Number(touch.clientX || 0),
      y: Number(touch.clientY || 0)
    };
  },

  onCardTouchEnd(event) {
    const historyId = String(event.currentTarget.dataset.historyId || "").trim();
    const touch = event.changedTouches?.[0];
    if (!historyId || !touch || !this.touchStartPoint || this.touchStartPoint.historyId !== historyId) {
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
      this.setData({ openActionHistoryId: historyId });
      return;
    }

    if (this.data.openActionHistoryId === historyId) {
      this.setData({ openActionHistoryId: "" });
    }
  },

  async onRemoveTap(event) {
    logger.debug("history_remove_start", { data: event.currentTarget.dataset || {} });
    const historyId = event.currentTarget.dataset.historyId;
    if (!historyId) {
      logger.debug("history_remove_end", { blocked: "empty_history_id" });
      return;
    }
    try {
      logger.debug("api_call", { func: "history.remove", params: { historyId } });
      await historyService.removeHistory(historyId);
      logger.debug("api_resp", { func: "history.remove", code: 0 });
      this.setData({ openActionHistoryId: "" });
      wx.showToast({ title: "已删除", icon: "none" });
      await this.refreshList();
    } catch (error) {
      logger.error("api_error", { func: "history.remove", err: error.message });
      wx.showToast({ title: error.message || "删除失败", icon: "none" });
    } finally {
      logger.debug("history_remove_end", {});
    }
  },

  async onClearTap() {
    logger.debug("history_clear_start", {});
    if (!this.data.list.length) {
      logger.debug("history_clear_end", { blocked: "empty_list" });
      return;
    }
    try {
      logger.debug("api_call", { func: "history.clear", params: {} });
      await historyService.clearHistory();
      logger.debug("api_resp", { func: "history.clear", code: 0 });
      this.setData({ openActionHistoryId: "" });
      wx.showToast({ title: "已清空历史", icon: "none" });
      await this.refreshList();
    } catch (error) {
      logger.error("api_error", { func: "history.clear", err: error.message });
      wx.showToast({ title: error.message || "清空失败", icon: "none" });
    } finally {
      logger.debug("history_clear_end", {});
    }
  },

  onGoDetailTap(event) {
    logger.debug("history_go_detail_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.debug("history_go_detail_end", { blocked: "empty_house_id" });
      return;
    }
    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
    logger.debug("history_go_detail_end", { houseId });
  },

  applyTitleHighlight() {
    logger.debug("history_title_highlight_start", {});
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
    logger.debug("history_title_highlight_end", {});
  },

  clearTitleHighlightTimer() {
    if (this.titleHighlightTimer) {
      clearTimeout(this.titleHighlightTimer);
      this.titleHighlightTimer = null;
    }
    this.touchStartPoint = null;
  }
});
