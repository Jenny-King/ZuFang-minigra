const authService = require("../../../services/auth.service");
const userStore = require("../../../store/user.store");
const { ROUTES, redirectTo, switchTab } = require("../../../config/routes");
const { isPhone, isNonEmptyString } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

const LOGIN_MODE = {
  CODE: "code",
  PASSWORD: "password"
};

Page({
  data: {
    mode: LOGIN_MODE.CODE,
    phone: "",
    code: "",
    password: "",
    sendingCode: false,
    submitLoading: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "auth/login", query: options || {} });
    logger.info("auth_login_onload_end", {});
  },

  onModeChange(event) {
    logger.info("auth_login_mode_change_start", { data: event.currentTarget.dataset || {} });
    const mode = event.currentTarget.dataset.mode;
    if (!Object.values(LOGIN_MODE).includes(mode)) {
      logger.warn("auth_login_mode_change_invalid", { mode });
      return;
    }
    this.setData({ mode });
    logger.info("auth_login_mode_change_end", { mode });
  },

  onInputPhone(event) {
    logger.debug("auth_login_input_phone_start", {});
    this.setData({ phone: event.detail.value || "" });
    logger.debug("auth_login_input_phone_end", {});
  },

  onInputCode(event) {
    logger.debug("auth_login_input_code_start", {});
    this.setData({ code: event.detail.value || "" });
    logger.debug("auth_login_input_code_end", {});
  },

  onInputPassword(event) {
    logger.debug("auth_login_input_password_start", {});
    this.setData({ password: event.detail.value || "" });
    logger.debug("auth_login_input_password_end", {});
  },

  async onWechatLoginTap() {
    logger.info("auth_login_wechat_start", {});
    if (this.data.submitLoading) {
      logger.info("auth_login_wechat_end", { blocked: "submit_loading" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      const loginRes = await wx.login();
      const userProfile = await wx.getUserProfile({
        desc: "用于完善账号资料与头像展示"
      });

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
      wx.showToast({ title: "登录成功", icon: "success" });
      switchTab(ROUTES.HOME);
    } catch (error) {
      logger.error("api_error", { func: "auth.wechatLogin", err: error.message });
      wx.showToast({ title: error.message || "微信登录失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
      logger.info("auth_login_wechat_end", {});
    }
  },

  async onSendCodeTap() {
    logger.info("auth_login_send_code_start", {});
    if (this.data.sendingCode) {
      logger.info("auth_login_send_code_end", { blocked: "sending" });
      return;
    }
    const phone = String(this.data.phone || "").trim();
    if (!isPhone(phone)) {
      wx.showToast({ title: "手机号格式错误", icon: "none" });
      logger.info("auth_login_send_code_end", { blocked: "invalid_phone" });
      return;
    }

    this.setData({ sendingCode: true });
    try {
      logger.info("api_call", { func: "auth.sendSmsCode", params: { phone } });
      await authService.sendSmsCode(phone);
      logger.info("api_resp", { func: "auth.sendSmsCode", code: 0 });
      wx.showToast({ title: "验证码已发送", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.sendSmsCode", err: error.message });
      wx.showToast({ title: error.message || "发送失败", icon: "none" });
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

    const phone = String(this.data.phone || "").trim();
    if (!isPhone(phone)) {
      wx.showToast({ title: "手机号格式错误", icon: "none" });
      logger.info("auth_login_submit_end", { blocked: "invalid_phone" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      let session = null;
      if (this.data.mode === LOGIN_MODE.CODE) {
        const code = String(this.data.code || "").trim();
        if (!isNonEmptyString(code)) {
          wx.showToast({ title: "请输入验证码", icon: "none" });
          logger.info("auth_login_submit_end", { blocked: "empty_code" });
          return;
        }
        logger.info("api_call", { func: "auth.loginWithPhoneCode", params: { phone } });
        session = await authService.loginWithPhoneCode(phone, code);
        logger.info("api_resp", { func: "auth.loginWithPhoneCode", code: 0 });
      } else {
        const password = this.data.password || "";
        if (!isNonEmptyString(password)) {
          wx.showToast({ title: "请输入密码", icon: "none" });
          logger.info("auth_login_submit_end", { blocked: "empty_password" });
          return;
        }
        logger.info("api_call", { func: "auth.loginWithPassword", params: { phone } });
        session = await authService.loginWithPassword(phone, password);
        logger.info("api_resp", { func: "auth.loginWithPassword", code: 0 });
      }

      userStore.setSession(session);
      wx.showToast({ title: "登录成功", icon: "success" });
      switchTab(ROUTES.HOME);
    } catch (error) {
      const funcName = this.data.mode === LOGIN_MODE.CODE
        ? "auth.loginWithPhoneCode"
        : "auth.loginWithPassword";
      logger.error("api_error", { func: funcName, err: error.message });
      wx.showToast({ title: error.message || "登录失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
      logger.info("auth_login_submit_end", {});
    }
  },

  onGoRegisterTap() {
    logger.info("auth_login_go_register_start", {});
    redirectTo(ROUTES.AUTH_REGISTER);
    logger.info("auth_login_go_register_end", {});
  }
});
