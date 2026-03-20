const settingsService = require("../../../services/settings.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { maskPhone } = require("../../../utils/format");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");
const {
  getPhoneEntryMeta,
  validatePhoneChangeValue,
  validateSmsCodeValue
} = require("../settings/phone.helper");

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
    loading: false,
    sendingCode: false,
    submitLoading: false,
    cdSecs: 0,
    cdRunning: false,
    phone: "",
    code: "",
    phoneEntryMeta: getPhoneEntryMeta(),
    currentPhoneText: "未绑定手机号"
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/change-phone", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("change_phone_onload_end", { blocked: "not_login" });
      return;
    }

    this.syncPageState();
    logger.debug("change_phone_onload_end", {});
  },

  onUnload() {
    this.clearCountdown();
  },

  syncPageState() {
    const state = userStore.getState();
    const userInfo = state.userInfo || {};
    const phoneEntryMeta = getPhoneEntryMeta(userInfo);

    wx.setNavigationBarTitle({
      title: phoneEntryMeta.actionText
    });

    this.setData({
      phoneEntryMeta,
      currentPhoneText: userInfo.phone ? maskPhone(String(userInfo.phone)) : "未绑定手机号"
    });
  },

  onPhoneInput(event) {
    this.setData({ phone: event.detail.value || "" });
  },

  onCodeInput(event) {
    this.setData({ code: event.detail.value || "" });
  },

  async onSendCodeTap() {
    if (this.data.sendingCode || this.data.cdRunning) {
      return;
    }

    const validation = validatePhoneChangeValue(
      this.data.phone,
      this.data.phoneEntryMeta.currentPhone
    );
    if (!validation.valid) {
      await toast.error(validation.message);
      return;
    }

    this.setData({ sendingCode: true });
    try {
      await settingsService.sendSmsCode(validation.phone);
      this.startCountdown();
      await toast.success("验证码已发送");
    } catch (error) {
      logger.error("change_phone_send_code_failed", {
        error: getErrorMessage(error, "验证码发送失败")
      });
      await toast.error(getErrorMessage(error, "验证码发送失败"));
    } finally {
      this.setData({ sendingCode: false });
    }
  },

  async onSubmitTap() {
    if (this.data.submitLoading) {
      return;
    }

    const phoneValidation = validatePhoneChangeValue(
      this.data.phone,
      this.data.phoneEntryMeta.currentPhone
    );
    if (!phoneValidation.valid) {
      await toast.error(phoneValidation.message);
      return;
    }

    const codeValidation = validateSmsCodeValue(this.data.code);
    if (!codeValidation.valid) {
      await toast.error(codeValidation.message);
      return;
    }

    this.setData({ submitLoading: true });
    try {
      const nextUser = await settingsService.changePhone(
        phoneValidation.phone,
        codeValidation.code
      );
      userStore.setUserInfo(nextUser);
      this.syncPageState();
      await toast.success(this.data.phoneEntryMeta.successText);
      setTimeout(() => {
        wx.navigateBack({ delta: 1 });
      }, 300);
    } catch (error) {
      logger.error("change_phone_submit_failed", {
        error: getErrorMessage(error, "手机号操作失败")
      });
      await toast.error(getErrorMessage(error, "手机号操作失败"));
    } finally {
      this.setData({ submitLoading: false });
    }
  },

  startCountdown() {
    this.clearCountdown();
    this.setData({ cdSecs: 60, cdRunning: true });
    this._cdTimer = setInterval(() => {
      const nextSeconds = Number(this.data.cdSecs || 0) - 1;
      if (nextSeconds <= 0) {
        this.clearCountdown();
        this.setData({ cdSecs: 0, cdRunning: false });
        return;
      }

      this.setData({ cdSecs: nextSeconds });
    }, 1000);
  },

  clearCountdown() {
    if (this._cdTimer) {
      clearInterval(this._cdTimer);
      this._cdTimer = null;
    }
  }
});
