const { callCloud } = require("./cloud/call");
const { uploadToCloud } = require("./cloud/upload");
const { USER_ROLE } = require("../config/constants");
const { assertNonEmptyString, assertPlainObject } = require("../utils/assert");

async function getCurrentUser() {
  return callCloud("user", "getCurrentUser", {});
}

async function updateProfile(updateData = {}) {
  assertPlainObject(updateData, "updateData");
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

async function verifyPassword(password) {
  assertNonEmptyString(password, "password");

  return callCloud("user", "verifyPassword", {
    password
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
  verifyPassword,
  changePhone,
  bindEmail,
  switchRole,
  deleteAccount,
  uploadAvatar
};
