const userService = require("../../../services/user.service");
const userStore = require("../../../store/user.store");
const authUtils = require("../../../utils/auth");
const { logger } = require("../../../utils/logger");

function buildFormData(userInfo = {}) {
  return {
    nickName: String(userInfo.nickName || ""),
    wechatId: String(userInfo.wechatId || ""),
    province: String(userInfo.province || ""),
    city: String(userInfo.city || ""),
    district: String(userInfo.district || ""),
    avatarUrl: String(userInfo.avatarUrl || "")
  };
}

Page({
  data: {
    loading: false,
    submitLoading: false,
    formData: buildFormData()
  },

  async onLoad(options) {
    logger.info("page_load", { page: "profile/edit-profile", query: options || {} });
    if (!authUtils.requireLogin({ redirect: true })) {
      logger.debug("edit_profile_onload_end", { blocked: "not_login" });
      return;
    }

    await this.loadCurrentUser();
    logger.debug("edit_profile_onload_end", {});
  },

  async onPullDownRefresh() {
    try {
      await this.loadCurrentUser();
    } finally {
      wx.stopPullDownRefresh();
    }
  },

  async loadCurrentUser() {
    this.setData({ loading: true });
    try {
      const userInfo = await userStore.refreshCurrentUser();
      this.setData({
        formData: buildFormData(userInfo || {})
      });
    } catch (error) {
      logger.error("api_error", { func: "user.getCurrentUser", err: error.message });
      wx.showToast({ title: error.message || "资料加载失败", icon: "none" });
    } finally {
      this.setData({ loading: false });
    }
  },

  onInputChange(event) {
    const field = event.currentTarget.dataset.field;
    if (!field) {
      return;
    }

    this.setData({
      [`formData.${field}`]: event.detail.value || ""
    });
  },

  async onSubmitTap() {
    if (this.data.submitLoading) {
      return;
    }

    const payload = {
      nickName: String(this.data.formData.nickName || "").trim(),
      wechatId: String(this.data.formData.wechatId || "").trim(),
      province: String(this.data.formData.province || "").trim(),
      city: String(this.data.formData.city || "").trim(),
      district: String(this.data.formData.district || "").trim(),
      avatarUrl: String(this.data.formData.avatarUrl || "").trim()
    };

    if (!payload.nickName) {
      wx.showToast({ title: "昵称不能为空", icon: "none" });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      const userInfo = await userService.updateProfile(payload);
      userStore.setUserInfo(userInfo);
      wx.showToast({ title: "保存成功", icon: "success" });
      setTimeout(() => {
        wx.navigateBack({ delta: 1 });
      }, 500);
    } catch (error) {
      logger.error("api_error", { func: "user.updateProfile", err: error.message });
      wx.showToast({ title: error.message || "保存失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
    }
  }
});
