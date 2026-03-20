const paginationBehavior = require("../../behaviors/pagination");
const { normalizeCloudError } = require("../../services/cloud/error");
const houseService = require("../../services/house.service");
const authUtils = require("../../utils/auth");
const { USER_ROLE } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatPrice, formatDate, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");

function getStatusMeta(status) {
  if (status === "hidden") {
    return {
      key: "hidden",
      text: "已下架",
      badgeClass: "danger"
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

Page({
  behaviors: [paginationBehavior],

  data: {
    loading: false,
    empty: false,
    errorText: "",
    list: [],
    visibleList: [],
    pageSize: 50,
    activeFilter: "all",
    stats: buildStats(),
    hintVisible: true,
    openActionHouseId: "",
    showDeleteModal: false,
    pendingDeleteHouseId: "",
    pendingDeleteTitle: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "publish/index", query: options || {} });
    this.hasFirstShowHandled = false;
    this.touchStartPoint = null;

    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("publish_tab_onload_end", { blocked: "not_login" });
      return;
    }

    if (!authUtils.hasRole(USER_ROLE.LANDLORD)) {
      wx.showToast({ title: "仅房东可管理房源", icon: "none" });
      logger.debug("publish_tab_onload_end", { blocked: "role_denied" });
      return;
    }

    await this.refreshList();
    logger.debug("publish_tab_onload_end", {});
  },

  async onShow() {
    logger.debug("publish_tab_onshow_start", {});
    if (!authUtils.isLoggedIn() || !authUtils.hasRole(USER_ROLE.LANDLORD)) {
      logger.debug("publish_tab_onshow_end", { blocked: "permission_denied" });
      return;
    }

    if (!this.hasFirstShowHandled) {
      this.hasFirstShowHandled = true;
      logger.debug("publish_tab_onshow_end", { blocked: "first_show" });
      return;
    }

    await this.refreshList();
    logger.debug("publish_tab_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.debug("publish_tab_pulldown_start", {});
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("publish_tab_pulldown_end", {});
    }
  },

  async onReachBottom() {
    logger.debug("publish_tab_reach_bottom_start", { hasMore: this.data.hasMore });
    await this.loadMore();
    logger.debug("publish_tab_reach_bottom_end", {});
  },

  normalizeList(list = []) {
    logger.debug("publish_tab_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const normalized = (Array.isArray(list) ? list : []).map((item) => {
      const statusMeta = getStatusMeta(item.status);
      return {
        ...item,
        houseId: item._id || "",
        statusKey: statusMeta.key,
        displayStatus: statusMeta.text,
        statusBadgeClass: statusMeta.badgeClass,
        displayTitle: fallbackText(item.title, "未命名房源"),
        displayPrice: formatPrice(Number(item.price) || 0, "元"),
        displayCreateTime: item.createTime ? formatPublishDate(item.createTime) : "",
        displayLayout: fallbackText(item.layoutText || item.type, "户型待完善"),
        displayArea: Number(item.area) > 0 ? `${Number(item.area)}㎡` : "面积待完善",
        displayFloor: fallbackText(item.floor, "楼层待完善"),
        displayImage: Array.isArray(item.images) && item.images[0] ? item.images[0] : "",
        actionLabel: statusMeta.key === "hidden" ? "上架" : "下架",
        actionLabelTop: statusMeta.key === "hidden" ? "上" : "下",
        actionLabelBottom: "架",
        actionStatus: statusMeta.key === "hidden" ? "active" : "hidden",
        actionButtonClass: statusMeta.key === "hidden" ? "swipe-publish" : "swipe-unpublish"
      };
    });
    logger.debug("publish_tab_normalize_end", { count: normalized.length });
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

  noop() {},

  onPageTap() {
    if (this.data.openActionHouseId) {
      this.setData({ openActionHouseId: "" });
    }
  },

  onCloseHintTap() {
    this.setData({ hintVisible: false });
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

  onToggleActionsTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    if (!houseId) {
      return;
    }

    this.setData({
      openActionHouseId: this.data.openActionHouseId === houseId ? "" : houseId
    });
  },

  async onToggleStatusTap(event) {
    const houseId = String(event.currentTarget.dataset.houseId || "").trim();
    const nextStatus = String(event.currentTarget.dataset.status || "").trim();
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
  }
});
