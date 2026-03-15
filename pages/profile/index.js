const authService = require("../../services/auth.service");
const chatService = require("../../services/chat.service");
const favoriteService = require("../../services/favorite.service");
const historyService = require("../../services/history.service");
const userService = require("../../services/user.service");
const userStore = require("../../store/user.store");
const authUtils = require("../../utils/auth");
const { USER_ROLE } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { maskPhone, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");

function formatIdentityStatus(userInfo = {}) {
  if (userInfo.verified) {
    return {
      text: "已审核通过",
      badgeText: "已实名",
      badgeClass: "verified",
      badgeIcon: "√"
    };
  }

  if (userInfo.identityStatus === "pending") {
    return {
      text: "资料已提交，待人工审核",
      badgeText: "待审核",
      badgeClass: "pending",
      badgeIcon: "!"
    };
  }

  return {
    text: "提交资料后可完成身份审核",
    badgeText: "未实名",
    badgeClass: "idle",
    badgeIcon: "!"
  };
}

function formatCountLabel(value) {
  const count = Number(value || 0);
  if (count > 99) {
    return "99+";
  }
  return String(count);
}

function buildQuickStats(favoriteCount = 0, historyCount = 0) {
  return {
    favoriteCount,
    historyCount,
    favoriteLabel: formatCountLabel(favoriteCount),
    historyLabel: formatCountLabel(historyCount)
  };
}

Page({
  data: {
    loading: false,
    avatarUploading: false,
    userInfo: null,
    isLoggedIn: false,
    activeQuickAction: "",
    quickStats: buildQuickStats(),
    unreadNotificationCount: 0,
    unreadNotificationBadge: "0"
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/index", query: options || {} });
    this.restoreUserInfo();
    logger.info("profile_onload_end", {});
  },

  async onShow() {
    logger.info("profile_onshow_start", {});
    this.restoreUserInfo();
    if (this.data.isLoggedIn) {
      await this.refreshCurrentUser();
      await this.refreshDashboardStats();
    } else {
      this.resetDashboardStats();
    }
    logger.info("profile_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.info("profile_pulldown_start", {});
    try {
      if (this.data.isLoggedIn) {
        await this.refreshCurrentUser();
        await this.refreshDashboardStats();
      } else {
        this.restoreUserInfo();
        this.resetDashboardStats();
      }
    } finally {
      wx.stopPullDownRefresh();
      logger.info("profile_pulldown_end", {});
    }
  },

  resetDashboardStats() {
    this.setData({
      activeQuickAction: "",
      quickStats: buildQuickStats(),
      unreadNotificationCount: 0,
      unreadNotificationBadge: "0"
    });
  },

  restoreUserInfo() {
    logger.info("profile_restore_start", {});
    const userInfo = userStore.restoreFromStorage();
    const isLoggedIn = authUtils.isLoggedIn();
    this.setData({
      userInfo: this.normalizeUser(userInfo),
      isLoggedIn
    });
    logger.info("profile_restore_end", { isLoggedIn });
  },

  normalizeUser(userInfo) {
    logger.debug("profile_normalize_user_start", {});
    if (!userInfo) {
      return null;
    }

    const identityMeta = formatIdentityStatus(userInfo);
    const roleBadgeClass = userInfo.role === USER_ROLE.LANDLORD
      ? "landlord"
      : userInfo.role === USER_ROLE.TENANT
        ? "tenant"
        : "admin";

    const normalized = {
      ...userInfo,
      canManageHouses: userInfo.role === USER_ROLE.LANDLORD,
      displayName: fallbackText(userInfo.nickName, "未设置昵称"),
      displayPhone: userInfo.phone ? maskPhone(String(userInfo.phone)) : "未绑定手机号",
      displayRole: this.formatRole(userInfo.role),
      roleBadgeClass,
      displayIdentityStatus: identityMeta.text,
      identityBadgeText: identityMeta.badgeText,
      identityBadgeClass: identityMeta.badgeClass,
      identityBadgeIcon: identityMeta.badgeIcon,
      displayWechatStatus: userInfo.wechatBound ? "微信已绑定" : "微信未绑定",
      wechatBadgeClass: userInfo.wechatBound ? "bound" : "unbound",
      wechatMenuSubtitle: userInfo.wechatBound ? "已绑定，可直接微信登录" : "绑定后可微信登录"
    };
    logger.debug("profile_normalize_user_end", {});
    return normalized;
  },

  formatRole(role) {
    logger.debug("profile_format_role_start", { role });
    const roleTextMap = {
      [USER_ROLE.TENANT]: "租客",
      [USER_ROLE.LANDLORD]: "房东",
      [USER_ROLE.ADMIN]: "管理员"
    };
    const text = roleTextMap[role] || "未知角色";
    logger.debug("profile_format_role_end", { text });
    return text;
  },

  async refreshCurrentUser() {
    logger.info("profile_refresh_user_start", {});
    this.setData({ loading: true });
    try {
      logger.info("api_call", { func: "user.getCurrentUser", params: {} });
      const userInfo = await userStore.refreshCurrentUser();
      logger.info("api_resp", { func: "user.getCurrentUser", code: 0 });
      this.setData({
        userInfo: this.normalizeUser(userInfo),
        isLoggedIn: authUtils.isLoggedIn()
      });
    } catch (error) {
      logger.error("api_error", { func: "user.getCurrentUser", err: error.message });
      wx.showToast({ title: error.message || "用户信息刷新失败", icon: "none" });
    } finally {
      this.setData({ loading: false });
      logger.info("profile_refresh_user_end", {});
    }
  },

  async refreshDashboardStats() {
    logger.info("profile_refresh_stats_start", {});
    if (!this.data.isLoggedIn) {
      this.resetDashboardStats();
      logger.info("profile_refresh_stats_end", { blocked: "not_login" });
      return;
    }

    const requests = [
      favoriteService.getFavoriteList({ page: 1, pageSize: 1 }),
      historyService.getHistoryList({ page: 1, pageSize: 1 }),
      chatService.getNotificationList({ page: 1, pageSize: 10 })
    ];

    const [favoriteRes, historyRes, notificationRes] = await Promise.allSettled(requests);
    const favoriteCount = favoriteRes.status === "fulfilled" ? Number(favoriteRes.value.total || 0) : 0;
    const historyCount = historyRes.status === "fulfilled" ? Number(historyRes.value.total || 0) : 0;
    const unreadNotificationCount = notificationRes.status === "fulfilled"
      ? Number(
        notificationRes.value.unreadCount
          || (Array.isArray(notificationRes.value.list)
            ? notificationRes.value.list.filter((item) => !item.read).length
            : 0)
      )
      : 0;

    this.setData({
      quickStats: buildQuickStats(favoriteCount, historyCount),
      unreadNotificationCount,
      unreadNotificationBadge: formatCountLabel(unreadNotificationCount)
    });
    logger.info("profile_refresh_stats_end", {
      favoriteCount,
      historyCount,
      unreadNotificationCount
    });
  },

  onGoLogin() {
    logger.info("profile_go_login_start", {});
    navigateTo(ROUTES.AUTH_LOGIN);
    logger.info("profile_go_login_end", {});
  },

  onGoRegister() {
    logger.info("profile_go_register_start", {});
    navigateTo(ROUTES.AUTH_REGISTER);
    logger.info("profile_go_register_end", {});
  },

  async onAvatarTap() {
    logger.info("profile_avatar_upload_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_avatar_upload_end", { blocked: "not_login" });
      return;
    }

    try {
      const chooseRes = await wx.chooseMedia({
        count: 1,
        mediaType: ["image"],
        sourceType: ["album", "camera"]
      });

      const tempFilePath = chooseRes?.tempFiles?.[0]?.tempFilePath || "";
      if (!tempFilePath) {
        logger.info("profile_avatar_upload_end", { blocked: "empty_file" });
        return;
      }

      const loginUser = authUtils.getLoginUser() || this.data.userInfo || {};
      const extension = tempFilePath.includes(".")
        ? tempFilePath.split(".").pop().split("?")[0]
        : "jpg";
      const cloudPath = `avatars/${loginUser.userId || "anonymous"}/${Date.now()}.${extension}`;

      this.setData({ avatarUploading: true });
      const avatarUrl = await userService.uploadAvatar(tempFilePath, cloudPath);
      const nextUser = await userService.updateProfile({ avatarUrl });
      userStore.setUserInfo(nextUser);
      this.setData({
        userInfo: this.normalizeUser(nextUser),
        isLoggedIn: authUtils.isLoggedIn()
      });
      wx.showToast({ title: "头像已更新", icon: "success" });
    } catch (error) {
      const message = error?.errMsg || error?.message || "";
      if (message.includes("cancel")) {
        logger.info("profile_avatar_upload_end", { blocked: "cancelled" });
        return;
      }
      logger.error("api_error", { func: "user.uploadAvatar", err: message });
      wx.showToast({ title: message || "头像上传失败", icon: "none" });
    } finally {
      this.setData({ avatarUploading: false });
      logger.info("profile_avatar_upload_end", {});
    }
  },

  onQuickActionTap(event) {
    logger.info("profile_quick_action_start", { data: event.currentTarget.dataset || {} });
    const action = String(event.currentTarget.dataset.action || "");
    if (!action) {
      logger.info("profile_quick_action_end", { blocked: "empty_action" });
      return;
    }

    this.setData({ activeQuickAction: action });

    if (action === "favorites") {
      this.onGoFavorites({ highlight: true });
    }

    if (action === "history") {
      this.onGoHistory({ highlight: true });
    }

    logger.info("profile_quick_action_end", { action });
  },

  onGoVerify() {
    logger.info("profile_go_verify_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_verify_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.AUTH_VERIFY);
    logger.info("profile_go_verify_end", {});
  },

  onGoFavorites(options = {}) {
    logger.info("profile_go_favorites_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_favorites_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_FAVORITES, options.highlight ? { highlight: "1" } : {});
    logger.info("profile_go_favorites_end", {});
  },

  onGoHistory(options = {}) {
    logger.info("profile_go_history_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_history_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_HISTORY, options.highlight ? { highlight: "1" } : {});
    logger.info("profile_go_history_end", {});
  },

  onGoEditProfile() {
    logger.info("profile_go_edit_profile_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_edit_profile_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_EDIT);
    logger.info("profile_go_edit_profile_end", {});
  },

  onGoNotifications() {
    logger.info("profile_go_notifications_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_notifications_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_NOTIFICATIONS);
    logger.info("profile_go_notifications_end", {});
  },

  async onDeleteAccountTap() {
    logger.info("profile_delete_account_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_delete_account_end", { blocked: "not_login" });
      return;
    }

    const modalRes = await wx.showModal({
      title: "确认注销账号",
      content: "注销后将停用当前账号和登录状态，该操作不可恢复，是否继续？",
      confirmColor: "#ff4d4f"
    });

    if (!modalRes.confirm) {
      logger.info("profile_delete_account_end", { blocked: "cancelled" });
      return;
    }

    try {
      logger.info("api_call", { func: "user.deleteAccount", params: {} });
      await userService.deleteAccount();
      logger.info("api_resp", { func: "user.deleteAccount", code: 0 });
      userStore.clearUser();
      this.setData({
        userInfo: null,
        isLoggedIn: false
      });
      this.resetDashboardStats();
      wx.showToast({ title: "账号已注销", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "user.deleteAccount", err: error.message });
      wx.showToast({ title: error.message || "账号注销失败", icon: "none" });
    } finally {
      logger.info("profile_delete_account_end", {});
    }
  },

  async onAccountSecurityTap() {
    logger.info("profile_account_security_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_account_security_end", { blocked: "not_login" });
      return;
    }

    try {
      const sheetRes = await wx.showActionSheet({
        itemList: ["注销账号"],
        itemColor: "#ff4d4f"
      });

      if (sheetRes.tapIndex === 0) {
        await this.onDeleteAccountTap();
      }
    } catch (error) {
      const message = error?.errMsg || "";
      if (message.includes("cancel")) {
        logger.info("profile_account_security_end", { blocked: "cancelled" });
        return;
      }
      logger.error("profile_account_security_failed", { err: message || error.message });
      wx.showToast({ title: error.message || "操作失败", icon: "none" });
    } finally {
      logger.info("profile_account_security_end", {});
    }
  },

  async onWechatEntryTap() {
    if (this.data.userInfo?.wechatBound) {
      await this.onUnbindWechatTap();
      return;
    }
    await this.onBindWechatTap();
  },

  async onBindWechatTap() {
    logger.info("profile_bind_wechat_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_bind_wechat_end", { blocked: "not_login" });
      return;
    }

    if (this.data.userInfo && this.data.userInfo.wechatBound) {
      wx.showToast({ title: "当前账号已绑定微信", icon: "none" });
      logger.info("profile_bind_wechat_end", { blocked: "already_bound" });
      return;
    }

    try {
      logger.info("api_call", { func: "auth.bindWechat", params: {} });
      const result = await authService.bindWechat();
      logger.info("api_resp", { func: "auth.bindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.setData({
        userInfo: this.normalizeUser(nextUser),
        isLoggedIn: authUtils.isLoggedIn()
      });
      wx.showToast({ title: "微信绑定成功", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.bindWechat", err: error.message });
      wx.showToast({ title: error.message || "微信绑定失败", icon: "none" });
    } finally {
      logger.info("profile_bind_wechat_end", {});
    }
  },

  async onUnbindWechatTap() {
    logger.info("profile_unbind_wechat_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_unbind_wechat_end", { blocked: "not_login" });
      return;
    }

    if (!this.data.userInfo || !this.data.userInfo.wechatBound) {
      wx.showToast({ title: "当前账号未绑定微信", icon: "none" });
      logger.info("profile_unbind_wechat_end", { blocked: "not_bound" });
      return;
    }

    try {
      logger.info("api_call", { func: "auth.unbindWechat", params: {} });
      const result = await authService.unbindWechat();
      logger.info("api_resp", { func: "auth.unbindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.setData({
        userInfo: this.normalizeUser(nextUser),
        isLoggedIn: authUtils.isLoggedIn()
      });
      wx.showToast({ title: "微信解绑成功", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "auth.unbindWechat", err: error.message });
      wx.showToast({ title: error.message || "微信解绑失败", icon: "none" });
    } finally {
      logger.info("profile_unbind_wechat_end", {});
    }
  },

  async onSwitchRoleTap() {
    logger.info("profile_switch_role_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_switch_role_end", { blocked: "not_login" });
      return;
    }

    const currentRole = this.data.userInfo ? this.data.userInfo.role : USER_ROLE.TENANT;
    const nextRole = currentRole === USER_ROLE.TENANT ? USER_ROLE.LANDLORD : USER_ROLE.TENANT;

    try {
      logger.info("api_call", { func: "user.switchRole", params: { role: nextRole } });
      const userInfo = await userService.switchRole(nextRole);
      logger.info("api_resp", { func: "user.switchRole", code: 0 });
      userStore.setUserInfo(userInfo);
      this.setData({
        userInfo: this.normalizeUser(userInfo),
        isLoggedIn: authUtils.isLoggedIn()
      });
      await this.refreshDashboardStats();
      wx.showToast({ title: "角色切换成功", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "user.switchRole", err: error.message });
      wx.showToast({ title: error.message || "角色切换失败", icon: "none" });
    } finally {
      logger.info("profile_switch_role_end", {});
    }
  },

  async onLogoutTap() {
    logger.info("profile_logout_start", {});
    try {
      if (authUtils.isLoggedIn()) {
        logger.info("api_call", { func: "auth.logout", params: {} });
        await authService.logout();
        logger.info("api_resp", { func: "auth.logout", code: 0 });
      }
    } catch (error) {
      logger.warn("profile_logout_remote_failed", { error: error.message });
    }

    userStore.clearUser();
    this.setData({
      userInfo: null,
      isLoggedIn: false
    });
    this.resetDashboardStats();
    wx.showToast({ title: "已退出登录", icon: "success" });
    logger.info("profile_logout_end", {});
  }
});
