const { IDENTITY_MASK } = require("../config/constants");

function pad(num) {
  return String(num).padStart(2, "0");
}

function formatDate(input) {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function formatPrice(price, suffix = "元/月") {
  if (typeof price !== "number" || Number.isNaN(price)) {
    return `0${suffix}`;
  }
  return `${price}${suffix}`;
}

function maskPhone(phone = "") {
  if (typeof phone !== "string") {
    return "";
  }
  if (!IDENTITY_MASK.PHONE_MASK_REGEXP.test(phone)) {
    return phone;
  }
  return phone.replace(
    IDENTITY_MASK.PHONE_MASK_REGEXP,
    IDENTITY_MASK.PHONE_MASK_REPLACEMENT
  );
}

function maskIdCard(idCard = "") {
  if (typeof idCard !== "string") {
    return "";
  }
  if (!IDENTITY_MASK.IDCARD_MASK_REGEXP.test(idCard)) {
    return idCard;
  }
  return idCard.replace(
    IDENTITY_MASK.IDCARD_MASK_REGEXP,
    IDENTITY_MASK.IDCARD_MASK_REPLACEMENT
  );
}

function fallbackText(text, fallback = "--") {
  if (typeof text !== "string") {
    return fallback;
  }

  const value = text.trim();
  return value ? value : fallback;
}

module.exports = {
  formatDate,
  formatPrice,
  maskPhone,
  maskIdCard,
  fallbackText
};
