const authService = require("../../../services/auth.service");
const { redirectTo, navigateBack } = require("../../../config/routes");
const { ROUTES } = require("../../../config/routes");
const { isPhone, isPassword } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

Page({
  data: {
    phone: "",
    code: "",
    newPassword: "",
    confirmPassword: "",

    showPassword: false,
    showConfirmPassword: false,

    phoneError: "",
    codeError: "",
    passwordError: "",
    confirmPasswordError: "",

    passwordStrength: 0,
    passwordStrengthText: "未设置",

    isFormValid: false,

    cdSecs: 0,
    cdRunning: false,
    sendingCode: false,
    submitLoading: false,
    submitSuccess: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "auth/reset-password", query: options || {} });
  },

  onUnload() {
    this.clearCountdown();
  },

  onBackTap() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({ delta: 1 });
    } else {
      redirectTo(ROUTES.AUTH_LOGIN);
    }
  },

  onToggleEye(e) {
    const target = e.currentTarget.dataset.target;
    if (target === 'password') {
      this.setData({ showPassword: !this.data.showPassword });
    } else {
      this.setData({ showConfirmPassword: !this.data.showConfirmPassword });
    }
  },

  checkFormValid() {
    const { phone, code, newPassword, confirmPassword } = this.data;
    const ok = 
      isPhone(phone) && 
      /^\d{6}$/.test(code) && 
      isPassword(newPassword) && 
      confirmPassword === newPassword;
    this.setData({ isFormValid: ok });
  },

  onPhoneInput(e) {
    let val = e.detail.value.replace(/\D/g, "").slice(0, 11);
    this.setData({ phone: val });

    let err = "";
    if (!val) err = "请输入手机号";
    else if (!isPhone(val)) err = "请输入正确的手机号";
    
    this.setData({ phoneError: err });
    this.checkFormValid();
    return val;
  },

  onCodeInput(e) {
    let val = e.detail.value.replace(/\D/g, "").slice(0, 6);
    this.setData({ code: val });

    let err = "";
    if (!val) err = "请输入验证码";
    else if (!/^\d{6}$/.test(val)) err = "验证码应为 6 位数字";

    this.setData({ codeError: err });
    this.checkFormValid();
    return val;
  },

  getPasswordStrength(value) {
    if (!value) return 0;
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Za-z]/.test(value) && /\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value) || (/[A-Z]/.test(value) && /[a-z]/.test(value))) score++;
    return Math.min(score, 3);
  },

  onPasswordInput(e) {
    let val = e.detail.value;
    this.setData({ newPassword: val });

    let err = "";
    if (!val) err = "请输入新密码";
    else if (!isPassword(val)) err = "密码需为 8-20 位，并包含字母和数字";
    
    const strength = this.getPasswordStrength(val);
    const textMap = ["未设置", "弱", "中", "强"];

    let confirmErr = this.data.confirmPasswordError;
    if (this.data.confirmPassword) {
      if (val !== this.data.confirmPassword) {
         confirmErr = "两次输入的密码不一致";
      } else {
         confirmErr = "";
      }
    }

    this.setData({ 
      passwordError: err,
      passwordStrength: strength,
      passwordStrengthText: textMap[strength],
      confirmPasswordError: confirmErr
    });

    this.checkFormValid();
  },

  onConfirmPasswordInput(e) {
    let val = e.detail.value;
    this.setData({ confirmPassword: val });

    let err = "";
    if (!val) err = "请再次输入新密码";
    else if (val !== this.data.newPassword) err = "两次输入的密码不一致";

    this.setData({ confirmPasswordError: err });
    this.checkFormValid();
  },

  async onSendCodeTap() {
    if (this.data.sendingCode || this.data.cdRunning) return;

    const phone = this.data.phone;
    let err = "";
    if (!phone) err = "请输入手机号";
    else if (!isPhone(phone)) err = "请输入正确的手机号";

    if (err) {
      this.setData({ phoneError: err });
      return;
    }

    this.setData({ sendingCode: true });
    try {
      await authService.sendSmsCode(phone);
      this.startCountdown();
      wx.showToast({ title: "验证码已发送", icon: "success" });
    } catch (error) {
      wx.showToast({ title: error.message || "发送失败", icon: "none" });
    } finally {
      this.setData({ sendingCode: false });
    }
  },

  async onSubmitTap() {
    if (this.data.submitLoading || !this.data.isFormValid) return;

    this.setData({ submitLoading: true });
    try {
      await authService.resetPassword(this.data.phone, this.data.code, this.data.newPassword);
      this.setData({ submitSuccess: true });
      setTimeout(() => {
        redirectTo(ROUTES.AUTH_LOGIN);
      }, 1200);
    } catch (error) {
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
