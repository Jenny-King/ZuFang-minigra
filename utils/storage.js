const { STORAGE_KEY } = require("../config/constants");
const { logger } = require("./logger");

function getStorageSync(key, defaultValue = null) {
  try {
    const value = wx.getStorageSync(key);
    return value === "" || value === undefined ? defaultValue : value;
  } catch (error) {
    logger.error("storage_get_sync_failed", { key, error: error.message });
    return defaultValue;
  }
}

function setStorageSync(key, value) {
  try {
    wx.setStorageSync(key, value);
    return true;
  } catch (error) {
    logger.error("storage_set_sync_failed", { key, error: error.message });
    return false;
  }
}

function removeStorageSync(key) {
  try {
    wx.removeStorageSync(key);
    return true;
  } catch (error) {
    logger.error("storage_remove_sync_failed", { key, error: error.message });
    return false;
  }
}

function clearStorageSync() {
  try {
    wx.clearStorageSync();
    return true;
  } catch (error) {
    logger.error("storage_clear_sync_failed", { error: error.message });
    return false;
  }
}

async function getStorage(key) {
  try {
    const result = await wx.getStorage({ key });
    return result.data;
  } catch (error) {
    logger.warn("storage_get_failed", { key, error: error.message });
    return null;
  }
}

async function setStorage(key, data) {
  try {
    await wx.setStorage({ key, data });
    return true;
  } catch (error) {
    logger.error("storage_set_failed", { key, error: error.message });
    return false;
  }
}

async function removeStorage(key) {
  try {
    await wx.removeStorage({ key });
    return true;
  } catch (error) {
    logger.error("storage_remove_failed", { key, error: error.message });
    return false;
  }
}

function getUserInfo() {
  return getStorageSync(STORAGE_KEY.USER_INFO, null);
}

function setUserInfo(userInfo) {
  return setStorageSync(STORAGE_KEY.USER_INFO, userInfo);
}

function clearUserInfo() {
  return removeStorageSync(STORAGE_KEY.USER_INFO);
}

function getAccessToken() {
  return getStorageSync(STORAGE_KEY.ACCESS_TOKEN, "");
}

function setAccessToken(accessToken) {
  return setStorageSync(STORAGE_KEY.ACCESS_TOKEN, String(accessToken || ""));
}

function clearAccessToken() {
  return removeStorageSync(STORAGE_KEY.ACCESS_TOKEN);
}

module.exports = {
  getStorageSync,
  setStorageSync,
  removeStorageSync,
  clearStorageSync,
  getStorage,
  setStorage,
  removeStorage,
  getUserInfo,
  setUserInfo,
  clearUserInfo,
  getAccessToken,
  setAccessToken,
  clearAccessToken
};
