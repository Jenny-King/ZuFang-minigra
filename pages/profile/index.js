const authService = require("../../services/auth.service");
const userService = require("../../services/user.service");
const userStore = require("../../store/user.store");
const authUtils = require("../../utils/auth");
const { USER_ROLE } = require("../../config/constants");
const { ROUTES, navigateTo } = require("../../config/routes");
const { maskPhone, fallbackText } = require("../../utils/format");
const { logger } = require("../../utils/logger");

Page({
  data: {
    loading: false,
    userInfo: null,
    isLoggedIn: false
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
    }
    logger.info("profile_onshow_end", {});
  },

  async onPullDownRefresh() {
    logger.info("profile_pulldown_start", {});
    try {
      if (this.data.isLoggedIn) {
        await this.refreshCurrentUser();
      } else {
        this.restoreUserInfo();
      }
    } finally {
      wx.stopPullDownRefresh();
      logger.info("profile_pulldown_end", {});
    }
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

    const normalized = {
      ...userInfo,
      canManageHouses: userInfo.role === USER_ROLE.LANDLORD,
      displayName: fallbackText(userInfo.nickName, "未设置昵称"),
      displayPhone: userInfo.phone ? maskPhone(String(userInfo.phone)) : "未绑定手机号",
      displayRole: this.formatRole(userInfo.role),
      displayVerifyStatus: userInfo.verified ? "已实名认证" : "未实名认证",
      displayWechatStatus: userInfo.wechatBound ? "已绑定微信" : "未绑定微信"
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

  onGoVerify() {
    logger.info("profile_go_verify_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_verify_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.AUTH_VERIFY);
    logger.info("profile_go_verify_end", {});
  },

  onGoFavorites() {
    logger.info("profile_go_favorites_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_favorites_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_FAVORITES);
    logger.info("profile_go_favorites_end", {});
  },

  onGoHistory() {
    logger.info("profile_go_history_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_history_end", { blocked: "not_login" });
      return;
    }
    navigateTo(ROUTES.PROFILE_HISTORY);
    logger.info("profile_go_history_end", {});
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
      wx.showToast({ title: "角色切换成功", icon: "success" });
    } catch (error) {
      logger.error("api_error", { func: "user.switchRole", err: error.message });
      wx.showToast({ title: error.message || "角色切换失败", icon: "none" });
    } finally {
      logger.info("profile_switch_role_end", {});
    }
  },

  onGoPublish() {
    logger.info("profile_go_publish_start", {});
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.info("profile_go_publish_end", { blocked: "not_login" });
      return;
    }

    if (!authUtils.hasRole(USER_ROLE.LANDLORD)) {
      wx.showToast({ title: "仅房东可管理房源", icon: "none" });
      logger.info("profile_go_publish_end", { blocked: "role_denied" });
      return;
    }

    navigateTo(ROUTES.MY_HOUSES);
    logger.info("profile_go_publish_end", {});
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
    wx.showToast({ title: "已退出登录", icon: "success" });
    logger.info("profile_logout_end", {});
  }
});
