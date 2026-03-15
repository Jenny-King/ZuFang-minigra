const userService = require("../services/user.service");
const authUtils = require("../utils/auth");
const { logger } = require("../utils/logger");

function getInitialState() {
  const snapshot = authUtils.getAuthSnapshot();
  return {
    userInfo: snapshot.userInfo,
    accessToken: snapshot.accessToken,
    accountSessions: snapshot.accountSessions,
    activeUserId: snapshot.activeUserId,
    loading: false
  };
}

const userState = getInitialState();
const listeners = new Set();

function getState() {
  return {
    ...userState,
    isLoggedIn: authUtils.hasValidUserId(userState.userInfo)
      && authUtils.hasValidAccessToken(userState.accessToken),
    cachedAccountCount: Array.isArray(userState.accountSessions) ? userState.accountSessions.length : 0
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

function syncStateFromAuth(loading = userState.loading) {
  const snapshot = authUtils.getAuthSnapshot();
  setState({
    userInfo: snapshot.userInfo,
    accessToken: snapshot.accessToken,
    accountSessions: snapshot.accountSessions,
    activeUserId: snapshot.activeUserId,
    loading: Boolean(loading)
  });
  return snapshot.userInfo || null;
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
    authUtils.updateCurrentUserInfo(userInfo);
  } else {
    authUtils.clearActiveLoginState();
  }

  return syncStateFromAuth();
}

function setSession(session = {}) {
  authUtils.saveLoginSession(session);
  return syncStateFromAuth();
}

function switchAccount(userId) {
  authUtils.switchAccount(userId);
  return syncStateFromAuth();
}

function removeAccount(userId) {
  authUtils.removeAccount(userId);
  return syncStateFromAuth(false);
}

function clearUser() {
  authUtils.clearActiveLoginState();
  return syncStateFromAuth(false);
}

function clearAllUsers() {
  authUtils.clearLoginState();
  return syncStateFromAuth(false);
}

function restoreFromStorage() {
  return syncStateFromAuth();
}

async function refreshCurrentUser() {
  setLoading(true);
  logger.info("user_store_refresh_start", {});

  try {
    const userInfo = await userService.getCurrentUser();
    authUtils.updateCurrentUserInfo(userInfo || null);
    syncStateFromAuth(true);
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
  switchAccount,
  removeAccount,
  clearUser,
  clearAllUsers,
  restoreFromStorage,
  refreshCurrentUser
};
