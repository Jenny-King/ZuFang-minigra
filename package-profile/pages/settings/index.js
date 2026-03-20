const settingsService = require("../../../services/settings.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { ROUTES, navigateTo, switchTab } = require("../../../config/routes");
const { maskPhone, fallbackText } = require("../../../utils/format");
const { isEmail } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");
const { getPhoneEntryMeta } = require("./phone.helper");

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
    phoneEntryMeta: getPhoneEntryMeta(),
    preferences: settingsService.getSettingsPreferences()
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/settings", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("settings_onload_end", { blocked: "not_login" });
      return;
    }
    this.syncPageState();
    logger.debug("settings_onload_end", {});
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
      phoneEntryMeta: getPhoneEntryMeta(state.userInfo),
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
    logger.debug("settings_change_phone_start", {});
    try {
      navigateTo(ROUTES.PROFILE_CHANGE_PHONE);
    } catch (error) {
      logger.error("settings_change_phone_failed", { error: error.message });
      wx.showToast({ title: error.message || "手机号操作失败", icon: "none" });
    } finally {
      logger.debug("settings_change_phone_end", {});
    }
  },

  async onChangePasswordTap() {
    logger.debug("settings_change_password_start", {});
    try {
      navigateTo(ROUTES.PROFILE_CHANGE_PASSWORD);
    } catch (error) {
      logger.error("settings_change_password_failed", { error: error.message });
      wx.showToast({ title: error.message || "修改密码失败", icon: "none" });
    } finally {
      logger.debug("settings_change_password_end", {});
    }
  },

  async onWechatEntryTap() {
    logger.debug("settings_wechat_entry_start", {});
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
      logger.debug("settings_wechat_entry_end", { isBound });
    }
  },

  async onBindEmailTap() {
    logger.debug("settings_bind_email_start", {});
    try {
      const emailRes = await wx.showModal({
        title: this.data.userInfo?.email ? "修改邮箱" : "绑定邮箱",
        editable: true,
        placeholderText: "请输入邮箱地址",
        content: String(this.data.userInfo?.email || ""),
        confirmText: "保存",
        confirmColor: "#3c7bfd",
        cancelColor: "#999999"
      });

      if (!emailRes.confirm) {
        logger.debug("settings_bind_email_end", { blocked: "cancelled" });
        return;
      }

      const email = String(emailRes.content || "").trim().toLowerCase();
      if (!isEmail(email)) {
        wx.showToast({ title: "邮箱格式错误", icon: "none" });
        logger.debug("settings_bind_email_end", { blocked: "invalid_email" });
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
      logger.debug("settings_bind_email_end", {});
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
    logger.debug("settings_delete_account_start", {});
    const modalRes = await wx.showModal({
      title: "确认注销账号",
      content: "注销后将停用当前账号和登录状态，该操作不可恢复，是否继续？",
      confirmColor: "#ff4d4f",
      cancelColor: "#999999"
    });

    if (!modalRes.confirm) {
      logger.debug("settings_delete_account_end", { blocked: "cancelled" });
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
      logger.debug("settings_delete_account_end", {});
    }
  }
});
