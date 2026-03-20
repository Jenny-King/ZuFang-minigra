const { USER_ROLE } = require("../config/constants");
const { ROUTES } = require("../config/routes");
const { logger } = require("./logger");

const MAX_ACCOUNT_SESSIONS = 5;
const PERSIST_DEBOUNCE_MS = 500;

// 合并存储键 — 将 4 个独立 key 合并为 1 个，冷启动只需 1 次 getStorageSync
const _AUTH_STORAGE_KEY = "__auth_state__";

// Legacy keys（仅迁移时读取一次，之后不再使用）
const _LEGACY_KEYS = {
  USER_INFO: "userInfo",
  ACCESS_TOKEN: "accessToken",
  ACCOUNT_SESSIONS: "accountSessions",
  ACTIVE_ACCOUNT_USER_ID: "activeAccountUserId"
};

// ---------------------------------------------------------------------------
// 内存首位单例 — 所有 getter/setter 只操作此对象
// ---------------------------------------------------------------------------
const _MEM_SESSIONS = {
  sessions: [],        // normalizedAccountSession[]
  activeUserId: "",
  initialized: false
};
let _persistTimer = null;

// ---------------------------------------------------------------------------
// 纯工具函数（无副作用、无 I/O）
// ---------------------------------------------------------------------------
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

function resolveActiveUserId(sessions, preferredUserId) {
  if (preferredUserId && sessions.some((s) => s.userId === preferredUserId)) {
    return preferredUserId;
  }
  return sessions[0]?.userId || "";
}

function findActiveSession(sessions, activeUserId) {
  if (!sessions.length) {
    return null;
  }
  return sessions.find((s) => s.userId === activeUserId) || sessions[0];
}

// ---------------------------------------------------------------------------
// 磁盘 I/O — 一次同步读（冷启动）+ 异步防抖写
// ---------------------------------------------------------------------------

/**
 * 冷启动读取 — 唯一的 getStorageSync 调用点
 * 优先读合并键，回退到 legacy 4 键迁移
 */
function readFromDisk() {
  // 1. 尝试读合并键（新格式）
  try {
    const blob = wx.getStorageSync(_AUTH_STORAGE_KEY);
    if (blob && typeof blob === "object" && Array.isArray(blob.sessions)) {
      const sessions = blob.sessions
        .map((s) => normalizeAccountSession(s))
        .filter(Boolean)
        .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
      return {
        sessions,
        activeUserId: resolveActiveUserId(sessions, blob.activeUserId || ""),
        migrated: false
      };
    }
  } catch (e) {
    logger.warn("auth_read_blob_failed", { error: e.message });
  }

  // 2. 回退：读 legacy 4 个独立键（仅首次迁移）
  try {
    let legacySessions = wx.getStorageSync(_LEGACY_KEYS.ACCOUNT_SESSIONS);
    if (Array.isArray(legacySessions) && legacySessions.length) {
      const sessions = legacySessions
        .map((s) => normalizeAccountSession(s))
        .filter(Boolean)
        .sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
      const activeUserId = String(wx.getStorageSync(_LEGACY_KEYS.ACTIVE_ACCOUNT_USER_ID) || "").trim();
      return {
        sessions,
        activeUserId: resolveActiveUserId(sessions, activeUserId),
        migrated: true
      };
    }

    // 3. 再回退：单用户旧格式
    const userInfo = wx.getStorageSync(_LEGACY_KEYS.USER_INFO);
    const accessToken = wx.getStorageSync(_LEGACY_KEYS.ACCESS_TOKEN);
    const session = normalizeAccountSession({ userInfo, accessToken });
    if (session) {
      return {
        sessions: [session],
        activeUserId: session.userId,
        migrated: true
      };
    }
  } catch (e) {
    logger.warn("auth_read_legacy_failed", { error: e.message });
  }

  return { sessions: [], activeUserId: "", migrated: false };
}

/**
 * 异步落盘 — 将 _MEM_SESSIONS 写入合并键，零 setStorageSync
 */
function _flushToStorage() {
  const blob = {
    sessions: _MEM_SESSIONS.sessions,
    activeUserId: _MEM_SESSIONS.activeUserId,
    updatedAt: Date.now()
  };

  wx.setStorage({
    key: _AUTH_STORAGE_KEY,
    data: blob,
    fail: (err) => {
      logger.error("auth_flush_failed", { error: err?.errMsg || "unknown" });
    }
  });

  // 同步写入 legacy 单用户键（兼容其他读取 userInfo/accessToken 的模块）
  const activeSession = findActiveSession(_MEM_SESSIONS.sessions, _MEM_SESSIONS.activeUserId);
  if (activeSession) {
    wx.setStorage({ key: _LEGACY_KEYS.USER_INFO, data: activeSession.userInfo });
    wx.setStorage({ key: _LEGACY_KEYS.ACCESS_TOKEN, data: activeSession.accessToken });
  } else {
    wx.removeStorage({ key: _LEGACY_KEYS.USER_INFO });
    wx.removeStorage({ key: _LEGACY_KEYS.ACCESS_TOKEN });
  }
}

function schedulePersist() {
  if (_persistTimer !== null) {
    clearTimeout(_persistTimer);
  }
  _persistTimer = setTimeout(() => {
    _persistTimer = null;
    _flushToStorage();
  }, PERSIST_DEBOUNCE_MS);
}

