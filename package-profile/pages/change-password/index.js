const settingsService = require("../../../services/settings.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { ROUTES, reLaunch } = require("../../../config/routes");
const { isStrongPassword } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const STRONG_PASSWORD_TIP = "密码需 8-20 位，且同时包含字母、数字和特殊字符";

function getErrorMessage(error, fallbackMessage) {
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  if (error && typeof error.message === "string" && error.message.trim()) {
    return error.message.trim();
  }

  if (error && typeof error.errMsg === "string" && error.errMsg.trim()) {
    return error.errMsg.trim();
  }

  return fallbackMessage;
}

Page({
  data: {
    verifyingOldPassword: false,
    oldPasswordVerified: false,
    submitLoading: false,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    passwordRuleText: STRONG_PASSWORD_TIP
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/change-password", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("change_password_onload_end", { blocked: "not_login" });
      return;
    }

    logger.debug("change_password_onload_end", {});
  },

  onOldPasswordInput(event) {
    const nextOldPassword = event.detail.value || "";
    const hasChanged = nextOldPassword !== this.data.oldPassword;

    this.setData({
      oldPassword: nextOldPassword,
      oldPasswordVerified: hasChanged ? false : this.data.oldPasswordVerified,
      newPassword: hasChanged ? "" : this.data.newPassword,
      confirmPassword: hasChanged ? "" : this.data.confirmPassword
    });
  },

  onNewPasswordInput(event) {
    this.setData({ newPassword: event.detail.value || "" });
  },

  onConfirmPasswordInput(event) {
    this.setData({ confirmPassword: event.detail.value || "" });
  },

  async onVerifyOldPasswordTap() {
    if (this.data.verifyingOldPassword) {
      return;
    }

    const oldPassword = String(this.data.oldPassword || "");
    if (!oldPassword.trim()) {
      await toast.error("请输入当前密码");
      return;
    }

    this.setData({ verifyingOldPassword: true });
    try {
      await settingsService.verifyPassword(oldPassword);
      this.setData({
        verifyingOldPassword: false,
        oldPasswordVerified: true
      });
      toast.success("当前密码验证通过");
    } catch (error) {
      logger.error("change_password_verify_old_failed", {
        error: getErrorMessage(error, "当前密码验证失败")
      });
      this.setData({
        verifyingOldPassword: false,
        oldPasswordVerified: false
      });
      await toast.error(getErrorMessage(error, "当前密码验证失败"));
    }
  },

  async onSubmitTap() {
    if (this.data.submitLoading) {
      return;
    }

    const oldPassword = String(this.data.oldPassword || "");
    const newPassword = String(this.data.newPassword || "");
    const confirmPassword = String(this.data.confirmPassword || "");

    if (!oldPassword.trim()) {
      await toast.error("请输入当前密码");
      return;
    }

    if (!this.data.oldPasswordVerified) {
      await toast.error("请先验证当前密码");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      await toast.error(STRONG_PASSWORD_TIP);
      return;
    }

    if (newPassword === oldPassword) {
      await toast.error("新密码不能与当前密码相同");
      return;
    }

    if (!confirmPassword) {
      await toast.error("请再次输入新密码");
      return;
    }

    if (newPassword !== confirmPassword) {
      await toast.error("两次输入的新密码不一致");
      return;
    }

    this.setData({ submitLoading: true });
    try {
      await settingsService.changePassword(oldPassword, newPassword);
      userStore.clearUser();
      await toast.success("密码已更新，请重新登录");
      reLaunch(ROUTES.AUTH_LOGIN);
    } catch (error) {
      logger.error("change_password_submit_failed", {
        error: getErrorMessage(error, "密码修改失败")
      });
      await toast.error(getErrorMessage(error, "密码修改失败"));
    } finally {
      this.setData({ submitLoading: false });
    }
  }
});
