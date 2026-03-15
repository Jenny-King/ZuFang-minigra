const { getEnvConfig } = require("./config/env");
const appStore = require("./store/app.store");
const userStore = require("./store/user.store");
const bootstrapService = require("./services/bootstrap.service");
const authUtils = require("./utils/auth");
const { logger } = require("./utils/logger");

App({
  globalData: {
    version: "1.0.0"
  },

  onLaunch() {
    logger.info("app_launch_start", {});

    const envConfig = getEnvConfig();
    appStore.refreshEnv();

    try {
      wx.cloud.init({
        env: envConfig.cloudEnvId,
        traceUser: true
      });
      logger.info("cloud_init_success", {
        envAlias: envConfig.envAlias,
        wxEnvVersion: envConfig.wxEnvVersion
      });
    } catch (error) {
      logger.error("cloud_init_failed", { error: error.message });
      appStore.setLastError(error.message);
    }

    userStore.restoreFromStorage();
    this.restoreCachedSessionChain();
    appStore.setInitialized(true);
    logger.info("app_launch_end", {});
  },

  async restoreCachedSessionChain() {
    if (!authUtils.isLoggedIn()) {
      return;
    }

    try {
      await userStore.refreshCurrentUser();
    } catch (error) {
      logger.warn("app_restore_session_failed", { error: error.message });
      const nextUser = userStore.clearUser();
      if (!nextUser || !authUtils.isLoggedIn()) {
        return;
      }

      try {
        await userStore.refreshCurrentUser();
      } catch (retryError) {
        logger.warn("app_restore_session_retry_failed", { error: retryError.message });
        userStore.clearUser();
      }
    }
  },

  async manualBootstrap() {
    appStore.setBootstrapping(true);
    appStore.setLastError(null);
    logger.info("manual_bootstrap_start", {});

    try {
      const result = await bootstrapService.initAll();
      logger.info("manual_bootstrap_success", {
        createdCollections: result.createdCollections || [],
        failedCollections: result.failedCollections || [],
        regions: result.regions || null
      });
      return result;
    } catch (error) {
      logger.error("manual_bootstrap_failed", { error: error.message });
      appStore.setLastError(error.message);
      throw error;
    } finally {
      appStore.setBootstrapping(false);
    }
  },

  onShow() {
    logger.debug("app_show_start", {});
    logger.debug("app_show_end", {});
  },

  onHide() {
    logger.debug("app_hide_start", {});
    logger.debug("app_hide_end", {});
  }
});
