

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
  const regexp = /^(\d{3})\d{4}(\d{4})$/;
  if (!regexp.test(phone)) {
    return phone;
  }
  return phone.replace(regexp, "$1****$2");
}

function maskIdCard(idCard = "") {
  if (typeof idCard !== "string") {
    return "";
  }
  const regexp = /^(.{6}).+(.{4})$/;
  if (!regexp.test(idCard)) {
    return idCard;
  }
  return idCard.replace(regexp, "$1********$2");
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
