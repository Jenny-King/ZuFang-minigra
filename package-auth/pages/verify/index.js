const authService = require("../../../services/auth.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { isNonEmptyString, isIdCard } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

Page({
  data: {
    submitLoading: false,
    userInfo: null,
    formData: {
      realName: "",
      idCard: ""
    }
  },

  async onLoad(options) {
    logger.info("page_load", { page: "auth/verify", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("auth_verify_onload_end", { blocked: "not_login" });
      return;
    }
    await this.loadCurrentUser();
    logger.info("auth_verify_onload_end", {});
  },

  async loadCurrentUser() {
    logger.info("auth_verify_load_user_start", {});
    try {
      logger.info("api_call", { func: "user.getCurrentUser", params: {} });
      const userInfo = await userStore.refreshCurrentUser();
      logger.info("api_resp", { func: "user.getCurrentUser", code: 0 });
      this.setData({ userInfo: userInfo || null });
    } catch (error) {
      logger.error("api_error", { func: "user.getCurrentUser", err: error.message });
      wx.showToast({ title: error.message || "用户信息加载失败", icon: "none" });
    } finally {
      logger.info("auth_verify_load_user_end", {});
    }
  },

  onInputChange(event) {
    logger.debug("auth_verify_input_start", {});
    const field = event.currentTarget.dataset.field;
    const value = event.detail.value || "";
    if (!field) {
      logger.warn("auth_verify_input_no_field", {});
      return;
    }
    this.setData({ [`formData.${field}`]: value });
    logger.debug("auth_verify_input_end", { field });
  },

  async onSubmitTap() {
    logger.info("auth_verify_submit_start", {});
    if (this.data.submitLoading) {
      logger.info("auth_verify_submit_end", { blocked: "loading" });
      return;
    }

    const realName = String(this.data.formData.realName || "").trim();
    const idCard = String(this.data.formData.idCard || "").trim();

    if (!isNonEmptyString(realName)) {
      wx.showToast({ title: "请输入真实姓名", icon: "none" });
      logger.info("auth_verify_submit_end", { blocked: "empty_realname" });
      return;
    }
    if (!isIdCard(idCard)) {
      wx.showToast({ title: "身份证号格式错误", icon: "none" });
      logger.info("auth_verify_submit_end", { blocked: "invalid_idcard" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      logger.info("api_call", { func: "auth.verifyIdentity", params: { realName } });
      const verifyResult = await authService.verifyIdentity(realName, idCard);
      logger.info("api_resp", { func: "auth.verifyIdentity", code: 0 });

      let nextUser = this.data.userInfo || {};
      if (verifyResult && verifyResult.userInfo) {
        nextUser = verifyResult.userInfo;
      } else {
        logger.info("api_call", { func: "user.getCurrentUser", params: {} });
        nextUser = await userStore.refreshCurrentUser();
        logger.info("api_resp", { func: "user.getCurrentUser", code: 0 });
      }

      userStore.setUserInfo(nextUser);
      this.setData({ userInfo: nextUser });
      wx.showToast({ title: "认证成功", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.verifyIdentity", err: error.message });
      wx.showToast({ title: error.message || "认证失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
      logger.info("auth_verify_submit_end", {});
    }
  }
});
