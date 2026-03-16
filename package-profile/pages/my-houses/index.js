const paginationBehavior = require("../../../behaviors/pagination");
const { normalizeCloudError } = require("../../../services/cloud/error");
const houseService = require("../../../services/house.service");
const authUtils = require("../../../utils/auth");
const { USER_ROLE } = require("../../../config/constants");
const { ROUTES, switchTab } = require("../../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");

const PENDING_PUBLISH_CONTEXT_KEY = "pendingPublishContext";

function getStatusText(status) {
  if (status === "hidden") {
    return "hidden";
  }

  if (status === "deleted") {
    return "deleted";
  }

  return "active";
}

function setPendingPublishContext(context = null) {
  const app = getApp();
  app.globalData[PENDING_PUBLISH_CONTEXT_KEY] = context;
}

Page({
  behaviors: [paginationBehavior],

  data: {
    loading: false,
    empty: false,
    errorText: "",
    list: []
  },

  async onLoad(options) {
    logger.info("page_load", { page: "profile/my-houses", query: options || {} });
    this.hasFirstShowHandled = false;

    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("my_houses_onload_end", { blocked: "not_login" });
      return;
    }

    if (!authUtils.hasRole(USER_ROLE.LANDLORD)) {
      wx.showToast({ title: "仅房东可管理房源", icon: "none" });
      logger.info("my_houses_onload_end", { blocked: "role_denied" });
      return;
    }

    await this.refreshList();
    logger.info("my_houses_onload_end", {});
  },

  async onShow() {
    logger.info("my_houses_onshow_start", {});
    if (!authUtils.isLoggedIn() || !authUtils.hasRole(USER_ROLE.LANDLORD)) {
      logger.info("my_houses_onshow_end", { blocked: "permission_denied" });
      return;
    }

    if (!this.hasFirstShowHandled) {
      this.hasFirstShowHandled = true;
      logger.info("my_houses_onshow_end", { blocked: "first_show" });
      return;
    }

    await this.refreshList();
    logger.info("my_houses_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.info("my_houses_pulldown_start", {});
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("my_houses_pulldown_end", {});
    }
  },

  async onReachBottom() {
    logger.info("my_houses_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.info("my_houses_reach_bottom_end", {});
  },

  normalizeList(list = []) {
    logger.debug("my_houses_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalized = (Array.isArray(list) ? list : []).map((item) => ({
      ...item,
      houseId: item._id || "",
      displayTitle: fallbackText(item.title, "未命名房源"),
      displayPrice: formatPrice(Number(item.price) || 0),
      displayStatus: getStatusText(item.status),
      displayCreateTime: item.createTime ? formatDate(item.createTime) : ""
    }));
    logger.debug("my_houses_normalize_end", { count: normalized.length });
    return normalized;
  },

  async fetchHousePage({ page, pageSize }) {
    logger.info("api_call", {
      func: "house.getMine",
      params: { page, pageSize }
    });

    const result = await houseService.getMyHouseList({ page, pageSize });

    logger.info("api_resp", {
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
    logger.info("my_houses_refresh_start", {});
    this.resetPaginationState();
    this.setData({
      loading: true,
      empty: false,
      errorText: "",
      list: []
    });

    try {
      await this.loadPage({
        initial: true,
        concat: false,
        fetcher: this.fetchHousePage.bind(this),
        onSuccess: (result) => {
          const list = Array.isArray(result.list) ? result.list : [];
          this.setData({
            empty: list.length === 0
          });
        }
      });
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "getMine"
      });
      this.setData({
        empty: false,
        errorText: normalizedError.message || "我的发布加载失败"
      });
      logger.error("api_error", { func: "house.getMine", err: normalizedError.message });
    } finally {
      this.setData({ loading: false });
      logger.info("my_houses_refresh_end", {});
    }
  },

  async loadMore() {
    logger.info("my_houses_load_more_start", {
      hasMore: this.data.hasMore,
      listLoading: this.data.listLoading
    });

    if (!this.data.hasMore || this.data.listLoading) {
      logger.info("my_houses_load_more_end", { blocked: true });
      return;
    }

    this.setData({ loading: true });
    try {
      await this.loadPage({
        initial: false,
        concat: true,
        fetcher: this.fetchHousePage.bind(this),
        onSuccess: () => {
          this.setData({
            empty: Array.isArray(this.data.list) && this.data.list.length === 0
          });
        }
      });
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "getMine"
      });
      this.setData({
        errorText: normalizedError.message || "我的发布加载失败"
      });
      logger.error("api_error", { func: "house.getMine", err: normalizedError.message });
    } finally {
      this.setData({ loading: false });
      logger.info("my_houses_load_more_end", {});
    }
  },

  onGoPublish() {
    logger.info("my_houses_go_publish_start", {});
    setPendingPublishContext({ mode: "create" });
    switchTab(ROUTES.PUBLISH_EDIT);
    logger.info("my_houses_go_publish_end", {});
  },

  async onGoEdit(event) {
    logger.info("my_houses_go_edit_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.info("my_houses_go_edit_end", { blocked: "empty_house_id" });
      return;
    }

    setPendingPublishContext({
      mode: "edit",
      houseId: String(houseId)
    });
    try {
      await switchTab(ROUTES.PUBLISH_EDIT);
    } catch (error) {
      logger.error("my_houses_go_edit_failed", { houseId, err: error.message });
      wx.showToast({ title: error.message || "跳转编辑页失败", icon: "none" });
    }
    logger.info("my_houses_go_edit_end", { houseId });
  },

  async onDeleteHouse(event) {
    logger.info("my_houses_delete_start", { data: event.currentTarget.dataset || {} });
    const houseId = event.currentTarget.dataset.houseId;
    if (!houseId) {
      logger.info("my_houses_delete_end", { blocked: "empty_house_id" });
      return;
    }

    const modalRes = await wx.showModal({
      title: "确认删除",
      content: "删除后该房源将不再展示，是否继续？",
      confirmColor: "#ff4d4f",
      cancelColor: "#999999"
    });

    if (!modalRes.confirm) {
      logger.info("my_houses_delete_end", { blocked: "cancelled" });
      return;
    }

    try {
      logger.info("api_call", { func: "house.remove", params: { houseId } });
      await houseService.deleteHouse(String(houseId));
      logger.info("api_resp", { func: "house.remove", code: 0 });
      wx.showToast({ title: "删除成功", icon: "success" });
      await this.refreshList();
    } catch (error) {
      const normalizedError = normalizeCloudError(error, {
        moduleName: "house",
        action: "remove"
      });
      this.setData({ errorText: normalizedError.message || "删除失败" });
      logger.error("api_error", { func: "house.remove", err: normalizedError.message });
      wx.showToast({ title: normalizedError.message || "删除失败", icon: "none" });
    } finally {
      logger.info("my_houses_delete_end", { houseId });
    }
  }
});
