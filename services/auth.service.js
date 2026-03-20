const { callCloud } = require("./cloud/call");
const { assertNonEmptyString, assertPlainObject } = require("../utils/assert");

async function wechatLogin(userInfo = {}) {
  assertPlainObject(userInfo, "userInfo");
  return callCloud("auth", "wechatLogin", { userInfo });
}

async function sendSmsCode(phone) {
  assertNonEmptyString(phone, "phone");
  return callCloud("auth", "sendSmsCode", { phone: phone.trim() });
}

async function verifySmsCode(phone, code) {
  assertNonEmptyString(phone, "phone");
  assertNonEmptyString(code, "code");
  return callCloud("auth", "verifySmsCode", {
    phone: phone.trim(),
    code: code.trim()
  });
}

async function loginWithPhoneCode(phone, code) {
  assertNonEmptyString(phone, "phone");
  assertNonEmptyString(code, "code");
  return callCloud("auth", "loginWithPhoneCode", {
    phone: phone.trim(),
    code: code.trim()
  });
}

async function loginWithPassword(phone, password) {
  assertNonEmptyString(phone, "phone");
  assertNonEmptyString(password, "password");
  return callCloud("auth", "loginWithPassword", {
    phone: phone.trim(),
    password
  });
}

async function register(formData = {}) {
  assertPlainObject(formData, "formData");
  return callCloud("auth", "register", formData);
}

async function resetPassword(phone, code, newPassword) {
  assertNonEmptyString(phone, "phone");
  assertNonEmptyString(code, "code");
  assertNonEmptyString(newPassword, "newPassword");

  return callCloud("auth", "resetPassword", {
    phone: phone.trim(),
    code: code.trim(),
    newPassword
  });
}

async function bindWechat() {
  return callCloud("auth", "bindWechat", {});
}

async function unbindWechat() {
  return callCloud("auth", "unbindWechat", {});
}

async function logout() {
  return callCloud("auth", "logout", {});
}

async function submitIdentityProfile(realName, idCard) {
  assertNonEmptyString(realName, "realName");
  assertNonEmptyString(idCard, "idCard");
  return callCloud("auth", "verifyIdentity", {
    realName: realName.trim(),
    idCard: idCard.trim()
  });
}

module.exports = {
  wechatLogin,
  sendSmsCode,
  verifySmsCode,
  loginWithPhoneCode,
  loginWithPassword,
  register,
  resetPassword,
  bindWechat,
  unbindWechat,
  logout,
  submitIdentityProfile,
  verifyIdentity: submitIdentityProfile
};
