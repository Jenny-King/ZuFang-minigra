const chatService = require("../../services/chat.service");
const authUtils = require("../../utils/auth");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatDate, formatPrice, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");

const POLL_INTERVAL = 8000;

Page({
  data: {
    listLoading: false,
    conversationList: [],
    errorText: ""
  },

  onLoad(options) {
    logger.info("page_load", { page: "chat/index", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("chat_onload_end", { blocked: "not_login" });
      return;
    }
    logger.info("chat_onload_end", {});
  },

  async onShow() {
    logger.info("chat_onshow_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.info("chat_onshow_end", { blocked: "not_login" });
      return;
    }
    await this.loadConversationList();
    this.startPolling();
    logger.info("chat_onshow_end", {});
  },

  onHide() {
    logger.info("chat_onhide_start", {});
    this.stopPolling();
    logger.info("chat_onhide_end", {});
  },

  onUnload() {
    logger.info("chat_onunload_start", {});
    this.stopPolling();
    logger.info("chat_onunload_end", {});
  },

  async onPullDownRefresh() {
    logger.info("chat_pulldown_start", {});
    try {
      await this.loadConversationList();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("chat_pulldown_end", {});
    }
  },

  startPolling() {
    logger.info("chat_poll_start", {});
    this.stopPolling();
    this._pollTimer = setInterval(async () => {
      try {
        await this.loadConversationList({ silent: true });
      } catch (error) {
        logger.warn("chat_poll_tick_failed", { error: error.message });
      }
    }, POLL_INTERVAL);
    logger.info("chat_poll_end", {});
  },

  stopPolling() {
    logger.info("chat_stop_poll_start", {});
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
    logger.info("chat_stop_poll_end", {});
  },

  normalizeConversationList(list = []) {
    logger.debug("chat_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const userInfo = authUtils.getLoginUser() || {};
    const currentUserId = userInfo.userId || "";

    const normalized = (Array.isArray(list) ? list : []).map((item) => {
      const participantInfo = item.targetUser || {};
      const houseInfo = item.houseInfo || {};
      const unreadMap = item.unreadMap || {};
      const unreadCount = Number(unreadMap[currentUserId] || item.unreadCount || 0);
      const houseTitle = fallbackText(houseInfo.title, "房源信息待完善");
      const houseLayout = fallbackText(houseInfo.layoutText, "");
      const houseAddress = fallbackText(houseInfo.address, "");
      const houseMeta = [houseLayout, houseAddress]
        .filter((value) => value && value !== "--")
        .join(" | ");
      return {
        ...item,
        displayName: fallbackText(participantInfo.nickName || item.targetName, "未知用户"),
        displayAvatar: participantInfo.avatarUrl || item.targetAvatar || "",
        displayLastMessage: fallbackText(item.lastMessage, "暂无消息"),
        displayLastTime: item.lastMessageTime ? formatDate(item.lastMessageTime) : "",
        displayHouseTitle: houseTitle,
        displayHouseMeta: houseMeta || "房源信息待完善",
        displayHousePrice: formatPrice(Number(houseInfo.price || 0)),
        displayHouseCover: houseInfo.imageUrl || "/assets/images/house-placeholder.png",
        unreadCount
      };
    });

    logger.debug("chat_normalize_end", { count: normalized.length });
    return normalized;
  },

  async loadConversationList(options = {}) {
    const silent = Boolean(options.silent);
    logger.info("chat_list_load_start", { silent });
    if (this.data.listLoading && !silent) {
      logger.info("chat_list_load_end", { blocked: "loading" });
      return;
    }

    if (!silent) {
      this.setData({ listLoading: true, errorText: "" });
    }

    try {
      logger.info("api_call", { func: "chat.getConversations", params: {} });
      const result = await chatService.getConversationList();
      logger.info("api_resp", {
        func: "chat.getConversations",
        code: 0,
        count: (result.list || []).length
      });

      this.setData({
        conversationList: this.normalizeConversationList(result.list || [])
      });
    } catch (error) {
      const message = error.message || "会话加载失败";
      logger.error("api_error", { func: "chat.getConversations", err: message });
      if (!silent) {
        this.setData({ errorText: message });
      }
    } finally {
      if (!silent) {
        this.setData({ listLoading: false });
      }
      logger.info("chat_list_load_end", { silent });
    }
  },

  onConversationTap(event) {
    logger.info("chat_tap_item_start", { data: event.currentTarget.dataset || {} });
    const conversationId = event.currentTarget.dataset.conversationId;
    const targetUserId = event.currentTarget.dataset.targetUserId;
    if (!conversationId) {
      logger.warn("chat_tap_item_missing_conversation", {});
      return;
    }

    navigateTo(ROUTES.CHAT_DETAIL, {
      conversationId,
      targetUserId: targetUserId || "",
      houseId: event.currentTarget.dataset.houseId || ""
    });
    logger.info("chat_tap_item_end", { conversationId });
  }
});
