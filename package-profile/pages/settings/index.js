const settingsService = require("../../../services/settings.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { ROUTES, navigateTo, switchTab } = require("../../../config/routes");
const { maskPhone, fallbackText } = require("../../../utils/format");
const { isPhone, isEmail } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

function formatIdentityStatus(userInfo = {}) {
  if (userInfo.verified) {
    return "已审核通过";
  }

  if (userInfo.identityStatus === "pending") {
    return "资料已提交，待人工审核";
  }

  return "未提交身份资料";
}

function normalizeUser(userInfo = null) {
  if (!userInfo) {
    return null;
  }

  return {
    ...userInfo,
    displayName: fallbackText(userInfo.nickName, "未设置昵称"),
    displayPhone: userInfo.phone ? maskPhone(String(userInfo.phone)) : "未绑定手机号",
    displayEmail: userInfo.email ? String(userInfo.email) : "未绑定邮箱",
    displayWechatStatus: userInfo.wechatBound ? "已绑定，可直接微信登录" : "未绑定，建议尽快绑定",
    displayIdentityStatus: formatIdentityStatus(userInfo)
  };
}

Page({
  data: {
    loading: false,
    userInfo: null,
    preferences: settingsService.getSettingsPreferences()
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/settings", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("settings_onload_end", { blocked: "not_login" });
      return;
    }
    this.syncPageState();
    logger.info("settings_onload_end", {});
  },

  async onShow() {
    if (!authUtils.isLoggedIn()) {
      return;
    }
    this.syncPageState();
    await this.refreshCurrentUser();
  },

  syncPageState() {
    const state = userStore.getState();
    this.setData({
      userInfo: normalizeUser(state.userInfo),
      preferences: settingsService.getSettingsPreferences()
    });
  },

  async refreshCurrentUser() {
    this.setData({ loading: true });
    try {
      await userStore.refreshCurrentUser();
      this.syncPageState();
    } catch (error) {
      logger.error("settings_refresh_user_failed", { error: error.message });
      this.syncPageState();
      wx.showToast({ title: error.message || "用户信息刷新失败", icon: "none" });
    } finally {
      this.setData({ loading: false });
    }
  },

  updatePreferences(patch = {}) {
    const nextPreferences = settingsService.saveSettingsPreferences({
      ...this.data.preferences,
      ...patch,
      notification: {
        ...(this.data.preferences?.notification || {}),
        ...(patch.notification || {})
      },
      privacy: {
        ...(this.data.preferences?.privacy || {}),
        ...(patch.privacy || {})
      }
    });

    this.setData({ preferences: nextPreferences });
    return nextPreferences;
  },

  onNotificationToggle(event) {
    const field = String(event.currentTarget.dataset.field || "").trim();
    if (!field) {
      return;
    }

    this.updatePreferences({
      notification: {
        [field]: Boolean(event.detail.value)
      }
    });
  },

  onPrivacyToggle(event) {
    const field = String(event.currentTarget.dataset.field || "").trim();
    if (!field) {
      return;
    }

    this.updatePreferences({
      privacy: {
        [field]: Boolean(event.detail.value)
      }
    });
  },

  async onChangePhoneTap() {
    logger.info("settings_change_phone_start", {});
    try {
      const phoneRes = await wx.showModal({
        title: "换绑手机号",
        editable: true,
        placeholderText: "请输入新的手机号",
        content: "",
        confirmText: "发送验证码",
        confirmColor: "#2f64f5"
      });

      if (!phoneRes.confirm) {
        logger.info("settings_change_phone_end", { blocked: "cancelled_phone" });
        return;
      }

      const phone = String(phoneRes.content || "").trim();
      if (!isPhone(phone)) {
        wx.showToast({ title: "手机号格式错误", icon: "none" });
        logger.info("settings_change_phone_end", { blocked: "invalid_phone" });
        return;
      }

      await settingsService.sendSmsCode(phone);

      const codeRes = await wx.showModal({
        title: "换绑手机号",
        editable: true,
        placeholderText: "请输入收到的验证码",
        content: "",
        confirmText: "确认换绑",
        confirmColor: "#2f64f5"
      });

      if (!codeRes.confirm) {
        logger.info("settings_change_phone_end", { blocked: "cancelled_code" });
        return;
      }

      const code = String(codeRes.content || "").trim();
      if (!code) {
        wx.showToast({ title: "验证码不能为空", icon: "none" });
        logger.info("settings_change_phone_end", { blocked: "empty_code" });
        return;
      }

      const nextUser = await settingsService.changePhone(phone, code);
      userStore.setUserInfo(nextUser);
      this.syncPageState();
      wx.showToast({ title: "手机号已换绑", icon: "success" });
    } catch (error) {
      logger.error("settings_change_phone_failed", { error: error.message });
      wx.showToast({ title: error.message || "换绑手机号失败", icon: "none" });
    } finally {
      logger.info("settings_change_phone_end", {});
    }
  },

  async onChangePasswordTap() {
    logger.info("settings_change_password_start", {});
    try {
      const oldPasswordRes = await wx.showModal({
        title: "修改登录密码",
        editable: true,
        placeholderText: "请输入当前密码",
        content: "",
        confirmText: "下一步",
        confirmColor: "#2f64f5"
      });

      if (!oldPasswordRes.confirm) {
        logger.info("settings_change_password_end", { blocked: "cancelled_old" });
        return;
      }

      const oldPassword = String(oldPasswordRes.content || "").trim();
      if (!oldPassword) {
        wx.showToast({ title: "当前密码不能为空", icon: "none" });
        logger.info("settings_change_password_end", { blocked: "empty_old_password" });
        return;
      }

      const newPasswordRes = await wx.showModal({
        title: "修改登录密码",
        editable: true,
        placeholderText: "请输入新密码",
        content: "",
        confirmText: "保存",
        confirmColor: "#2f64f5"
      });

      if (!newPasswordRes.confirm) {
        logger.info("settings_change_password_end", { blocked: "cancelled_new" });
        return;
      }

      const newPassword = String(newPasswordRes.content || "").trim();
      if (!newPassword) {
        wx.showToast({ title: "新密码不能为空", icon: "none" });
        logger.info("settings_change_password_end", { blocked: "empty_new_password" });
        return;
      }

      await settingsService.changePassword(oldPassword, newPassword);
      wx.showToast({ title: "登录密码已更新", icon: "success" });
    } catch (error) {
      logger.error("settings_change_password_failed", { error: error.message });
      wx.showToast({ title: error.message || "修改密码失败", icon: "none" });
    } finally {
      logger.info("settings_change_password_end", {});
    }
  },

  async onWechatEntryTap() {
    logger.info("settings_wechat_entry_start", {});
    const isBound = Boolean(this.data.userInfo?.wechatBound);

    try {
      const result = isBound
        ? await settingsService.unbindWechat()
        : await settingsService.bindWechat();
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.syncPageState();
      wx.showToast({
        title: isBound ? "微信解绑成功" : "微信绑定成功",
        icon: "success"
      });
    } catch (error) {
      logger.error("settings_wechat_entry_failed", { error: error.message });
      wx.showToast({ title: error.message || "微信绑定状态更新失败", icon: "none" });
    } finally {
      logger.info("settings_wechat_entry_end", { isBound });
    }
  },

  async onBindEmailTap() {
    logger.info("settings_bind_email_start", {});
    try {
      const emailRes = await wx.showModal({
        title: this.data.userInfo?.email ? "修改邮箱" : "绑定邮箱",
        editable: true,
        placeholderText: "请输入邮箱地址",
        content: String(this.data.userInfo?.email || ""),
        confirmText: "保存",
        confirmColor: "#2f64f5"
      });

      if (!emailRes.confirm) {
        logger.info("settings_bind_email_end", { blocked: "cancelled" });
        return;
      }

      const email = String(emailRes.content || "").trim().toLowerCase();
      if (!isEmail(email)) {
        wx.showToast({ title: "邮箱格式错误", icon: "none" });
        logger.info("settings_bind_email_end", { blocked: "invalid_email" });
        return;
      }

      const nextUser = await settingsService.bindEmail(email);
      userStore.setUserInfo(nextUser);
      this.syncPageState();
      wx.showToast({ title: "邮箱已保存", icon: "success" });
    } catch (error) {
      logger.error("settings_bind_email_failed", { error: error.message });
      wx.showToast({ title: error.message || "邮箱保存失败", icon: "none" });
    } finally {
      logger.info("settings_bind_email_end", {});
    }
  },

  onGoVerifyTap() {
    navigateTo(ROUTES.AUTH_VERIFY);
  },

  onNotificationSettingsTap() {
    wx.showToast({ title: "可直接切换下方通知开关", icon: "none" });
  },

  onPrivacySettingsTap() {
    wx.showToast({ title: "可直接切换下方隐私开关", icon: "none" });
  },

  async onDeleteAccountTap() {
    logger.info("settings_delete_account_start", {});
    const modalRes = await wx.showModal({
      title: "确认注销账号",
      content: "注销后将停用当前账号和登录状态，该操作不可恢复，是否继续？",
      confirmColor: "#ff4d4f"
    });

    if (!modalRes.confirm) {
      logger.info("settings_delete_account_end", { blocked: "cancelled" });
      return;
    }

    try {
      await settingsService.deleteAccount();
      const nextUser = userStore.clearUser();
      if (nextUser && authUtils.isLoggedIn()) {
        await userStore.refreshCurrentUser();
      }
      wx.showToast({ title: "账号已注销", icon: "success" });
      switchTab(ROUTES.PROFILE);
    } catch (error) {
      logger.error("settings_delete_account_failed", { error: error.message });
      wx.showToast({ title: error.message || "账号注销失败", icon: "none" });
    } finally {
      logger.info("settings_delete_account_end", {});
    }
  }
});
