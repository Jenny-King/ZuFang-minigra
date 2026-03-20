const authService = require("../../../services/auth.service");
const userStore = require("../../../store/user.store");
const { USER_ROLE } = require("../../../config/constants");
const { ROUTES, redirectTo, switchTab } = require("../../../config/routes");
const { validateRegisterForm } = require("../../../utils/validate");
const { logger } = require("../../../utils/logger");

Page({
  data: {
    submitLoading: false,
    formData: {
      nickName: "",
      phone: "",
      password: "",
      role: USER_ROLE.TENANT,
      wechatId: ""
    }
  },

  onLoad(options) {
    logger.info("page_load", { page: "auth/register", query: options || {} });
    logger.debug("auth_register_onload_end", {});
  },

  onInputChange(event) {
    logger.debug("auth_register_input_start", {});
    const field = event.currentTarget.dataset.field;
    const value = event.detail.value || "";
    if (!field) {
      logger.warn("auth_register_input_no_field", {});
      return;
    }
    this.setData({ [`formData.${field}`]: value });
    logger.debug("auth_register_input_end", { field });
  },

  onRoleChange(event) {
    logger.debug("auth_register_role_change_start", { value: event.detail.value });
    const role = Number(event.detail.value) === 1 ? USER_ROLE.LANDLORD : USER_ROLE.TENANT;
    this.setData({ "formData.role": role });
    logger.debug("auth_register_role_change_end", { role });
  },

  async onSubmitTap() {
    logger.debug("auth_register_submit_start", {});
    if (this.data.submitLoading) {
      logger.debug("auth_register_submit_end", { blocked: "loading" });
      return;
    }

    const payload = {
      ...this.data.formData,
      nickName: (this.data.formData.nickName || "").trim(),
      phone: (this.data.formData.phone || "").trim(),
      wechatId: (this.data.formData.wechatId || "").trim()
    };

    const check = validateRegisterForm(payload);
    if (!check.valid) {
      wx.showToast({ title: check.message, icon: "none" });
      logger.debug("auth_register_submit_end", { blocked: "invalid_form", message: check.message });
      return;
    }

    this.setData({ submitLoading: true });
    try {
      logger.debug("api_call", { func: "auth.register", params: { role: payload.role } });
      const session = await authService.register(payload);
      logger.debug("api_resp", { func: "auth.register", code: 0 });
      userStore.setSession(session);
      wx.showToast({ title: "注册成功", icon: "success" });
      switchTab(ROUTES.HOME);
    } catch (error) {
      logger.error("api_error", { func: "auth.register", err: error.message });
      wx.showToast({ title: error.message || "注册失败", icon: "none" });
    } finally {
      this.setData({ submitLoading: false });
      logger.debug("auth_register_submit_end", {});
    }
  },

  onGoLoginTap() {
    logger.debug("auth_register_go_login_start", {});
    redirectTo(ROUTES.AUTH_LOGIN);
    logger.debug("auth_register_go_login_end", {});
  }
});
