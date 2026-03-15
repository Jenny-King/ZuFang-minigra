const { USER_ROLE } = require("../config/constants");

const PHONE_REGEXP = /^1\d{10}$/;
const PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W_]{6,20}$/;
const IDCARD_REGEXP = /(^\d{15}$)|(^\d{17}[\dXx]$)/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim() !== "";
}

function isPhone(value) {
  return isNonEmptyString(value) && PHONE_REGEXP.test(value.trim());
}

function isPassword(value) {
  return isNonEmptyString(value) && PASSWORD_REGEXP.test(value);
}

function isIdCard(value) {
  return isNonEmptyString(value) && IDCARD_REGEXP.test(value.trim());
}

function isUserRole(value) {
  return [USER_ROLE.TENANT, USER_ROLE.LANDLORD, USER_ROLE.ADMIN].includes(value);
}

function isPositiveNumber(value) {
  return typeof value === "number" && !Number.isNaN(value) && value > 0;
}

function validateRegisterForm(formData = {}) {
  if (!isNonEmptyString(formData.nickName)) {
    return { valid: false, message: "昵称不能为空" };
  }
  if (!isPhone(formData.phone)) {
    return { valid: false, message: "手机号格式不正确" };
  }
  if (!isPassword(formData.password)) {
    return { valid: false, message: "密码需6-20位且至少包含字母和数字" };
  }
  if (!isUserRole(formData.role || USER_ROLE.TENANT)) {
    return { valid: false, message: "角色不合法" };
  }
  return { valid: true, message: "" };
}

function validateHouseForm(formData = {}) {
  if (!isNonEmptyString(formData.title)) {
    return { valid: false, message: "房源标题不能为空" };
  }
  if (!isPositiveNumber(Number(formData.price))) {
    return { valid: false, message: "租金必须大于 0" };
  }
  if (!isNonEmptyString(formData.type)) {
    return { valid: false, message: "户型不能为空" };
  }
  if (!isNonEmptyString(formData.address)) {
    return { valid: false, message: "地址不能为空" };
  }
  return { valid: true, message: "" };
}

module.exports = {
  isNonEmptyString,
  isPhone,
  isPassword,
  isIdCard,
  isUserRole,
  isPositiveNumber,
  validateRegisterForm,
  validateHouseForm
};
