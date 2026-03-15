const { callCloud } = require("./cloud/call");
const { uploadToCloud } = require("./cloud/upload");
const { USER_ROLE } = require("../config/constants");

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

async function getCurrentUser() {
  return callCloud("user", "getCurrentUser", {});
}

async function updateProfile(updateData = {}) {
  assertObject(updateData, "updateData");
  return callCloud("user", "updateProfile", updateData);
}

async function changePassword(oldPassword, newPassword) {
  assertNonEmptyString(oldPassword, "oldPassword");
  assertNonEmptyString(newPassword, "newPassword");

  return callCloud("user", "changePassword", {
    oldPassword,
    newPassword
  });
}

async function changePhone(phone, code) {
  assertNonEmptyString(phone, "phone");
  assertNonEmptyString(code, "code");

  return callCloud("user", "changePhone", {
    phone: phone.trim(),
    code: code.trim()
  });
}

async function bindEmail(email) {
  assertNonEmptyString(email, "email");

  return callCloud("user", "bindEmail", {
    email: email.trim().toLowerCase()
  });
}

async function switchRole(role) {
  assertNonEmptyString(role, "role");

  const normalizedRole = role.trim();
  const allowedRoles = [USER_ROLE.TENANT, USER_ROLE.LANDLORD];

  if (!allowedRoles.includes(normalizedRole)) {
    throw new Error("role 仅支持 tenant 或 landlord");
  }

  return callCloud("user", "switchRole", { role: normalizedRole });
}

async function deleteAccount() {
  return callCloud("user", "deleteAccount", {});
}

async function uploadAvatar(filePath, cloudPath) {
  assertNonEmptyString(filePath, "filePath");
  assertNonEmptyString(cloudPath, "cloudPath");
  return uploadToCloud(filePath, cloudPath);
}

module.exports = {
  getCurrentUser,
  updateProfile,
  changePassword,
  changePhone,
  bindEmail,
  switchRole,
  deleteAccount,
  uploadAvatar
};
