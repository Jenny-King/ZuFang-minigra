const authUtils = require("../../../utils/auth");
const supportService = require("../../../services/support.service");
const userStore = require("../../../store/user.store");
const { ROUTES, navigateTo } = require("../../../config/routes");
const { fallbackText } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");

const FAQ_LIST = [
  {
    id: "find-house",
    question: "如何快速找到合适的房源？",
    answer: "可以先在找房页按城市、区域、价格和户型筛选，再结合浏览历史和收藏功能集中比较。"
  },
  {
    id: "contact-landlord",
    question: "想联系房东应该怎么做？",
    answer: "进入房源详情页后点击联系房东，系统会自动创建聊天会话，后续可在消息页持续沟通。"
  },
  {
    id: "publish-house",
    question: "发布的房源在哪里修改？",
    answer: "底部发布页会展示你的房源列表，点进任意房源即可编辑；发布完成后也会回到该列表页。"
  },
  {
    id: "account-security",
    question: "账号、认证、密码这些入口在哪里？",
    answer: "在我的页进入设置，可以统一管理换绑手机号、修改密码、绑定微信、绑定邮箱和身份资料。"
  }
];

const FEEDBACK_CATEGORIES = [
  { value: "bug", label: "故障问题" },
  { value: "account", label: "账号问题" },
  { value: "listing", label: "房源问题" },
  { value: "suggestion", label: "产品建议" },
  { value: "other", label: "其他反馈" }
];

Page({
  data: {
    expandedFaqId: FAQ_LIST[0].id,
    faqList: FAQ_LIST,
    feedbackCategories: FEEDBACK_CATEGORIES,
    feedbackForm: {
      category: FEEDBACK_CATEGORIES[0].value,
      content: "",
      contact: ""
    },
    feedbackSubmitting: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/support-center", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("support_center_onload_end", { blocked: "not_login" });
      return;
    }
    this.syncDefaultContact();
    logger.info("support_center_onload_end", {});
  },

  onShow() {
    if (!authUtils.isLoggedIn()) {
      return;
    }
    this.syncDefaultContact();
  },

  syncDefaultContact() {
    const userInfo = userStore.getState().userInfo || {};
    const fallbackContact = String(userInfo.email || userInfo.phone || "").trim();
    const currentContact = String(this.data.feedbackForm?.contact || "").trim();

    if (!currentContact && fallbackContact) {
      this.setData({
        "feedbackForm.contact": fallbackContact
      });
    }
  },

  onFaqTap(event) {
    const faqId = String(event.currentTarget.dataset.faqId || "").trim();
    if (!faqId) {
      return;
    }

    this.setData({
      expandedFaqId: this.data.expandedFaqId === faqId ? "" : faqId
    });
  },

  onGoNotificationsTap() {
    navigateTo(ROUTES.PROFILE_NOTIFICATIONS);
  },

  onGoSettingsTap() {
    navigateTo(ROUTES.PROFILE_SETTINGS);
  },

  onGoChatTap() {
    wx.switchTab({ url: ROUTES.CHAT });
  },

  onContactTap() {
    logger.info("support_center_contact_tap", {});
  },

  onFeedbackCategoryTap(event) {
    const category = String(event.currentTarget.dataset.category || "").trim();
    if (!category) {
      return;
    }

    this.setData({
      "feedbackForm.category": category
    });
  },

  onFeedbackContentInput(event) {
    this.setData({
      "feedbackForm.content": event.detail.value || ""
    });
  },

  onFeedbackContactInput(event) {
    this.setData({
      "feedbackForm.contact": event.detail.value || ""
    });
  },

  async onSubmitFeedbackTap() {
    logger.info("support_center_submit_feedback_start", {});
    if (this.data.feedbackSubmitting) {
      logger.info("support_center_submit_feedback_end", { blocked: "submitting" });
      return;
    }

    const category = String(this.data.feedbackForm.category || "").trim();
    const content = String(this.data.feedbackForm.content || "").trim();
    const contact = String(this.data.feedbackForm.contact || "").trim();

    if (!category) {
      wx.showToast({ title: "请选择反馈类型", icon: "none" });
      logger.info("support_center_submit_feedback_end", { blocked: "empty_category" });
      return;
    }

    if (content.length < 5) {
      wx.showToast({ title: "反馈内容至少 5 个字", icon: "none" });
      logger.info("support_center_submit_feedback_end", { blocked: "short_content" });
      return;
    }

    this.setData({ feedbackSubmitting: true });
    try {
      await supportService.submitFeedback({
        category,
        content,
        contact
      });
      this.setData({
        feedbackSubmitting: false,
        "feedbackForm.category": FEEDBACK_CATEGORIES[0].value,
        "feedbackForm.content": "",
        "feedbackForm.contact": contact
      });
      wx.showToast({ title: "反馈已提交", icon: "success" });
    } catch (error) {
      logger.error("support_center_submit_feedback_failed", { error: error.message });
      wx.showToast({ title: error.message || "反馈提交失败", icon: "none" });
    } finally {
      this.setData({ feedbackSubmitting: false });
      logger.info("support_center_submit_feedback_end", {});
    }
  },

  onManualSupportTap() {
    wx.showModal({
      title: "人工客服说明",
      content: "当前页面已接入微信原生客服会话按钮。若点击后未进入人工客服，请先在微信公众平台为小程序配置客服接待人员，并开启客服能力。",
      showCancel: false,
      confirmText: "我知道了",
      confirmColor: "#2f64f5"
    });
  }
});
