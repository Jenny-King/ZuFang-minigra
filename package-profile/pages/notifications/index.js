const chatService = require("../../../services/chat.service");
const authUtils = require("../../../utils/auth");
const { REQUEST_DEFAULT } = require("../../../config/constants");
const { formatDate, fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");

function normalizeList(list = []) {
  return (Array.isArray(list) ? list : []).map((item) => ({
    ...item,
    displayTitle: fallbackText(item.title, "系统通知"),
    displayContent: fallbackText(item.content, "暂无内容"),
    displayTime: item.createTime ? formatDate(item.createTime) : "",
    displayStatus: item.read ? "已读" : "未读"
  }));
}

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
    logger.info("page_load", { page: "profile/notifications", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("notifications_onload_end", { blocked: "not_login" });
      return;
    }
    logger.debug("notifications_onload_end", {});
  },

  async onShow() {
    if (!authUtils.isLoggedIn()) {
      return;
    }
    await this.refreshList();
  },

  async onPullDownRefresh() {
    try {
      await this.refreshList();
    } finally {
      wx.stopPullDownRefresh();
    }
  },

  async onReachBottom() {
    await this.loadMore();
  },

  async refreshList() {
    this.setData({
      page: REQUEST_DEFAULT.PAGE,
      total: 0,
      hasMore: true
    });
    await this.fetchList({ initial: true });
  },

  async loadMore() {
    if (this.data.loading || !this.data.hasMore) {
      return;
    }
    await this.fetchList({ initial: false });
  },

  async fetchList({ initial }) {
    if (this.data.loading) {
      return;
    }

    const page = initial ? REQUEST_DEFAULT.PAGE : this.data.page + 1;
    const pageSize = this.data.pageSize;
    this.setData({ loading: true, errorText: "" });

    try {
      const result = await chatService.getNotificationList({ page, pageSize });
      const remoteList = normalizeList(result.list || []);
      const list = initial ? remoteList : this.data.list.concat(remoteList);
      const total = Number(result.total || 0);

      this.setData({
        list,
        page,
        total,
        hasMore: list.length < total
      });
    } catch (error) {
      logger.error("api_error", { func: "chat.getNotifications", err: error.message });
      this.setData({ errorText: error.message || "通知加载失败" });
    } finally {
      this.setData({ loading: false });
    }
  },

  async onNotificationTap(event) {
    const messageId = String(event.currentTarget.dataset.messageId || "");
    if (!messageId) {
      return;
    }

    const targetItem = this.data.list.find((item) => item._id === messageId);
    if (!targetItem || targetItem.read) {
      return;
    }

    try {
      await chatService.markNotificationRead(messageId);
      this.setData({
        list: this.data.list.map((item) => (item._id === messageId
          ? { ...item, read: true, displayStatus: "已读" }
          : item))
      });
    } catch (error) {
      logger.error("api_error", { func: "chat.markNotificationRead", err: error.message });
      wx.showToast({ title: error.message || "标记失败", icon: "none" });
    }
  }
});
