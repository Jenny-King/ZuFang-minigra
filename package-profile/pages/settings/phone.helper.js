const { isPhone } = require("../../../utils/validate");

const SMS_CODE_REGEXP = /^\d{6}$/;

function normalizeValue(value = "") {
  return String(value || "").trim();
}

function getPhoneEntryMeta(userInfo = {}) {
  const currentPhone = normalizeValue(userInfo.phone);
  const hasBoundPhone = Boolean(currentPhone);

  return {
    hasBoundPhone,
    currentPhone,
    actionText: hasBoundPhone ? "换绑手机号" : "绑定手机号",
    phonePlaceholder: hasBoundPhone ? "请输入新的手机号" : "请输入要绑定的手机号",
    codePlaceholder: "请输入收到的6位验证码",
    submitText: hasBoundPhone ? "确认换绑" : "确认绑定",
    successText: hasBoundPhone ? "手机号已换绑" : "手机号已绑定"
  };
}

function validatePhoneChangeValue(phone, currentPhone = "") {
  const normalizedPhone = normalizeValue(phone);
  const normalizedCurrentPhone = normalizeValue(currentPhone);

  if (!isPhone(normalizedPhone)) {
    return {
      valid: false,
      message: "手机号格式错误"
    };
  }

  if (normalizedCurrentPhone && normalizedPhone === normalizedCurrentPhone) {
    return {
      valid: false,
      message: "新手机号不能与当前手机号相同"
    };
  }

  return {
    valid: true,
    phone: normalizedPhone
  };
}

function validateSmsCodeValue(code) {
  const normalizedCode = normalizeValue(code);

  if (!normalizedCode) {
    return {
      valid: false,
      message: "验证码不能为空"
    };
  }

  if (!SMS_CODE_REGEXP.test(normalizedCode)) {
    return {
      valid: false,
      message: "请输入6位验证码"
    };
  }

  return {
    valid: true,
    code: normalizedCode
  };
}

module.exports = {
  getPhoneEntryMeta,
  validatePhoneChangeValue,
  validateSmsCodeValue
};
