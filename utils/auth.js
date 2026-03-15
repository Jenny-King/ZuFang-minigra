const { USER_ROLE } = require("../config/constants");
const { ROUTES } = require("../config/routes");
const storage = require("./storage");
const { logger } = require("./logger");

function getLoginUser() {
  return storage.getUserInfo();
}

function getAccessToken() {
  return storage.getAccessToken();
}

function saveLoginSession(session = {}) {
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

  return true;
}

function clearLoginState() {
  storage.clearUserInfo();
  storage.clearAccessToken();
  return true;
}

function hasValidUserId(userInfo) {
  return Boolean(userInfo && typeof userInfo.userId === "string" && userInfo.userId.trim());
}

function hasValidAccessToken(accessToken) {
  return typeof accessToken === "string" && accessToken.trim() !== "";
}

function isLoggedIn() {
  const userInfo = getLoginUser();
  const accessToken = getAccessToken();
  return hasValidUserId(userInfo) && hasValidAccessToken(accessToken);
}

function hasRole(role) {
  const userInfo = getLoginUser();
  return Boolean(userInfo && userInfo.role === role);
}

function canPublishHouse() {
  return hasRole(USER_ROLE.LANDLORD) || hasRole(USER_ROLE.ADMIN);
}

function requireLogin(options = {}) {
  const { redirect = true } = options;

  if (isLoggedIn()) {
    return true;
  }

  logger.warn("auth_required", { redirect });

  if (redirect) {
    wx.navigateTo({ url: ROUTES.AUTH_LOGIN });
  }

  return false;
}

module.exports = {
  getLoginUser,
  getAccessToken,
  saveLoginSession,
  clearLoginState,
  hasValidUserId,
  hasValidAccessToken,
  isLoggedIn,
  hasRole,
  canPublishHouse,
  requireLogin
};
