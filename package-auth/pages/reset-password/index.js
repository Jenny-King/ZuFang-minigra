const authService = require("../../../services/auth.service");
const { redirectTo } = require("../../../config/routes");
const { ROUTES } = require("../../../config/routes");
const { isPhone, isPassword } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

Page({
  data: {
    phone: "",
    code: "",
    newPassword: "",
    cdSecs: 0,
    cdRunning: false,
    sendingCode: false,
    submitLoading: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "auth/reset-password", query: options || {} });
    logger.info("auth_reset_password_onload_end", {});
  },

  onUnload() {
    this.clearCountdown();
  },

  onPhoneInput(event) {
    this.setData({ phone: event.detail.value || "" });
  },

  onCodeInput(event) {
    this.setData({ code: event.detail.value || "" });
  },

  onPasswordInput(event) {
    this.setData({ newPassword: event.detail.value || "" });
  },

  async onSendCodeTap() {
    if (this.data.sendingCode || this.data.cdRunning) {
      return;
    }

    const phone = String(this.data.phone || "").trim();
    if (!isPhone(phone)) {
      wx.showToast({ title: "手机号格式错误", icon: "none" });
      return;
    }

    this.setData({ sendingCode: true });
    try {
      await authService.sendSmsCode(phone);
      this.startCountdown();
      wx.showToast({ title: "验证码已发送", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.sendSmsCode", err: error.message });
      wx.showToast({ title: error.message || "发送失败", icon: "none" });
    } finally {
      this.setData({ sendingCode: false });
    }
  },

  async onSubmitTap() {
    if (this.data.submitLoading) {
      return;
    }

    const phone = String(this.data.phone || "").trim();
    const code = String(this.data.code || "").trim();
    const newPassword = this.data.newPassword || "";

    if (!isPhone(phone)) {
      wx.showToast({ title: "手机号格式错误", icon: "none" });
      return;
    }

    if (!code) {
      wx.showToast({ title: "请输入验证码", icon: "none" });
      return;
    }

    if (!isPassword(newPassword)) {
      wx.showToast({ title: "密码需6-20位且至少包含字母和数字", icon: "none" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      await authService.resetPassword(phone, code, newPassword);
      wx.showToast({ title: "密码已重置", icon: "success" });
      setTimeout(() => {
        redirectTo(ROUTES.AUTH_LOGIN);
      }, 500);
    } catch (error) {
      logger.error("api_error", { func: "auth.resetPassword", err: error.message });
      wx.showToast({ title: error.message || "重置失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
    }
  },

  startCountdown() {
    this.clearCountdown();
    this.setData({ cdSecs: 60, cdRunning: true });
    this._cdTimer = setInterval(() => {
      const nextSecs = this.data.cdSecs - 1;
      if (nextSecs <= 0) {
        this.clearCountdown();
        this.setData({ cdSecs: 0, cdRunning: false });
        return;
      }

      this.setData({ cdSecs: nextSecs });
    }, 1000);
  },

  clearCountdown() {
    if (this._cdTimer) {
      clearInterval(this._cdTimer);
      this._cdTimer = null;
    }
  }
});
