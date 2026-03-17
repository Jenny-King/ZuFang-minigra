const authService = require("../../../services/auth.service");
const userStore = require("../../../store/user.store");
const { ROUTES, redirectTo, switchTab } = require("../../../config/routes");
const { isPhone, isNonEmptyString } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");
const toast = require("../../../utils/toast");

const LOGIN_MODE = {
  CODE: "code",
  PASSWORD: "password"
};

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

function requestWechatLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    });
  });
}

function requestWechatUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: "用于完善账号资料与头像展示",
      success: resolve,
      fail: reject
    });
  });
}

Page({
  data: {
    mode: LOGIN_MODE.CODE,
    phone: "",
    code: "",
    password: "",
    showPwd: false,
    errors: {},
    cdSecs: 0,
    cdRunning: false,
    sendingCode: false,
    submitLoading: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "auth/login", query: options || {} });
    logger.info("auth_login_onload_end", {});
  },

  onUnload() {
    this.clearCountdown();
  },

  onModeChange(event) {
    logger.info("auth_login_mode_change_start", { data: event.currentTarget.dataset || {} });
    const mode = event.currentTarget.dataset.mode;
    if (!Object.values(LOGIN_MODE).includes(mode)) {
      logger.warn("auth_login_mode_change_invalid", { mode });
      return;
    }
    this.setData({
      mode,
      errors: {}
    });
    logger.info("auth_login_mode_change_end", { mode });
  },

  onInputPhone(event) {
    logger.debug("auth_login_input_phone_start", {});
    this.setData({ phone: event.detail.value || "" });
    this.clearFieldError("phone");
    logger.debug("auth_login_input_phone_end", {});
  },

  onInputCode(event) {
    logger.debug("auth_login_input_code_start", {});
    this.setData({ code: event.detail.value || "" });
    this.clearFieldError("code");
    logger.debug("auth_login_input_code_end", {});
  },

  onInputPassword(event) {
    logger.debug("auth_login_input_password_start", {});
    this.setData({ password: event.detail.value || "" });
    this.clearFieldError("password");
    logger.debug("auth_login_input_password_end", {});
  },

  onTogglePassword() {
    this.setData({
      showPwd: !this.data.showPwd
    });
  },

  async onWechatLoginTap() {
    logger.info("auth_login_wechat_start", {});
    if (this.data.submitLoading) {
      logger.info("auth_login_wechat_end", { blocked: "submit_loading" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      const userProfile = await requestWechatUserProfile();
      const loginRes = await requestWechatLoginCode();
      if (!loginRes || !loginRes.code) {
        throw new Error("微信登录凭证获取失败");
      }

      logger.info("api_call", {
        func: "auth.wechatLogin",
        params: { hasCode: Boolean(loginRes.code) }
      });

      const session = await authService.wechatLogin({
        ...(userProfile.userInfo || {}),
        code: loginRes.code || ""
      });
      logger.info("api_resp", { func: "auth.wechatLogin", code: 0 });

      userStore.setSession(session);
      await toast.success("登录成功");
      switchTab(ROUTES.HOME);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "微信登录失败");
      logger.error("api_error", { func: "auth.wechatLogin", err: errorMessage });
      await toast.error(errorMessage);
    } finally {
      this.setData({ submitLoading: false });
      logger.info("auth_login_wechat_end", {});
    }
  },

  async onSendCodeTap() {
    logger.info("auth_login_send_code_start", {});
    if (this.data.sendingCode || this.data.cdRunning) {
      logger.info("auth_login_send_code_end", { blocked: this.data.cdRunning ? "countdown" : "sending" });
      return;
    }
    const phone = String(this.data.phone || "").trim();
    if (!isPhone(phone)) {
      this.setData({
        errors: {
          ...this.data.errors,
          phone: "请输入正确的手机号"
        }
      });
      await toast.error("手机号格式错误");
      logger.info("auth_login_send_code_end", { blocked: "invalid_phone" });
      return;
    }

    this.setData({ sendingCode: true });
    try {
      logger.info("api_call", { func: "auth.sendSmsCode", params: { phone } });
      await authService.sendSmsCode(phone);
      logger.info("api_resp", { func: "auth.sendSmsCode", code: 0 });
      this.startCountdown();
      await toast.success("验证码已发送");
    } catch (error) {
      logger.error("api_error", { func: "auth.sendSmsCode", err: error.message });
      await toast.error(error.message || "发送失败");
    } finally {
      this.setData({ sendingCode: false });
      logger.info("auth_login_send_code_end", {});
    }
  },

  async onSubmitTap() {
    logger.info("auth_login_submit_start", { mode: this.data.mode });
    if (this.data.submitLoading) {
      logger.info("auth_login_submit_end", { blocked: "loading" });
      return;
    }

    const errors = this.validateForm();
    if (Object.keys(errors).length) {
      this.setData({ errors });
      await toast.error(Object.values(errors)[0]);
      logger.info("auth_login_submit_end", { blocked: "invalid_form" });
      return;
    }

    const phone = String(this.data.phone || "").trim();

    this.setData({ submitLoading: true });
    try {
      let session = null;
      if (this.data.mode === LOGIN_MODE.CODE) {
        const code = String(this.data.code || "").trim();
        logger.info("api_call", { func: "auth.loginWithPhoneCode", params: { phone } });
        session = await authService.loginWithPhoneCode(phone, code);
        logger.info("api_resp", { func: "auth.loginWithPhoneCode", code: 0 });
      } else {
        const password = this.data.password || "";
        logger.info("api_call", { func: "auth.loginWithPassword", params: { phone } });
        session = await authService.loginWithPassword(phone, password);
        logger.info("api_resp", { func: "auth.loginWithPassword", code: 0 });
      }

      userStore.setSession(session);
      await toast.success("登录成功");
      switchTab(ROUTES.HOME);
    } catch (error) {
      const funcName = this.data.mode === LOGIN_MODE.CODE
        ? "auth.loginWithPhoneCode"
        : "auth.loginWithPassword";
      logger.error("api_error", { func: funcName, err: error.message });
      await toast.error(error.message || "登录失败");
    } finally {
      this.setData({ submitLoading: false });
      logger.info("auth_login_submit_end", {});
    }
  },

  onGoRegisterTap() {
    logger.info("auth_login_go_register_start", {});
    redirectTo(ROUTES.AUTH_REGISTER);
    logger.info("auth_login_go_register_end", {});
  },

  onGoResetPasswordTap() {
    logger.info("auth_login_go_reset_password_start", {});
    redirectTo(ROUTES.AUTH_RESET_PASSWORD);
    logger.info("auth_login_go_reset_password_end", {});
  },

  startCountdown() {
    this.clearCountdown();
    this.setData({ cdSecs: 60, cdRunning: true });
    this._cdTimer = setInterval(() => {
      const s = this.data.cdSecs - 1;
      if (s <= 0) {
        this.clearCountdown();
        this.setData({ cdSecs: 0, cdRunning: false });
      } else {
        this.setData({ cdSecs: s });
      }
    }, 1000);
  },

  clearCountdown() {
    if (this._cdTimer) {
      clearInterval(this._cdTimer);
      this._cdTimer = null;
    }
  },

  clearFieldError(field) {
    if (!this.data.errors[field]) {
      return;
    }

    const nextErrors = {
      ...this.data.errors
    };
    delete nextErrors[field];
    this.setData({ errors: nextErrors });
  },

  validateForm() {
    const phone = String(this.data.phone || "").trim();
    const code = String(this.data.code || "").trim();
    const password = String(this.data.password || "");
    const errors = {};

    if (!isPhone(phone)) {
      errors.phone = "请输入正确的手机号";
    }

    if (this.data.mode === LOGIN_MODE.CODE) {
      if (!isNonEmptyString(code) || code.length < 4) {
        errors.code = "请输入正确的验证码";
      }
    }

    if (this.data.mode === LOGIN_MODE.PASSWORD) {
      if (!isNonEmptyString(password) || password.length < 6) {
        errors.password = "密码至少 6 位";
      }
    }

    return errors;
  }
});
