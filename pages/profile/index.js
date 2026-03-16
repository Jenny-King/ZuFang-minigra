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
const toast = require("../../utils/toast");

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
    notificationCount: 0,
    favoriteLabel: formatCountLabel(favoriteCount),
    historyLabel: formatCountLabel(historyCount),
    notificationLabel: "0"
  };
}

function formatRoleText(role) {
  const roleTextMap = {
    [USER_ROLE.TENANT]: "租客",
    [USER_ROLE.LANDLORD]: "房东",
    [USER_ROLE.ADMIN]: "管理员"
  };
  return roleTextMap[role] || "未知角色";
}

function buildCachedAccountOptions(accountSessions = [], activeUserId = "") {
  return accountSessions.map((session) => {
    const userInfo = session.userInfo || {};
    const displayName = fallbackText(userInfo.nickName, "未命名账号");
    const displayPhone = userInfo.phone ? maskPhone(String(userInfo.phone)) : "未绑定手机号";
    return {
      userId: session.userId,
      avatarUrl: userInfo.avatarUrl || "/assets/images/avatar-placeholder.png",
      displayName,
      displayPhone,
      displayRole: formatRoleText(userInfo.role),
      wechatBound: Boolean(userInfo.wechatBound),
      isActive: session.userId === activeUserId,
      label: session.userId === activeUserId
        ? `${displayName}（当前）`
        : `${displayName} · ${displayPhone}`
    };
  });
}

