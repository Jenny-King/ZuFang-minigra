const userService = require("../services/user.service");
const authUtils = require("../utils/auth");
const storage = require("../utils/storage");
const { logger } = require("../utils/logger");

const userState = {
  userInfo: authUtils.getLoginUser(),
  accessToken: authUtils.getAccessToken(),
  loading: false
};

const listeners = new Set();

function getState() {
  return {
    ...userState,
    isLoggedIn: authUtils.hasValidUserId(userState.userInfo)
      && authUtils.hasValidAccessToken(userState.accessToken)
  };
}

function notify() {
  const snapshot = getState();
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      logger.warn("user_store_listener_error", { error: error.message });
    }
  });
}

function setState(patch = {}) {
  Object.assign(userState, patch);
  notify();
}

function subscribe(listener) {
  if (typeof listener !== "function") {
    throw new Error("listener 必须是函数");
  }

  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setLoading(loading) {
  setState({ loading: Boolean(loading) });
}

function setUserInfo(userInfo) {
  if (userInfo) {
    storage.setUserInfo(userInfo);
  } else {
    storage.clearUserInfo();
  }

  setState({ userInfo: userInfo || null });
}

function setSession(session = {}) {
  const userInfo = session.userInfo || null;
  const accessToken = String(session.accessToken || "");

  if (userInfo) {
    storage.setUserInfo(userInfo);
  } else {
    storage.clearUserInfo();
  }

  if (accessToken) {
    storage.setAccessToken(accessToken);
  } else {
    storage.clearAccessToken();
  }

  setState({
    userInfo,
    accessToken
  });
}

function clearUser() {
  storage.clearUserInfo();
  storage.clearAccessToken();
  setState({
    userInfo: null,
    accessToken: "",
    loading: false
  });
}

function restoreFromStorage() {
  const userInfo = storage.getUserInfo();
  const accessToken = storage.getAccessToken();
  setState({
    userInfo: userInfo || null,
    accessToken: accessToken || ""
  });
  return userInfo || null;
}

async function refreshCurrentUser() {
  setLoading(true);
  logger.info("user_store_refresh_start", {});

  try {
    const userInfo = await userService.getCurrentUser();
    setUserInfo(userInfo || null);
    logger.info("user_store_refresh_success", {
      hasUser: authUtils.hasValidUserId(userInfo)
    });
    return userInfo || null;
  } catch (error) {
    logger.error("user_store_refresh_failed", { error: error.message });
    if (error && error.code === 401) {
      clearUser();
    }
    throw error;
  } finally {
    setLoading(false);
  }
}

module.exports = {
  getState,
  subscribe,
  setState,
  setLoading,
  setUserInfo,
  setSession,
  clearUser,
  restoreFromStorage,
  refreshCurrentUser
};
