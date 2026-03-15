const { ROUTES } = require("../config/routes");
const authUtils = require("../utils/auth");
const { logger } = require("../utils/logger");

module.exports = Behavior({
  methods: {
    ensureLogin(options = {}) {
      const {
        redirect = true,
        showToast = true,
        toastTitle = "请先登录"
      } = options;

      const isLoggedIn = authUtils.isLoggedIn();
      if (isLoggedIn) {
        return true;
      }

      logger.warn("auth_required_intercept", { route: this.route || "", redirect });

      if (showToast) {
        wx.showToast({
          title: toastTitle,
          icon: "none"
        });
      }

      if (redirect) {
        wx.navigateTo({
          url: ROUTES.AUTH_LOGIN
        });
      }

      return false;
    },

    getCurrentLoginUser() {
      return authUtils.getLoginUser();
    }
  }
});
