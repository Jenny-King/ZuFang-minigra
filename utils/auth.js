const { USER_ROLE } = require("../config/constants");
const { ROUTES } = require("../config/routes");
const storage = require("./storage");
const { logger } = require("./logger");

const MAX_ACCOUNT_SESSIONS = 5;

function hasValidUserId(userInfo) {
  return Boolean(userInfo && typeof userInfo.userId === "string" && userInfo.userId.trim());
}

function hasValidAccessToken(accessToken) {
  return typeof accessToken === "string" && accessToken.trim() !== "";
}

function normalizeUserInfo(userInfo) {
  if (!userInfo || typeof userInfo !== "object") {
    return null;
  }

  if (!hasValidUserId(userInfo)) {
    return null;
  }

  return { ...userInfo, userId: userInfo.userId.trim() };
}

function normalizeAccountSession(session = {}) {
  const userInfo = normalizeUserInfo(session.userInfo);
  const accessToken = String(session.accessToken || "").trim();

  if (!userInfo || !hasValidAccessToken(accessToken)) {
    return null;
  }

  return {
    userId: userInfo.userId,
    userInfo,
    accessToken,
    updatedAt: Number(session.updatedAt || Date.now())
  };
}

function readStoredAccountSessions() {
  const accountSessions = storage.getAccountSessions();
  if (!Array.isArray(accountSessions)) {
    return [];
  }

  return accountSessions
    .map((session) => normalizeAccountSession(session))
    .filter(Boolean)
    .sort((left, right) => Number(right.updatedAt || 0) - Number(left.updatedAt || 0));
}

function getLegacyAccountSession() {
  return normalizeAccountSession({
    userInfo: storage.getUserInfo(),
    accessToken: storage.getAccessToken()
  });
}

function syncSingleSession(session) {
  if (session) {
    storage.setUserInfo(session.userInfo);
    storage.setAccessToken(session.accessToken);
    return;
  }

  storage.clearUserInfo();
  storage.clearAccessToken();
}

function persistSessions(accountSessions = [], activeUserId = "") {
  const normalizedSessions = Array.isArray(accountSessions)
    ? accountSessions
      .map((session) => normalizeAccountSession(session))
      .filter(Boolean)
      .slice(0, MAX_ACCOUNT_SESSIONS)
    : [];

  const resolvedActiveUserId = activeUserId
    && normalizedSessions.some((session) => session.userId === activeUserId)
    ? activeUserId
    : normalizedSessions[0]?.userId || "";
  const activeSession = normalizedSessions.find((session) => session.userId === resolvedActiveUserId) || null;

  if (normalizedSessions.length) {
    storage.setAccountSessions(normalizedSessions);
  } else {
    storage.clearAccountSessions();
  }

  if (resolvedActiveUserId) {
    storage.setActiveAccountUserId(resolvedActiveUserId);
  } else {
    storage.clearActiveAccountUserId();
  }

  syncSingleSession(activeSession);
  return activeSession;
}

function ensureAccountSessions() {
  const storedSessions = readStoredAccountSessions();
  if (storedSessions.length) {
    const activeUserId = storage.getActiveAccountUserId();
    persistSessions(storedSessions, activeUserId);
    return storedSessions;
  }

  const legacySession = getLegacyAccountSession();
  if (!legacySession) {
    persistSessions([], "");
    return [];
  }

  persistSessions([legacySession], legacySession.userId);
  return [legacySession];
}

function getAccountSessions() {
  return ensureAccountSessions();
}

function getActiveAccountUserId() {
  const accountSessions = ensureAccountSessions();
  if (!accountSessions.length) {
    return "";
  }

  const storedActiveUserId = storage.getActiveAccountUserId();
  return accountSessions.some((session) => session.userId === storedActiveUserId)
    ? storedActiveUserId
    : accountSessions[0].userId;
}

function getActiveSession() {
  const accountSessions = ensureAccountSessions();
  if (!accountSessions.length) {
    syncSingleSession(null);
    return null;
  }

  const activeUserId = getActiveAccountUserId();
  const activeSession = accountSessions.find((session) => session.userId === activeUserId) || accountSessions[0];
  persistSessions(accountSessions, activeSession.userId);
  return activeSession;
}

function getAuthSnapshot() {
  const accountSessions = ensureAccountSessions();
  const activeSession = getActiveSession();

  return {
    userInfo: activeSession ? activeSession.userInfo : null,
    accessToken: activeSession ? activeSession.accessToken : "",
    accountSessions,
    activeUserId: activeSession ? activeSession.userId : ""
  };
}

function getLoginUser() {
  return getAuthSnapshot().userInfo;
}

function getAccessToken() {
  return getAuthSnapshot().accessToken;
}

function saveLoginSession(session = {}) {
  const normalizedSession = normalizeAccountSession(session);
  if (!normalizedSession) {
    clearLoginState();
    return false;
  }

  const accountSessions = ensureAccountSessions().filter((item) => item.userId !== normalizedSession.userId);
  const nextSession = {
    ...normalizedSession,
    updatedAt: Date.now()
  };
  persistSessions([nextSession, ...accountSessions], normalizedSession.userId);
  return true;
}

function updateCurrentUserInfo(userInfo) {
  const normalizedUserInfo = normalizeUserInfo(userInfo);
  const activeSession = getActiveSession();
  if (!normalizedUserInfo || !activeSession) {
    return false;
  }

  const accountSessions = ensureAccountSessions().map((session) => (session.userId === activeSession.userId
    ? {
      ...session,
      userInfo: {
        ...session.userInfo,
        ...normalizedUserInfo,
        userId: session.userId
      },
      updatedAt: Date.now()
    }
    : session));
  persistSessions(accountSessions, activeSession.userId);
  return true;
}

function switchAccount(userId) {
  const nextUserId = String(userId || "").trim();
  if (!nextUserId) {
    return null;
  }

  const accountSessions = ensureAccountSessions();
  const targetSession = accountSessions.find((session) => session.userId === nextUserId);
  if (!targetSession) {
    return null;
  }

  const reorderedSessions = [
    {
      ...targetSession,
      updatedAt: Date.now()
    },
    ...accountSessions.filter((session) => session.userId !== nextUserId)
  ];
  persistSessions(reorderedSessions, nextUserId);
  return targetSession;
}

function removeAccount(userId) {
  const targetUserId = String(userId || "").trim();
  const accountSessions = ensureAccountSessions();
  const remainingSessions = accountSessions.filter((session) => session.userId !== targetUserId);

  if (remainingSessions.length === accountSessions.length) {
    return getActiveSession();
  }

  return persistSessions(remainingSessions, storage.getActiveAccountUserId());
}

function clearActiveLoginState() {
  const activeSession = getActiveSession();
  if (!activeSession) {
    clearLoginState();
    return null;
  }

  return removeAccount(activeSession.userId);
}

function clearLoginState() {
  persistSessions([], "");
  return true;
}

function isLoggedIn() {
  const activeSession = getActiveSession();
  return Boolean(activeSession);
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
  getAccountSessions,
  getActiveAccountUserId,
  getActiveSession,
  getAuthSnapshot,
  saveLoginSession,
  updateCurrentUserInfo,
  switchAccount,
  removeAccount,
  clearActiveLoginState,
  clearLoginState,
  hasValidUserId,
  hasValidAccessToken,
  isLoggedIn,
  hasRole,
  canPublishHouse,
  requireLogin
};
