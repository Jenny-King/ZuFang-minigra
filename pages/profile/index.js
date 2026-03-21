const authService = require("../../services/auth.service");
const bookingService = require("../../services/booking.service");
const chatService = require("../../services/chat.service");
const favoriteService = require("../../services/favorite.service");
const historyService = require("../../services/history.service");
const userService = require("../../services/user.service");
const userStore = require("../../store/user.store");
const authUtils = require("../../utils/auth");
const { USER_ROLE, BOOKING_STATUS, BOOKING_TIME_SLOTS } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { maskPhone, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");
const toast = require("../../utils/toast");

const BOOKING_STATUS_TEXT_MAP = {
  [BOOKING_STATUS.PENDING]: "待确认",
  [BOOKING_STATUS.CONFIRMED]: "已确认",
  [BOOKING_STATUS.REJECTED]: "已拒绝",
  [BOOKING_STATUS.RESCHEDULED]: "已改期",
  [BOOKING_STATUS.CANCELLED]: "已取消"
};

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

function buildQuickStats(favoriteCount = 0, historyCount = 0, bookingCount = 0) {
  return {
    favoriteCount,
    historyCount,
    bookingCount,
    notificationCount: 0,
    favoriteLabel: formatCountLabel(favoriteCount),
    historyLabel: formatCountLabel(historyCount),
    bookingLabel: formatCountLabel(bookingCount),
    notificationLabel: "0"
  };
}

function getTimeSlotLabel(value) {
  const slot = BOOKING_TIME_SLOTS.find((item) => item.value === value);
  return slot ? slot.label : String(value || "");
}

function getTimeSlotStart(value) {
  const label = getTimeSlotLabel(value);
  const match = label.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : label;
}

function parseDateOnly(value) {
  const raw = String(value || "").trim();
  const match = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function formatBookingDayLabel(value) {
  const date = parseDateOnly(value);
  if (!date) {
    return "";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((date.getTime() - today.getTime()) / 86400000);

  if (diffDays === 0) {
    return "今天";
  }
  if (diffDays === 1) {
    return "明天";
  }
  if (diffDays === 2) {
    return "后天";
  }

  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function buildBookingPreview(booking = {}) {
  const status = booking.status || BOOKING_STATUS.PENDING;
  const isRescheduled = status === BOOKING_STATUS.RESCHEDULED;
  const previewDate = isRescheduled && booking.newDate ? booking.newDate : booking.date;
  const previewTimeSlot = isRescheduled && booking.newTimeSlot ? booking.newTimeSlot : booking.timeSlot;
  const displayDate = formatBookingDayLabel(previewDate);
  const displayTime = getTimeSlotStart(previewTimeSlot);
  const displayDateTime = [displayDate, displayTime].filter(Boolean).join(" ");

  return {
    bookingId: booking._id || booking.bookingId || "",
    houseTitle: fallbackText(booking.houseTitle, "未命名房源"),
    displayDateTime: displayDateTime || "时间待确认",
    displayContactName: fallbackText(booking.contactName, "未填写"),
    statusText: BOOKING_STATUS_TEXT_MAP[status] || "待确认",
    statusClass: status || BOOKING_STATUS.PENDING
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
    bookingPreviewList: [],
    cachedAccounts: [],
    cachedAccountCount: 0,
    accountSwitcherVisible: false
  },

  onLoad(options) {
    logger.info("page_load", { page: "profile/index", query: options || {} });
    this.restoreUserInfo();
    logger.debug("profile_onload_end", {});
  },

  async onShow() {
    logger.debug("profile_onshow_start", {});
    this.restoreUserInfo();
    if (this.data.isLoggedIn) {
      await this.refreshCurrentUser();
      await this.refreshDashboardStats();
    } else {
      this.resetDashboardStats();
    }
    logger.debug("profile_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.debug("profile_pulldown_start", {});
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
      logger.debug("profile_pulldown_end", {});
    }
  },

  resetDashboardStats() {
    this.setData({
      activeQuickAction: "",
      quickStats: buildQuickStats(),
      unreadNotificationCount: 0,
      unreadNotificationBadge: "0",
      bookingPreviewList: []
    });
  },

  restoreUserInfo() {
    logger.debug("profile_restore_start", {});
    userStore.restoreFromStorage();
    this.syncAccountSnapshot();
    const isLoggedIn = authUtils.isLoggedIn();
    logger.debug("profile_restore_end", { isLoggedIn });
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
    logger.debug("profile_refresh_user_start", {});
    this.setData({ loading: true });
    try {
      logger.debug("api_call", { func: "user.getCurrentUser", params: {} });
      await userStore.refreshCurrentUser();
      logger.debug("api_resp", { func: "user.getCurrentUser", code: 0 });
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
      logger.debug("profile_refresh_user_end", {});
    }
  },

  async refreshDashboardStats() {
    logger.debug("profile_refresh_stats_start", {});
    if (!this.data.isLoggedIn) {
      this.resetDashboardStats();
      logger.debug("profile_refresh_stats_end", { blocked: "not_login" });
      return;
    }

    const requests = [
      favoriteService.getFavoriteList({ page: 1, pageSize: 1 }),
      historyService.getHistoryList({ page: 1, pageSize: 1 }),
      chatService.getNotificationList({ page: 1, pageSize: 10 }),
      bookingService.getMyBookings(1, 2)
    ];

    const settledResults = await Promise.allSettled(requests);
    const favoriteRes = settledResults[0];
    const historyRes = settledResults[1];
    const notificationRes = settledResults[2];
    const bookingRes = settledResults[3];
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

    const bookingList = bookingRes.status === "fulfilled" && Array.isArray(bookingRes.value.list)
      ? bookingRes.value.list
      : [];
    const bookingCount = bookingRes.status === "fulfilled"
      ? Number(bookingRes.value.total || bookingList.length || 0)
      : 0;
    const bookingPreviewList = bookingList.slice(0, 2).map((item) => buildBookingPreview(item));

    this.setData({
      quickStats: {
        ...buildQuickStats(favoriteCount, historyCount, bookingCount),
        notificationCount: unreadNotificationCount,
        notificationLabel: formatCountLabel(unreadNotificationCount)
      },
      unreadNotificationCount,
      unreadNotificationBadge: formatCountLabel(unreadNotificationCount),
      bookingPreviewList
    });
    logger.debug("profile_refresh_stats_end", {
      favoriteCount,
      historyCount,
      bookingCount,
      unreadNotificationCount
    });
  },

  onGoLogin() {
    logger.debug("profile_go_login_start", {});
    navigateTo(ROUTES.AUTH_LOGIN);
    logger.debug("profile_go_login_end", {});
  },

  onGoRegister() {
    logger.debug("profile_go_register_start", {});
    navigateTo(ROUTES.AUTH_REGISTER);
    logger.debug("profile_go_register_end", {});
  },

  noop() {},

  async onEditNicknameTap() {
    logger.debug("profile_edit_nickname_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_edit_nickname_end", { blocked: "not_login" });
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
        confirmColor: "#3c7bfd",
        cancelColor: "#999999"
      });

      if (!modalRes.confirm) {
        logger.debug("profile_edit_nickname_end", { blocked: "cancelled" });
        return;
      }

      const nickName = String(modalRes.content || "").trim();
      if (!nickName) {
        await toast.error("昵称不能为空");
        logger.debug("profile_edit_nickname_end", { blocked: "empty_name" });
        return;
      }

      if (nickName === currentName) {
        await toast.info("昵称未变化");
        logger.debug("profile_edit_nickname_end", { blocked: "same_name" });
        return;
      }

      logger.debug("api_call", { func: "user.updateProfile", params: { nickName } });
      const nextUser = await userService.updateProfile({ nickName });
      logger.debug("api_resp", { func: "user.updateProfile", code: 0 });
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("昵称已更新");
    } catch (error) {
      logger.error("profile_edit_nickname_failed", { error: error.message });
      await toast.error(error.message || "昵称修改失败");
    } finally {
      logger.debug("profile_edit_nickname_end", {});
    }
  },

  async onAvatarTap() {
    logger.debug("profile_avatar_upload_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_avatar_upload_end", { blocked: "not_login" });
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
        logger.debug("profile_avatar_upload_end", { blocked: "empty_file" });
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
        logger.debug("profile_avatar_upload_end", { blocked: "cancelled" });
        return;
      }
      logger.error("api_error", { func: "user.uploadAvatar", err: message });
      await toast.error(message || "头像上传失败");
    } finally {
      this.setData({ avatarUploading: false });
      logger.debug("profile_avatar_upload_end", {});
    }
  },

  onQuickActionTap(event) {
    logger.debug("profile_quick_action_start", { data: event.currentTarget.dataset || {} });
    const action = String(event.currentTarget.dataset.action || "");
    if (!action) {
      logger.debug("profile_quick_action_end", { blocked: "empty_action" });
      return;
    }

    this.setData({ activeQuickAction: action });

    if (action === "favorites") {
      this.onGoFavorites({ highlight: true });
    }

    if (action === "history") {
      this.onGoHistory({ highlight: true });
    }

    if (action === "bookings") {
      this.onGoBookings();
    }

    if (action === "notifications") {
      this.onGoNotifications();
    }

    logger.debug("profile_quick_action_end", { action });
  },

  onGoFavorites(options = {}) {
    logger.debug("profile_go_favorites_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_go_favorites_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_FAVORITES, options.highlight ? { highlight: "1" } : {});
    logger.debug("profile_go_favorites_end", {});
  },

  onGoHistory(options = {}) {
    logger.debug("profile_go_history_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_go_history_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_HISTORY, options.highlight ? { highlight: "1" } : {});
    logger.debug("profile_go_history_end", {});
  },

  onGoNotifications() {
    logger.debug("profile_go_notifications_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_go_notifications_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_NOTIFICATIONS);
    logger.debug("profile_go_notifications_end", {});
  },

  onGoBookings() {
    logger.debug("profile_go_bookings_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_go_bookings_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.MY_BOOKINGS);
    logger.debug("profile_go_bookings_end", {});
  },

  onGoSupportCenter() {
    logger.debug("profile_go_support_center_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_go_support_center_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_SUPPORT);
    logger.debug("profile_go_support_center_end", {});
  },

  async onDeleteAccountTap() {
    logger.debug("profile_delete_account_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_delete_account_end", { blocked: "not_login" });
      return;
    }

    const modalRes = await wx.showModal({
      title: "确认注销账号",
      content: "注销后将停用当前账号和登录状态，该操作不可恢复，是否继续？",
      confirmColor: "#ff4d4f",
      cancelColor: "#999999"
    });

    if (!modalRes.confirm) {
      logger.debug("profile_delete_account_end", { blocked: "cancelled" });
      return;
    }

    try {
      logger.debug("api_call", { func: "user.deleteAccount", params: {} });
      await userService.deleteAccount();
      logger.debug("api_resp", { func: "user.deleteAccount", code: 0 });
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
      logger.debug("profile_delete_account_end", {});
    }
  },

  async onOpenSettingsTap() {
    logger.debug("profile_settings_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_settings_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_SETTINGS);
    logger.debug("profile_settings_end", {});
  },

  async onWechatEntryTap() {
    if (this.data.userInfo?.wechatBound) {
      await this.onUnbindWechatTap();
      return;
    }
    await this.onBindWechatTap();
  },

  async onBindWechatTap() {
    logger.debug("profile_bind_wechat_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_bind_wechat_end", { blocked: "not_login" });
      return;
    }

    if (this.data.userInfo && this.data.userInfo.wechatBound) {
      await toast.info("当前账号已绑定微信");
      logger.debug("profile_bind_wechat_end", { blocked: "already_bound" });
      return;
    }

    try {
      logger.debug("api_call", { func: "auth.bindWechat", params: {} });
      const result = await authService.bindWechat();
      logger.debug("api_resp", { func: "auth.bindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("微信绑定成功");
    } catch (error) {
      logger.error("api_error", { func: "auth.bindWechat", err: error.message });
      await toast.error(error.message || "微信绑定失败");
    } finally {
      logger.debug("profile_bind_wechat_end", {});
    }
  },

  async onUnbindWechatTap() {
    logger.debug("profile_unbind_wechat_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_unbind_wechat_end", { blocked: "not_login" });
      return;
    }

    if (!this.data.userInfo || !this.data.userInfo.wechatBound) {
      await toast.info("当前账号未绑定微信");
      logger.debug("profile_unbind_wechat_end", { blocked: "not_bound" });
      return;
    }

    try {
      logger.debug("api_call", { func: "auth.unbindWechat", params: {} });
      const result = await authService.unbindWechat();
      logger.debug("api_resp", { func: "auth.unbindWechat", code: 0 });
      const nextUser = result && result.userInfo ? result.userInfo : await userStore.refreshCurrentUser();
      userStore.setUserInfo(nextUser);
      this.syncAccountSnapshot();
      await toast.success("微信解绑成功");
    } catch (error) {
      logger.error("api_error", { func: "auth.unbindWechat", err: error.message });
      await toast.error(error.message || "微信解绑失败");
    } finally {
      logger.debug("profile_unbind_wechat_end", {});
    }
  },

  async onSwitchRoleTap() {
    logger.debug("profile_switch_role_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_switch_role_end", { blocked: "not_login" });
      return;
    }

    const currentRole = this.data.userInfo ? this.data.userInfo.role : USER_ROLE.TENANT;
    const nextRole = currentRole === USER_ROLE.TENANT ? USER_ROLE.LANDLORD : USER_ROLE.TENANT;

    try {
      logger.debug("api_call", { func: "user.switchRole", params: { role: nextRole } });
      const userInfo = await userService.switchRole(nextRole);
      logger.debug("api_resp", { func: "user.switchRole", code: 0 });
      userStore.setUserInfo(userInfo);
      this.syncAccountSnapshot();
      await this.refreshDashboardStats();
      await toast.success("角色切换成功");
    } catch (error) {
      logger.error("api_error", { func: "user.switchRole", err: error.message });
      await toast.error(error.message || "角色切换失败");
    } finally {
      logger.debug("profile_switch_role_end", {});
    }
  },

  async onSwitchAccountTap() {
    logger.debug("profile_switch_account_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("profile_switch_account_end", { blocked: "not_login" });
      return;
    }

    const accountOptions = this.data.cachedAccounts || [];
    if (!accountOptions.length) {
      navigateTo(ROUTES.AUTH_LOGIN);
      logger.debug("profile_switch_account_end", { blocked: "empty_accounts" });
      return;
    }

    this.setData({ accountSwitcherVisible: true });
    logger.debug("profile_switch_account_end", { opened: true });
  },

  onCloseAccountSwitcher() {
    logger.info("profile_close_account_switcher", {});
    this.setData({
      accountSwitcherVisible: false,
      removingAccountId: ""
    });
  },

  onAddAccountTap() {
    logger.debug("profile_add_account_start", {});
    this.setData({ accountSwitcherVisible: false });
    navigateTo(ROUTES.AUTH_LOGIN);
    logger.debug("profile_add_account_end", {});
  },

  async onSelectAccountTap(event) {
    const targetUserId = String(event.currentTarget.dataset.userId || "").trim();
    logger.debug("profile_select_account_start", { userId: targetUserId });
    if (!targetUserId) {
      logger.debug("profile_select_account_end", { blocked: "empty_user_id" });
      return;
    }

    const targetAccount = (this.data.cachedAccounts || []).find((item) => item.userId === targetUserId);
    if (!targetAccount) {
      logger.debug("profile_select_account_end", { blocked: "account_not_found" });
      return;
    }

    const currentUserId = this.data.userInfo?.userId || "";
    if (targetAccount.userId === currentUserId) {
      this.setData({ accountSwitcherVisible: false });
      await toast.info("已是当前账号");
      logger.debug("profile_select_account_end", { blocked: "same_account" });
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
      logger.debug("profile_select_account_end", { userId: targetUserId });
    }
  },

  async onRemoveAccountTap(event) {
    const targetUserId = String(event.currentTarget.dataset.userId || "").trim();
    logger.debug("profile_remove_account_start", { userId: targetUserId });
    if (!targetUserId) {
      logger.debug("profile_remove_account_end", { blocked: "empty_user_id" });
      return;
    }

    const targetAccount = (this.data.cachedAccounts || []).find((item) => item.userId === targetUserId);
    if (!targetAccount) {
      logger.debug("profile_remove_account_end", { blocked: "account_not_found" });
      return;
    }

    const modalRes = await wx.showModal({
      title: "删除登记记录",
      content: `将从本机移除“${targetAccount.displayName}”的快捷切换记录，云端账号本身不会被注销，是否继续？`,
      confirmColor: "#ff4d4f",
      cancelColor: "#999999"
    });

    if (!modalRes.confirm) {
      logger.debug("profile_remove_account_end", { blocked: "cancelled" });
      return;
    }

    this.setData({ removingAccountId: targetUserId });

    try {
      const currentUserId = this.data.userInfo?.userId || "";
      if (currentUserId === targetUserId && authUtils.isLoggedIn()) {
        try {
          logger.debug("api_call", { func: "auth.logout", params: { reason: "remove_cached_account" } });
          await authService.logout();
          logger.debug("api_resp", { func: "auth.logout", code: 0 });
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
      logger.debug("profile_remove_account_end", { userId: targetUserId });
    }
  },

  async onLogoutTap() {
    logger.debug("profile_logout_start", {});
    try {
      if (authUtils.isLoggedIn()) {
        logger.debug("api_call", { func: "auth.logout", params: {} });
        await authService.logout();
        logger.debug("api_resp", { func: "auth.logout", code: 0 });
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
    logger.debug("profile_logout_end", {});
  }
});
