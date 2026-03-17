const authService = require("./auth.service");
const userService = require("./user.service");
const storage = require("../utils/storage");

const DEFAULT_SETTINGS = {
  notification: {
    chatNotice: true,
    systemNotice: true
  },
  privacy: {
    maskPhone: true,
    personalizedLocation: true
  }
};

function cloneDefaultSettings() {
  return JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
}

function getSettingsPreferences() {
  const storedPreferences = storage.getSettingsPreferences();
  return {
    notification: {
      ...cloneDefaultSettings().notification,
      ...(storedPreferences?.notification || {})
    },
    privacy: {
      ...cloneDefaultSettings().privacy,
      ...(storedPreferences?.privacy || {})
    }
  };
}

function saveSettingsPreferences(preferences = {}) {
  const nextPreferences = {
    notification: {
      ...cloneDefaultSettings().notification,
      ...(preferences.notification || {})
    },
    privacy: {
      ...cloneDefaultSettings().privacy,
      ...(preferences.privacy || {})
    }
  };
  storage.setSettingsPreferences(nextPreferences);
  return nextPreferences;
}

async function changePassword(oldPassword, newPassword) {
  return userService.changePassword(oldPassword, newPassword);
}

async function verifyPassword(password) {
  return userService.verifyPassword(password);
}

async function changePhone(phone, code) {
  return userService.changePhone(phone, code);
}

async function sendSmsCode(phone) {
  return authService.sendSmsCode(phone);
}

async function bindEmail(email) {
  return userService.bindEmail(email);
}

async function bindWechat() {
  return authService.bindWechat();
}

async function unbindWechat() {
  return authService.unbindWechat();
}

async function submitIdentityProfile(realName, idCard) {
  return authService.submitIdentityProfile(realName, idCard);
}

async function deleteAccount() {
  return userService.deleteAccount();
}

module.exports = {
  DEFAULT_SETTINGS,
  getSettingsPreferences,
  saveSettingsPreferences,
  changePassword,
  verifyPassword,
  changePhone,
  sendSmsCode,
  bindEmail,
  bindWechat,
  unbindWechat,
  submitIdentityProfile,
  deleteAccount
};
