const authService = require("../../../services/auth.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { isNonEmptyString, isIdCard } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

function normalizeIdentityInfo(userInfo) {
  if (!userInfo) {
    return null;
  }

  let displayIdentityStatus = "未提交";
  let displayIdentityStatusClass = "pending";
  let displayIdentityHint = "当前版本仅登记身份资料，提交后需人工审核。";

  if (userInfo.verified) {
    displayIdentityStatus = "已审核通过";
    displayIdentityStatusClass = "ok";
    displayIdentityHint = "当前账号的身份资料已审核通过。";
  } else if (userInfo.identityStatus === "pending") {
    displayIdentityStatus = "待审核";
    displayIdentityStatusClass = "pending";
    displayIdentityHint = "资料已提交，待人工审核完成后才会变更认证状态。";
  }

  return {
    ...userInfo,
    displayIdentityStatus,
    displayIdentityStatusClass,
    displayIdentityHint
  };
}

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
      logger.debug("auth_verify_onload_end", { blocked: "not_login" });
      return;
    }
    await this.loadCurrentUser();
    logger.debug("auth_verify_onload_end", {});
  },

  async loadCurrentUser() {
    logger.debug("auth_verify_load_user_start", {});
    try {
      logger.debug("api_call", { func: "user.getCurrentUser", params: {} });
      const userInfo = await userStore.refreshCurrentUser();
      logger.debug("api_resp", { func: "user.getCurrentUser", code: 0 });
      this.setData({ userInfo: normalizeIdentityInfo(userInfo) });
    } catch (error) {
      logger.error("api_error", { func: "user.getCurrentUser", err: error.message });
      wx.showToast({ title: error.message || "用户信息加载失败", icon: "none" });
    } finally {
      logger.debug("auth_verify_load_user_end", {});
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
    logger.debug("auth_verify_submit_start", {});
    if (this.data.submitLoading) {
      logger.debug("auth_verify_submit_end", { blocked: "loading" });
      return;
    }

    const realName = String(this.data.formData.realName || "").trim();
    const idCard = String(this.data.formData.idCard || "").trim();

    if (!isNonEmptyString(realName)) {
      wx.showToast({ title: "请输入真实姓名", icon: "none" });
      logger.debug("auth_verify_submit_end", { blocked: "empty_realname" });
      return;
    }
    if (!isIdCard(idCard)) {
      wx.showToast({ title: "身份证号格式错误", icon: "none" });
      logger.debug("auth_verify_submit_end", { blocked: "invalid_idcard" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      logger.debug("api_call", { func: "auth.submitIdentityProfile", params: { realName } });
      const verifyResult = await authService.submitIdentityProfile(realName, idCard);
      logger.debug("api_resp", { func: "auth.submitIdentityProfile", code: 0 });

      let nextUser = this.data.userInfo || {};
      if (verifyResult && verifyResult.userInfo) {
        nextUser = verifyResult.userInfo;
      } else {
        logger.debug("api_call", { func: "user.getCurrentUser", params: {} });
        nextUser = await userStore.refreshCurrentUser();
        logger.debug("api_resp", { func: "user.getCurrentUser", code: 0 });
      }

      userStore.setUserInfo(nextUser);
      this.setData({ userInfo: normalizeIdentityInfo(nextUser) });
      wx.showToast({ title: "资料已提交", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.submitIdentityProfile", err: error.message });
      wx.showToast({ title: error.message || "提交失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
      logger.debug("auth_verify_submit_end", {});
    }
  }
});
