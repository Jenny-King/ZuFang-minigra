/**
 * utils/assert.js
 * 统一断言工具 — 全项目唯一断言来源
 *
 * 调用方：全部 services/*.js、services/cloud/*.js
 */

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 必须是非空字符串`);
  }
}

function assertPlainObject(value, fieldName) {
  if (!value || Object.prototype.toString.call(value) !== "[object Object]") {
    throw new Error(`${fieldName} 必须是对象`);
  }
}

function assertNumber(value, fieldName) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    throw new Error(`${fieldName} 必须是数字`);
  }
}

function assertPositiveInteger(value, fieldName) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${fieldName} 必须是正整数`);
  }
}

module.exports = {
  assertNonEmptyString,
  assertPlainObject,
  assertNumber,
  assertPositiveInteger
};