// ---------------------------------------------------------------------------
// 初始化 — 整个运行期仅执行一次磁盘读
// ---------------------------------------------------------------------------
function initializeCache() {
  if (_MEM_SESSIONS.initialized) {
    return;
  }

  const disk = readFromDisk();
  _MEM_SESSIONS.sessions = disk.sessions;
  _MEM_SESSIONS.activeUserId = disk.activeUserId;
  _MEM_SESSIONS.initialized = true;

  // 如果是从 legacy 迁移，异步写入新格式
  if (disk.migrated && disk.sessions.length) {
    schedulePersist();
  }
}

// ---------------------------------------------------------------------------
// 内存写入 — 立即更新 _MEM_SESSIONS → 500ms 防抖落盘
// ---------------------------------------------------------------------------
function updateMemAndPersist(sessions, activeUserId) {
  const normalizedSessions = (Array.isArray(sessions) ? sessions : [])
    .map((s) => normalizeAccountSession(s))
    .filter(Boolean)
    .slice(0, MAX_ACCOUNT_SESSIONS);

  const resolvedActiveUserId = resolveActiveUserId(normalizedSessions, activeUserId);

  _MEM_SESSIONS.sessions = normalizedSessions;
  _MEM_SESSIONS.activeUserId = resolvedActiveUserId;
  _MEM_SESSIONS.initialized = true;

  schedulePersist();

  return findActiveSession(normalizedSessions, resolvedActiveUserId);
}

// ---------------------------------------------------------------------------
// 公开读取接口 — Pure Getter, 零 I/O, 零副作用
// ---------------------------------------------------------------------------
function getAccountSessions() {
  initializeCache();
  return _MEM_SESSIONS.sessions;
}

function getActiveAccountUserId() {
  initializeCache();
  return _MEM_SESSIONS.activeUserId;
}

function getActiveSession() {
  initializeCache();
  return findActiveSession(_MEM_SESSIONS.sessions, _MEM_SESSIONS.activeUserId);
}

function getAuthSnapshot() {
  const activeSession = getActiveSession();
  return {
    userInfo: activeSession ? activeSession.userInfo : null,
    accessToken: activeSession ? activeSession.accessToken : "",
    accountSessions: _MEM_SESSIONS.sessions,
    activeUserId: activeSession ? activeSession.userId : ""
  };
}

function getLoginUser() {
  const s = getActiveSession();
  return s ? s.userInfo : null;
}

function getAccessToken() {
  const s = getActiveSession();
  return s ? s.accessToken : "";
}

function isLoggedIn() {
  return Boolean(getActiveSession());
}

function hasRole(role) {
  const userInfo = getLoginUser();
  return Boolean(userInfo && userInfo.role === role);
}

function canPublishHouse() {
  return hasRole(USER_ROLE.LANDLORD) || hasRole(USER_ROLE.ADMIN);
}

// ---------------------------------------------------------------------------
// 公开写入接口 — 内存即时更新 + 异步防抖落盘
// ---------------------------------------------------------------------------
function saveLoginSession(session = {}) {
  const normalizedSession = normalizeAccountSession(session);
  if (!normalizedSession) {
    clearLoginState();
    return false;
  }

  const currentSessions = getAccountSessions().filter((item) => item.userId !== normalizedSession.userId);
  updateMemAndPersist(
    [{ ...normalizedSession, updatedAt: Date.now() }, ...currentSessions],
    normalizedSession.userId
  );
  return true;
}

function updateCurrentUserInfo(userInfo) {
  const normalizedUserInfo = normalizeUserInfo(userInfo);
  const activeSession = getActiveSession();
  if (!normalizedUserInfo || !activeSession) {
    return false;
  }

  const updatedSessions = getAccountSessions().map((s) => (s.userId === activeSession.userId
    ? {
      ...s,
      userInfo: { ...s.userInfo, ...normalizedUserInfo, userId: s.userId },
      updatedAt: Date.now()
    }
    : s));
  updateMemAndPersist(updatedSessions, activeSession.userId);
  return true;
}

function switchAccount(userId) {
  const nextUserId = String(userId || "").trim();
  if (!nextUserId) {
    return null;
  }

  const sessions = getAccountSessions();
  const targetSession = sessions.find((s) => s.userId === nextUserId);
  if (!targetSession) {
    return null;
  }

  updateMemAndPersist(
    [{ ...targetSession, updatedAt: Date.now() }, ...sessions.filter((s) => s.userId !== nextUserId)],
    nextUserId
  );
  return targetSession;
}

function removeAccount(userId) {
  const targetUserId = String(userId || "").trim();
  const sessions = getAccountSessions();
  const remaining = sessions.filter((s) => s.userId !== targetUserId);
  if (remaining.length === sessions.length) {
    return getActiveSession();
  }
  return updateMemAndPersist(remaining, _MEM_SESSIONS.activeUserId);
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
  updateMemAndPersist([], "");
  return true;
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

// ---------------------------------------------------------------------------
// 强制重载（供 user.store.js 使用）
// ---------------------------------------------------------------------------
function restoreFromStorage() {
  if (_persistTimer !== null) {
    clearTimeout(_persistTimer);
    _persistTimer = null;
  }
  _MEM_SESSIONS.initialized = false;
  initializeCache();
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
  requireLogin,
  restoreFromStorage
};
