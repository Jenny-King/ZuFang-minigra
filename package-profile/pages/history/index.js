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
    errorText: ""
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/history", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("history_onload_end", { blocked: "not_login" });
      return;
    }
    logger.info("history_onload_end", {});
  },

  async onShow() {
    logger.info("history_onshow_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.info("history_onshow_end", { blocked: "not_login" });
      return;
    }
    await this.refreshList();
    logger.info("history_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.info("history_pulldown_start", {});
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("history_pulldown_end", {});
    }
  },

  async onReachBottom() {
    logger.info("history_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.info("history_reach_bottom_end", {});
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
        displayType: fallbackText(house.type, "未知户型"),
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
    logger.info("history_refresh_start", {});
    this.setData({
      page: REQUEST_DEFAULT.PAGE,
      hasMore: true
    });
    await this.fetchList({ initial: true });
    logger.info("history_refresh_end", {});
  },

  async loadMore() {
    logger.info("history_load_more_start", {});
    if (this.data.loading || !this.data.hasMore) {
      logger.info("history_load_more_end", { blocked: true });
      return;
    }
    await this.fetchList({ initial: false });
    logger.info("history_load_more_end", {});
  },

  async fetchList({ initial }) {
    logger.info("history_fetch_start", { initial });
    if (this.data.loading) {
      logger.info("history_fetch_end", { blocked: "loading" });
      return;
    }
    const page = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const pageSize = this.data.pageSize;

    this.setData({ loading: true, errorText: "" });
    try {
      logger.info("api_call", {
        func: "history.getList",
        params: { page, pageSize }
      });
      const result = await historyService.getHistoryList({ page, pageSize });
      logger.info("api_resp", { func: "history.getList", code: 0 });
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
      logger.info("history_fetch_end", { initial });
    }
  },

  async onRemoveTap(event) {
    logger.info("history_remove_start", { data: event.currentTarget.dataset || {} });
    const historyId = event.currentTarget.dataset.historyId;
    if (!historyId) {
      logger.info("history_remove_end", { blocked: "empty_history_id" });
      return;
    }
    try {
      logger.info("api_call", { func: "history.remove", params: { historyId } });
      await historyService.removeHistory(historyId);
      logger.info("api_resp", { func: "history.remove", code: 0 });
      wx.showToast({ title: "已删除", icon: "none" });
      await this.refreshList();
    } catch (error) {
      logger.error("api_error", { func: "history.remove", err: error.message });
      wx.showToast({ title: error.message || "删除失败", icon: "none" });
    } finally {
      logger.info("history_remove_end", {});
    }
  },

  async onClearTap() {
    logger.info("history_clear_start", {});
    if (!this.data.list.length) {
      logger.info("history_clear_end", { blocked: "empty_list" });
      return;
    }
    try {
      logger.info("api_call", { func: "history.clear", params: {} });
      await historyService.clearHistory();
      logger.info("api_resp", { func: "history.clear", code: 0 });
      wx.showToast({ title: "已清空历史", icon: "none" });
      await this.refreshList();
    } catch (error) {
      logger.error("api_error", { func: "history.clear", err: error.message });
      wx.showToast({ title: error.message || "清空失败", icon: "none" });
    } finally {
      logger.info("history_clear_end", {});
    }
  },

  onGoDetailTap(event) {
    logger.info("history_go_detail_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.info("history_go_detail_end", { blocked: "empty_house_id" });
      return;
    }
    navigateTo(ROUTES.HOUSE_DETAIL, { houseId });
    logger.info("history_go_detail_end", { houseId });
  }
});