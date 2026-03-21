const chatService = require("../../services/chat.service");
const authUtils = require("../../utils/auth");
const { ROUTES, navigateTo } = require("../../config/routes");
const { formatDate, formatPrice, fallbackText } = require("../../utils/format");
const { getConversationPreviewText } = require("../../utils/chat-message");
const { logger } = require("../../utils/logger");

const db = wx.cloud.database();

Page({
  data: {
    listLoading: false,
    conversationList: [],
    errorText: ""
  },

  onLoad(options) {
    logger.info("page_load", { page: "chat/index", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("chat_onload_end", { blocked: "not_login" });
      return;
    }
    logger.debug("chat_onload_end", {});
  },

  async onShow() {
    logger.debug("chat_onshow_start", {});
    if (!authUtils.isLoggedIn()) {
      logger.debug("chat_onshow_end", { blocked: "not_login" });
      return;
    }
    await this.loadConversationList();
    this.startWatcher();
    logger.debug("chat_onshow_end", {});
  },

  onHide() {
    logger.debug("chat_onhide", {});
    this.closeWatcher();
  },

  onUnload() {
    logger.debug("chat_onunload", {});
    this.closeWatcher();
  },

  async onPullDownRefresh() {
    logger.debug("chat_pulldown_start", {});
    try {
      await this.loadConversationList();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("chat_pulldown_end", {});
    }
  },

  startWatcher() {
    this.closeWatcher();
    const userInfo = authUtils.getLoginUser();
    if (!userInfo || !userInfo.userId) {
      logger.debug("chat_watcher_skip", { reason: "no_user" });
      return;
    }

    const _ = db.command;
    this._watcher = db.collection("conversations")
      .where({ participantIds: _.all([userInfo.userId]) })
      .watch({
        onChange: (snapshot) => {
          logger.debug("chat_watcher_change", { type: snapshot.type, count: (snapshot.docs || []).length });
          this.loadConversationList({ silent: true }).catch((err) => {
            logger.warn("chat_watcher_reload_failed", { error: err.message });
          });
        },
        onError: (err) => {
          logger.warn("chat_watcher_error", { error: err.errMsg || err.message || "unknown" });
        }
      });
    logger.debug("chat_watcher_started", { userId: userInfo.userId });
  },

  closeWatcher() {
    if (this._watcher) {
      this._watcher.close();
      this._watcher = null;
      logger.debug("chat_watcher_closed", {});
    }
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
        displayLastMessage: getConversationPreviewText(item.lastMessage),
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
    logger.debug("chat_list_load_start", { silent });
    if (this.data.listLoading && !silent) {
      logger.debug("chat_list_load_end", { blocked: "loading" });
      return;
    }

    if (!silent) {
      this.setData({ listLoading: true, errorText: "" });
    }

    try {
      logger.debug("api_call", { func: "chat.getConversations", params: {} });
      const result = await chatService.getConversationList();
      logger.debug("api_resp", {
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
      logger.debug("chat_list_load_end", { silent });
    }
  },

  onConversationTap(event) {
    logger.debug("chat_tap_item_start", { data: event.currentTarget.dataset || {} });
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
    logger.debug("chat_tap_item_end", { conversationId });
  }
});
