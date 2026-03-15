const chatService = require("../../../services/chat.service");
const authUtils = require("../../../utils/auth");
const { formatDate } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");

const POLL_INTERVAL = 5000;

Page({
  data: {
    conversationId: "",
    targetUserId: "",
    houseId: "",
    loading: false,
    sending: false,
    errorText: "",
    inputValue: "",
    messageList: [],
    scrollToViewId: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "chat/detail", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("chat_detail_onload_end", { blocked: "not_login" });
      return;
    }

    const conversationId = options && options.conversationId ? String(options.conversationId) : "";
    const targetUserId = options && options.targetUserId ? String(options.targetUserId) : "";
    const houseId = options && options.houseId ? String(options.houseId) : "";

    this.setData({
      conversationId,
      targetUserId,
      houseId
    });

    await this.ensureConversation();
    await this.loadMessages();
    await this.markAsRead();
    logger.info("chat_detail_onload_end", { conversationId: this.data.conversationId });
  },

  async onShow() {
    logger.info("chat_detail_onshow_start", {});
    if (this.data.conversationId) {
      this.startPolling();
    }
    logger.info("chat_detail_onshow_end", {});
  },

  onHide() {
    logger.info("chat_detail_onhide_start", {});
    this.stopPolling();
    logger.info("chat_detail_onhide_end", {});
  },

  onUnload() {
    logger.info("chat_detail_onunload_start", {});
    this.stopPolling();
    logger.info("chat_detail_onunload_end", {});
  },

  async onPullDownRefresh() {
    logger.info("chat_detail_pulldown_start", {});
    try {
      await this.loadMessages();
      await this.markAsRead();
    } finally {
      wx.stopPullDownRefresh();
      logger.info("chat_detail_pulldown_end", {});
    }
  },

  async ensureConversation() {
    logger.info("chat_detail_ensure_conv_start", {});
    if (this.data.conversationId) {
      logger.info("chat_detail_ensure_conv_end", { reused: true });
      return;
    }
    if (!this.data.targetUserId || !this.data.houseId) {
      this.setData({ errorText: "缺少会话参数，无法进入聊天" });
      logger.info("chat_detail_ensure_conv_end", { blocked: "missing_params" });
      return;
    }

    try {
      logger.info("api_call", {
        func: "chat.createConversation",
        params: {
          targetUserId: this.data.targetUserId,
          houseId: this.data.houseId
        }
      });
      const result = await chatService.createOrGetConversation(this.data.targetUserId, this.data.houseId);
      logger.info("api_resp", { func: "chat.createConversation", code: 0 });
      this.setData({
        conversationId: result && result.conversationId ? result.conversationId : ""
      });
    } catch (error) {
      this.setData({ errorText: error.message || "会话创建失败" });
      logger.error("api_error", { func: "chat.createConversation", err: error.message });
    } finally {
      logger.info("chat_detail_ensure_conv_end", {});
    }
  },

  startPolling() {
    logger.info("chat_detail_poll_start", {});
    this.stopPolling();
    this._pollTimer = setInterval(async () => {
      try {
        await this.loadMessages({ silent: true });
        await this.markAsRead({ silent: true });
      } catch (error) {
        logger.warn("chat_detail_poll_tick_failed", { error: error.message });
      }
    }, POLL_INTERVAL);
    logger.info("chat_detail_poll_end", {});
  },

  stopPolling() {
    logger.info("chat_detail_stop_poll_start", {});
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
    logger.info("chat_detail_stop_poll_end", {});
  },

  normalizeMessages(list = []) {
    logger.debug("chat_detail_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const currentUser = authUtils.getLoginUser() || {};
    const currentUserId = currentUser.userId || "";
    const normalized = (Array.isArray(list) ? list : []).map((item, index) => ({
      ...item,
      _viewId: `msg_${item._id || index}`,
      isSelf: item.senderId === currentUserId,
      displayTime: item.createTime ? formatDate(item.createTime) : ""
    }));
    logger.debug("chat_detail_normalize_end", { count: normalized.length });
    return normalized;
  },

  async loadMessages(options = {}) {
    const silent = Boolean(options.silent);
    logger.info("chat_detail_load_msgs_start", { silent });
    if (!this.data.conversationId) {
      logger.info("chat_detail_load_msgs_end", { blocked: "empty_conversation" });
      return;
    }

    if (!silent) {
      this.setData({ loading: true, errorText: "" });
    }

    try {
      logger.info("api_call", {
        func: "chat.getMessages",
        params: { conversationId: this.data.conversationId }
      });
      const result = await chatService.getMessageList(this.data.conversationId, 1, 50);
      logger.info("api_resp", { func: "chat.getMessages", code: 0 });
      const messageList = this.normalizeMessages(result.list || []);
      const lastMessage = messageList[messageList.length - 1];
      this.setData({
        messageList,
        scrollToViewId: lastMessage ? lastMessage._viewId : ""
      });
    } catch (error) {
      if (!silent) {
        this.setData({ errorText: error.message || "消息加载失败" });
      }
      logger.error("api_error", { func: "chat.getMessages", err: error.message });
    } finally {
      if (!silent) {
        this.setData({ loading: false });
      }
      logger.info("chat_detail_load_msgs_end", { silent });
    }
  },

  async markAsRead(options = {}) {
    const silent = Boolean(options.silent);
    logger.info("chat_detail_mark_read_start", { silent });
    if (!this.data.conversationId) {
      logger.info("chat_detail_mark_read_end", { blocked: "empty_conversation" });
      return;
    }
    try {
      logger.info("api_call", {
        func: "chat.markRead",
        params: { conversationId: this.data.conversationId }
      });
      await chatService.markConversationRead(this.data.conversationId);
      logger.info("api_resp", { func: "chat.markRead", code: 0 });
    } catch (error) {
      logger.error("api_error", { func: "chat.markRead", err: error.message });
    } finally {
      logger.info("chat_detail_mark_read_end", { silent });
    }
  },

  onInputChange(event) {
    logger.debug("chat_detail_input_start", {});
    this.setData({ inputValue: event.detail.value || "" });
    logger.debug("chat_detail_input_end", {});
  },

  async onSendTap() {
    logger.info("chat_detail_send_start", {});
    if (this.data.sending) {
      logger.info("chat_detail_send_end", { blocked: "sending" });
      return;
    }
    const content = String(this.data.inputValue || "").trim();
    if (!content) {
      wx.showToast({ title: "请输入消息内容", icon: "none" });
      logger.info("chat_detail_send_end", { blocked: "empty_content" });
      return;
    }
    if (!this.data.conversationId) {
      wx.showToast({ title: "会话初始化失败", icon: "none" });
      logger.info("chat_detail_send_end", { blocked: "empty_conversation" });
      return;
    }

    this.setData({ sending: true });
    try {
      logger.info("api_call", {
        func: "chat.sendMessage",
        params: { conversationId: this.data.conversationId }
      });
      await chatService.sendMessage(this.data.conversationId, content, "text");
      logger.info("api_resp", { func: "chat.sendMessage", code: 0 });
      this.setData({ inputValue: "" });
      await this.loadMessages({ silent: true });
      await this.markAsRead({ silent: true });
    } catch (error) {
      logger.error("api_error", { func: "chat.sendMessage", err: error.message });
      wx.showToast({ title: error.message || "发送失败", icon: "none" });
    } finally {
      this.setData({ sending: false });
      logger.info("chat_detail_send_end", {});
    }
  }
});