Page({
  data: {
    loading: false,
    avatarUploading: false,
    removingAccountId: "",
    userInfo: null,
    isLoggedIn: false,
    activeQuickAction: "",
    quickStats: buildQuickStats(),
    unreadNotificationCount: 0,
    unreadNotificationBadge: "0",
    cachedAccounts: [],
    cachedAccountCount: 0,
    accountSwitcherVisible: false
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
    userStore.restoreFromStorage();
    this.syncAccountSnapshot();
    const isLoggedIn = authUtils.isLoggedIn();
    logger.info("profile_restore_end", { isLoggedIn });
  },

  syncAccountSnapshot() {
    const state = userStore.getState();
    this.setData({
      userInfo: this.normalizeUser(state.userInfo),
      isLoggedIn: state.isLoggedIn,
      cachedAccounts: buildCachedAccountOptions(state.accountSessions, state.activeUserId),
      cachedAccountCount: Number(state.cachedAccountCount || 0)
    });
    return state;
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
    const text = formatRoleText(role);
    logger.debug("profile_format_role_end", { text });
    return text;
  },

  async refreshCurrentUser() {
    logger.info("profile_refresh_user_start", {});
    this.setData({ loading: true });
    try {
      logger.info("api_call", { func: "user.getCurrentUser", params: {} });
      await userStore.refreshCurrentUser();
      logger.info("api_resp", { func: "user.getCurrentUser", code: 0 });
      this.syncAccountSnapshot();
    } catch (error) {
      logger.error("api_error", { func: "user.getCurrentUser", err: error.message });
      this.syncAccountSnapshot();
      if (!authUtils.isLoggedIn()) {
        this.resetDashboardStats();
      }
      await toast.error(error.message || "用户信息刷新失败");
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
      quickStats: {
        ...buildQuickStats(favoriteCount, historyCount),
        notificationCount: unreadNotificationCount,
        notificationLabel: formatCountLabel(unreadNotificationCount)
      },
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

  noop() {},

  async onEditNicknameTap() {
    logger.info("profile_edit_nickname_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_edit_nickname_end", { blocked: "not_login" });
      return;
    }

    const currentName = String(this.data.userInfo?.nickName || this.data.userInfo?.displayName || "").trim();

    try {
      const modalRes = await wx.showModal({
        title: "修改昵称",
        editable: true,
        placeholderText: "请输入新的昵称",
        content: currentName,
        confirmText: "保存",
        confirmColor: "#2f64f5"
      });

      if (!modalRes.confirm) {
        logger.info("profile_edit_nickname_end", { blocked: "cancelled" });
        return;
      }

      const nickName = String(modalRes.content || "").trim();
      if (!nickName) {
        await toast.error("昵称不能为空");
        logger.info("profile_edit_nickname_end", { blocked: "empty_name" });
        return;
      }

      if (nickName === currentName) {
        await toast.info("昵称未变化");
        logger.info("profile_edit_nickname_end", { blocked: "same_name" });
        return;
      }

      logger.info("api_call", { func: "user.updateProfile", params: { nickName } });
      const nextUser = await userService.updateProfile({ nickName });
      logger.info("api_resp", { func: "user.updateProfile", code: 0 });
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("昵称已更新");
    } catch (error) {
      logger.error("profile_edit_nickname_failed", { error: error.message });
      await toast.error(error.message || "昵称修改失败");
    } finally {
      logger.info("profile_edit_nickname_end", {});
    }
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
      this.syncAccountSnapshot();
      await toast.success("头像已更新");
    } catch (error) {
      const message = error?.errMsg || error?.message || "";
      if (message.includes("cancel")) {
        logger.info("profile_avatar_upload_end", { blocked: "cancelled" });
        return;
      }
      logger.error("api_error", { func: "user.uploadAvatar", err: message });
      await toast.error(message || "头像上传失败");
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

    if (action === "notifications") {
      this.onGoNotifications();
    }

    logger.info("profile_quick_action_end", { action });
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

  onGoNotifications() {
    logger.info("profile_go_notifications_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_notifications_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_NOTIFICATIONS);
    logger.info("profile_go_notifications_end", {});
  },

  onGoSupportCenter() {
    logger.info("profile_go_support_center_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_support_center_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_SUPPORT);
    logger.info("profile_go_support_center_end", {});
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
      const nextUser = userStore.clearUser();
      this.syncAccountSnapshot();
      if (nextUser && authUtils.isLoggedIn()) {
        await this.refreshCurrentUser();
        await this.refreshDashboardStats();
        await toast.success("账号已注销，已切换其他账号");
      } else {
        this.resetDashboardStats();
        await toast.success("账号已注销");
      }
    } catch (error) {
      logger.error("api_error", { func: "user.deleteAccount", err: error.message });
      await toast.error(error.message || "账号注销失败");
    } finally {
      logger.info("profile_delete_account_end", {});
    }
  },

  async onOpenSettingsTap() {
    logger.info("profile_settings_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_settings_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_SETTINGS);
    logger.info("profile_settings_end", {});
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
      await toast.info("当前账号已绑定微信");
      logger.info("profile_bind_wechat_end", { blocked: "already_bound" });
      return;
    }

    try {
      logger.info("api_call", { func: "auth.bindWechat", params: {} });
      const result = await authService.bindWechat();
      logger.info("api_resp", { func: "auth.bindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("微信绑定成功");
    } catch (error) {
      logger.error("api_error", { func: "auth.bindWechat", err: error.message });
      await toast.error(error.message || "微信绑定失败");
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
      await toast.info("当前账号未绑定微信");
      logger.info("profile_unbind_wechat_end", { blocked: "not_bound" });
      return;
    }

    try {
      logger.info("api_call", { func: "auth.unbindWechat", params: {} });
      const result = await authService.unbindWechat();
      logger.info("api_resp", { func: "auth.unbindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("微信解绑成功");
    } catch (error) {
      logger.error("api_error", { func: "auth.unbindWechat", err: error.message });
      await toast.error(error.message || "微信解绑失败");
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
      this.syncAccountSnapshot();
      await this.refreshDashboardStats();
      await toast.success("角色切换成功");
    } catch (error) {
      logger.error("api_error", { func: "user.switchRole", err: error.message });
      await toast.error(error.message || "角色切换失败");
    } finally {
      logger.info("profile_switch_role_end", {});
    }
  },

  async onSwitchAccountTap() {
    logger.info("profile_switch_account_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_switch_account_end", { blocked: "not_login" });
      return;
    }

    const accountOptions = this.data.cachedAccounts || [];
    if (!accountOptions.length) {
      navigateTo(ROUTES.AUTH_LOGIN);
      logger.info("profile_switch_account_end", { blocked: "empty_accounts" });
      return;
    }

    this.setData({ accountSwitcherVisible: true });
    logger.info("profile_switch_account_end", { opened: true });
  },

  onCloseAccountSwitcher() {
    logger.info("profile_close_account_switcher", {});
    this.setData({
      accountSwitcherVisible: false,
      removingAccountId: ""
    });
  },

  onAddAccountTap() {
    logger.info("profile_add_account_start", {});
    this.setData({ accountSwitcherVisible: false });
    navigateTo(ROUTES.AUTH_LOGIN);
    logger.info("profile_add_account_end", {});
  },

  async onSelectAccountTap(event) {
    const targetUserId = String(event.currentTarget.dataset.userId || "").trim();
    logger.info("profile_select_account_start", { userId: targetUserId });
    if (!targetUserId) {
      logger.info("profile_select_account_end", { blocked: "empty_user_id" });
      return;
    }

    const targetAccount = (this.data.cachedAccounts || []).find((item) => item.userId === targetUserId);
    if (!targetAccount) {
      logger.info("profile_select_account_end", { blocked: "account_not_found" });
      return;
    }

    const currentUserId = this.data.userInfo?.userId || "";
    if (targetAccount.userId === currentUserId) {
      this.setData({ accountSwitcherVisible: false });
      await toast.info("已是当前账号");
      logger.info("profile_select_account_end", { blocked: "same_account" });
      return;
    }

    try {
      userStore.switchAccount(targetAccount.userId);
      this.setData({ accountSwitcherVisible: false });
      await this.refreshCurrentUser();
      await this.refreshDashboardStats();
      await toast.success(`已切换到${targetAccount.displayName}`);
    } catch (error) {
      this.syncAccountSnapshot();
      if (!authUtils.isLoggedIn()) {
        this.resetDashboardStats();
      }
      logger.error("profile_select_account_failed", { error: error.message });
      await toast.error(error.message || "切换账号失败");
    } finally {
      logger.info("profile_select_account_end", { userId: targetUserId });
    }
  },

  async onRemoveAccountTap(event) {
    const targetUserId = String(event.currentTarget.dataset.userId || "").trim();
    logger.info("profile_remove_account_start", { userId: targetUserId });
    if (!targetUserId) {
      logger.info("profile_remove_account_end", { blocked: "empty_user_id" });
      return;
    }

    const targetAccount = (this.data.cachedAccounts || []).find((item) => item.userId === targetUserId);
    if (!targetAccount) {
      logger.info("profile_remove_account_end", { blocked: "account_not_found" });
      return;
    }

    const modalRes = await wx.showModal({
      title: "删除登记记录",
      content: `将从本机移除“${targetAccount.displayName}”的快捷切换记录，云端账号本身不会被注销，是否继续？`,
      confirmColor: "#ff4d4f"
    });

    if (!modalRes.confirm) {
      logger.info("profile_remove_account_end", { blocked: "cancelled" });
      return;
    }

    this.setData({ removingAccountId: targetUserId });

    try {
      const currentUserId = this.data.userInfo?.userId || "";
      if (currentUserId === targetUserId && authUtils.isLoggedIn()) {
        try {
          logger.info("api_call", { func: "auth.logout", params: { reason: "remove_cached_account" } });
          await authService.logout();
          logger.info("api_resp", { func: "auth.logout", code: 0 });
        } catch (error) {
          logger.warn("profile_remove_account_remote_logout_failed", { error: error.message });
        }
      }

      const nextUser = userStore.removeAccount(targetUserId);
      this.syncAccountSnapshot();
      if (targetUserId === currentUserId && nextUser && authUtils.isLoggedIn()) {
        await this.refreshCurrentUser();
        await this.refreshDashboardStats();
      } else if (!authUtils.isLoggedIn()) {
        this.resetDashboardStats();
      }

      await toast.success("登记记录已删除");
    } catch (error) {
      logger.error("profile_remove_account_failed", { error: error.message });
      await toast.error(error.message || "删除失败");
    } finally {
      this.setData({ removingAccountId: "" });
      logger.info("profile_remove_account_end", { userId: targetUserId });
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

    const nextUser = userStore.clearUser();
    this.syncAccountSnapshot();
    if (nextUser && authUtils.isLoggedIn()) {
      await this.refreshCurrentUser();
      await this.refreshDashboardStats();
      await toast.success("已退出当前账号，并切换到其他账号");
    } else {
      this.resetDashboardStats();
      await toast.success("已退出当前账号");
    }
    logger.info("profile_logout_end", {});
  }
});
