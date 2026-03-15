const { callCloud } = require("./cloud/call");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

function assertObject(value, fieldName) {
  if (!value || Object.prototype.toString.call(value) !== "[object Object]") {
    throw new Error(`${fieldName} 必须是对象`);
  }
}

async function wechatLogin(userInfo = {}) {
  assertObject(userInfo, "userInfo");
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
  assertObject(formData, "formData");
  return callCloud("auth", "register", formData);
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

async function verifyIdentity(realName, idCard) {
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
  bindWechat,
  unbindWechat,
  logout,
  verifyIdentity
};
