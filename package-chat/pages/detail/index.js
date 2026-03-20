const chatService = require("../../../services/chat.service");
const houseService = require("../../../services/house.service");
const { MESSAGE_TYPE } = require("../../../config/constants");
const authUtils = require("../../../utils/auth");
const { ROUTES, navigateTo } = require("../../../config/routes");
const { formatPrice, fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const POLL_INTERVAL = 5000;

Page({
  data: {
    conversationId: "",
    targetUserId: "",
    houseId: "",
    loading: false,
    sending: false,
    uploadingImage: false,
    errorText: "",
    inputValue: "",
    canSend: false,
    currentUserAvatar: "/assets/images/avatar-placeholder.png",
    targetUserAvatar: "/assets/images/avatar-placeholder.png",
    houseCard: null,
    messageList: [],
    scrollToViewId: ""
  },

  async onLoad(options) {
    logger.info("page_load", { page: "chat/detail", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("chat_detail_onload_end", { blocked: "not_login" });
      return;
    }

    const conversationId = options && options.conversationId ? String(options.conversationId) : "";
    const targetUserId = options && options.targetUserId ? String(options.targetUserId) : "";
    const houseId = options && options.houseId ? String(options.houseId) : "";

    this.setData({
      conversationId,
      targetUserId,
      houseId,
      currentUserAvatar: authUtils.getLoginUser()?.avatarUrl || "/assets/images/avatar-placeholder.png"
    });

    await this.ensureConversation();
    await this.loadConversationProfile();
    await this.loadHouseCard();
    await this.loadMessages();
    await this.markAsRead();
    logger.debug("chat_detail_onload_end", { conversationId: this.data.conversationId });
  },

  async onShow() {
    logger.debug("chat_detail_onshow_start", {});
    if (this.data.conversationId) {
      this.startPolling();
    }
    logger.debug("chat_detail_onshow_end", {});
  },

  onHide() {
    logger.debug("chat_detail_onhide_start", {});
    this.stopPolling();
    logger.debug("chat_detail_onhide_end", {});
  },

  onUnload() {
    logger.debug("chat_detail_onunload_start", {});
    this.stopPolling();
    logger.debug("chat_detail_onunload_end", {});
  },

  async onPullDownRefresh() {
    logger.debug("chat_detail_pulldown_start", {});
    try {
      await this.loadHouseCard();
      await this.loadMessages();
      await this.markAsRead();
    } finally {
      wx.stopPullDownRefresh();
      logger.debug("chat_detail_pulldown_end", {});
    }
  },

  async ensureConversation() {
    logger.debug("chat_detail_ensure_conv_start", {});
    if (this.data.conversationId) {
      logger.debug("chat_detail_ensure_conv_end", { reused: true });
      return;
    }
    if (!this.data.targetUserId || !this.data.houseId) {
      this.setData({ errorText: "缺少会话参数，无法进入聊天" });
      logger.debug("chat_detail_ensure_conv_end", { blocked: "missing_params" });
      return;
    }

    try {
      logger.debug("api_call", {
        func: "chat.createConversation",
        params: {
          targetUserId: this.data.targetUserId,
          houseId: this.data.houseId
        }
      });
      const result = await chatService.createOrGetConversation(this.data.targetUserId, this.data.houseId);
      logger.debug("api_resp", { func: "chat.createConversation", code: 0 });
      this.setData({
        conversationId: result && result.conversationId ? result.conversationId : ""
      });
    } catch (error) {
      this.setData({ errorText: error.message || "会话创建失败" });
      logger.error("api_error", { func: "chat.createConversation", err: error.message });
    } finally {
      logger.debug("chat_detail_ensure_conv_end", {});
    }
  },

  startPolling() {
    logger.debug("chat_detail_poll_start", {});
    this.stopPolling();
    this._pollTimer = setInterval(async () => {
      try {
        await this.loadMessages({ silent: true });
        await this.markAsRead({ silent: true });
      } catch (error) {
        logger.warn("chat_detail_poll_tick_failed", { error: error.message });
      }
    }, POLL_INTERVAL);
    logger.debug("chat_detail_poll_end", {});
  },

  stopPolling() {
    logger.debug("chat_detail_stop_poll_start", {});
    if (this._pollTimer) {
      clearInterval(this._pollTimer);
      this._pollTimer = null;
    }
    logger.debug("chat_detail_stop_poll_end", {});
  },

  normalizeHouseCard(detail) {
    if (!detail) {
      return null;
    }

    const images = Array.isArray(detail.images) ? detail.images.filter(Boolean) : [];
    const displayLayout = fallbackText(detail.layoutText || detail.type, "");
    const displayAddress = fallbackText(detail.address, "");
    const displayMeta = [displayLayout, displayAddress]
      .filter((value) => value && value !== "--")
      .join(" | ");

    return {
      houseId: detail._id || this.data.houseId,
      imageUrl: images[0] || "/assets/images/house-placeholder.png",
      title: fallbackText(detail.title, "房源信息待完善"),
      priceText: formatPrice(Number(detail.price || 0)),
      metaText: displayMeta || "房源信息待完善"
    };
  },

  async loadHouseCard() {
    logger.debug("chat_detail_load_house_start", {});
    if (!this.data.houseId) {
      this.setData({ houseCard: null });
      logger.debug("chat_detail_load_house_end", { blocked: "empty_house_id" });
      return;
    }

    try {
      logger.debug("api_call", {
        func: "house.getDetail",
        params: { houseId: this.data.houseId }
      });
      const detail = await houseService.getHouseDetail(this.data.houseId);
      logger.debug("api_resp", { func: "house.getDetail", code: 0 });
      this.setData({
        houseCard: this.normalizeHouseCard(detail)
      });
    } catch (error) {
      this.setData({ houseCard: null });
      logger.warn("api_error", { func: "house.getDetail", err: error.message });
    } finally {
      logger.debug("chat_detail_load_house_end", {});
    }
  },

  async loadConversationProfile() {
    logger.debug("chat_detail_load_profile_start", {});
    if (!this.data.conversationId) {
      logger.debug("chat_detail_load_profile_end", { blocked: "empty_conversation" });
      return;
    }

    try {
      const result = await chatService.getConversationList();
      const conversation = (result.list || []).find((item) => item.conversationId === this.data.conversationId);
      const targetUser = conversation?.targetUser || {};
      this.setData({
        targetUserAvatar: targetUser.avatarUrl || "/assets/images/avatar-placeholder.png"
      });
    } catch (error) {
      logger.warn("chat_detail_load_profile_failed", { error: error.message });
    } finally {
      logger.debug("chat_detail_load_profile_end", {});
    }
  },

  normalizeMessages(list = []) {
    logger.debug("chat_detail_normalize_start", { count: Array.isArray(list) ? list.length : 0 });
    const currentUser = authUtils.getLoginUser() || {};
    const currentUserId = currentUser.userId || "";
    const normalized = (Array.isArray(list) ? list : []).map((item, index) => ({
      ...item,
      _viewId: `msg_${item._id || index}`,
      isImage: item.messageType === MESSAGE_TYPE.IMAGE,
      isSelf: item.senderId === currentUserId,
      displayTime: item.createTime ? this.formatTime(item.createTime) : ""
    }));
    const processed = this.processMessages(normalized);
    logger.debug("chat_detail_normalize_end", { count: processed.length });
    return processed;
  },

  async loadMessages(options = {}) {
    const silent = Boolean(options.silent);
    logger.debug("chat_detail_load_msgs_start", { silent });
    if (!this.data.conversationId) {
      logger.debug("chat_detail_load_msgs_end", { blocked: "empty_conversation" });
      return;
    }

    if (!silent) {
      this.setData({ loading: true, errorText: "" });
    }

    try {
      logger.debug("api_call", {
        func: "chat.getMessages",
        params: { conversationId: this.data.conversationId }
      });
      const result = await chatService.getMessageList(this.data.conversationId, 1, 50);
      logger.debug("api_resp", { func: "chat.getMessages", code: 0 });
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
      logger.debug("chat_detail_load_msgs_end", { silent });
    }
  },

  async markAsRead(options = {}) {
    const silent = Boolean(options.silent);
    logger.debug("chat_detail_mark_read_start", { silent });
    if (!this.data.conversationId) {
      logger.debug("chat_detail_mark_read_end", { blocked: "empty_conversation" });
      return;
    }
    try {
      logger.debug("api_call", {
        func: "chat.markRead",
        params: { conversationId: this.data.conversationId }
      });
      await chatService.markConversationRead(this.data.conversationId);
      logger.debug("api_resp", { func: "chat.markRead", code: 0 });
    } catch (error) {
      logger.error("api_error", { func: "chat.markRead", err: error.message });
    } finally {
      logger.debug("chat_detail_mark_read_end", { silent });
    }
  },

  onInputChange(event) {
    logger.debug("chat_detail_input_start", {});
    const inputValue = event.detail.value || "";
    this.setData({
      inputValue,
      canSend: Boolean(String(inputValue).trim())
    });
    logger.debug("chat_detail_input_end", {});
  },

  processMessages(msgs = []) {
    let lastStamp = 0;
    return msgs.map((message) => {
      const currentStamp = new Date(message.createTime || 0).getTime();
      const gap = currentStamp - lastStamp > 5 * 60 * 1000;
      if (gap) {
        lastStamp = currentStamp;
      }
      return {
        ...message,
        showTime: gap,
        timeLabel: this.formatTime(message.createTime)
      };
    });
  },

  formatTime(ts) {
    const date = new Date(ts);
    const hm = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return hm;
    }
    return `${date.getMonth() + 1}月${date.getDate()}日 ${hm}`;
  },

  onHouseCardTap() {
    logger.debug("chat_detail_house_tap_start", {});
    if (!this.data.houseId) {
      logger.debug("chat_detail_house_tap_end", { blocked: "empty_house_id" });
      return;
    }

    navigateTo(ROUTES.HOUSE_DETAIL, {
      houseId: this.data.houseId
    });
    logger.debug("chat_detail_house_tap_end", { houseId: this.data.houseId });
  },

  buildImageCloudPath(tempFilePath) {
    const userInfo = authUtils.getLoginUser() || {};
    const userId = userInfo.userId || "anonymous";
    const extension = tempFilePath.includes(".")
      ? tempFilePath.split(".").pop().split("?")[0]
      : "jpg";
    return `chat/${userId}/${this.data.conversationId || "pending"}/${Date.now()}.${extension}`;
  },

  async onChooseImageTap() {
    logger.debug("chat_detail_choose_image_start", {});
    if (this.data.sending || this.data.uploadingImage) {
      logger.debug("chat_detail_choose_image_end", { blocked: "sending" });
      return;
    }
    if (!this.data.conversationId) {
      await toast.error("会话初始化失败");
      logger.debug("chat_detail_choose_image_end", { blocked: "empty_conversation" });
      return;
    }

    try {
      const actionRes = await wx.showActionSheet({
        itemList: ["拍摄", "从相册选择"]
      });
      const sourceType = Number(actionRes?.tapIndex) === 0 ? ["camera"] : ["album"];

      const chooseRes = await wx.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType
      });
      const tempFilePath = chooseRes?.tempFiles?.[0]?.tempFilePath || "";
      if (!tempFilePath) {
        logger.debug("chat_detail_choose_image_end", { blocked: "empty_file" });
        return;
      }

      this.setData({ uploadingImage: true });
      toast.loading("图片上传中");
      const imageUrl = await chatService.uploadMessageImage(
        tempFilePath,
        this.buildImageCloudPath(tempFilePath)
      );
      await chatService.sendMessage(this.data.conversationId, imageUrl, MESSAGE_TYPE.IMAGE);
      await toast.hide();
      await this.loadMessages({ silent: true });
      await this.markAsRead({ silent: true });
    } catch (error) {
      await toast.hide();
      const message = error?.errMsg || error?.message || "";
      if (message.includes("cancel")) {
        logger.debug("chat_detail_choose_image_end", { blocked: "cancelled" });
        return;
      }
      logger.error("api_error", { func: "chat.sendImageMessage", err: message });
      await toast.error(message || "图片发送失败");
    } finally {
      this.setData({ uploadingImage: false });
      logger.debug("chat_detail_choose_image_end", {});
    }
  },

  onPreviewMessageImage(event) {
    logger.debug("chat_detail_preview_image_start", { data: event.currentTarget.dataset || {} });
    const url = String(event.currentTarget.dataset.url || "").trim();
    if (!url) {
      logger.debug("chat_detail_preview_image_end", { blocked: "empty_url" });
      return;
    }

    wx.previewImage({
      current: url,
      urls: [url]
    });
    logger.debug("chat_detail_preview_image_end", {});
  },

  async onSendTap() {
    logger.debug("chat_detail_send_start", {});
    if (this.data.sending || this.data.uploadingImage) {
      logger.debug("chat_detail_send_end", { blocked: "sending" });
      return;
    }
    const content = String(this.data.inputValue || "").trim();
    if (!content) {
      await toast.error("请输入消息内容");
      logger.debug("chat_detail_send_end", { blocked: "empty_content" });
      return;
    }
    if (!this.data.conversationId) {
      await toast.error("会话初始化失败");
      logger.debug("chat_detail_send_end", { blocked: "empty_conversation" });
      return;
    }

    this.setData({ sending: true });
    try {
      logger.debug("api_call", {
        func: "chat.sendMessage",
        params: { conversationId: this.data.conversationId }
      });
      await chatService.sendMessage(this.data.conversationId, content, MESSAGE_TYPE.TEXT);
      logger.debug("api_resp", { func: "chat.sendMessage", code: 0 });
      this.setData({
        inputValue: "",
        canSend: false
      });
      await this.loadMessages({ silent: true });
      await this.markAsRead({ silent: true });
    } catch (error) {
      logger.error("api_error", { func: "chat.sendMessage", err: error.message });
      await toast.error(error.message || "发送失败");
    } finally {
      this.setData({ sending: false });
      logger.debug("chat_detail_send_end", {});
    }
  }
});
