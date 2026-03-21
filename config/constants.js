const USER_ROLE = {
  TENANT: "tenant",
  LANDLORD: "landlord",
  ADMIN: "admin"
};

const LOGIN_TYPE = {
  WECHAT: "wx",
  PHONE: "phone"
};

const HOUSE_STATUS = {
  ACTIVE: "active",
  DELETED: "deleted",
  HIDDEN: "hidden"
};

const HOUSE_TYPE = {
  STUDIO: "一室",
  ONE_BEDROOM: "一室一厅",
  TWO_BEDROOM: "两室一厅",
  THREE_PLUS: "三室及以上"
};

const HOUSE_SORT_BY = {
  LATEST: "latest",
  PRICE_ASC: "priceAsc",
  PRICE_DESC: "priceDesc",
  AREA_ASC: "areaAsc",
  AREA_DESC: "areaDesc"
};

const HOUSE_SORT_FIELD = {
  latest: { field: "createTime", order: "desc" },
  priceAsc: { field: "price", order: "asc" },
  priceDesc: { field: "price", order: "desc" },
  areaAsc: { field: "area", order: "asc" },
  areaDesc: { field: "area", order: "desc" }
};


const MESSAGE_TYPE = {
  TEXT: "text",
  IMAGE: "image",
  SYSTEM: "system",
  BOOKING: "booking"
};

const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  REJECTED: "rejected",
  RESCHEDULED: "rescheduled",
  CANCELLED: "cancelled"
};

const BOOKING_TIME_SLOTS = [
  { value: "09:00-10:00", label: "09:00 - 10:00" },
  { value: "10:00-11:00", label: "10:00 - 11:00" },
  { value: "11:00-12:00", label: "11:00 - 12:00" },
  { value: "14:00-15:00", label: "14:00 - 15:00" },
  { value: "15:00-16:00", label: "15:00 - 16:00" },
  { value: "16:00-17:00", label: "16:00 - 17:00" },
  { value: "17:00-18:00", label: "17:00 - 18:00" },
  { value: "19:00-20:00", label: "19:00 - 20:00" }
];

const NOTIFICATION_TYPE = {
  SYSTEM: "system",
  HOUSE_AUDIT: "houseAudit",
  CHAT: "chat"
};

const DATA_STATUS = {
  ACTIVE: "active",
  DISABLED: "disabled"
};

const STORAGE_KEY = {
  USER_INFO: "userInfo",
  ACCESS_TOKEN: "accessToken",
  ACCOUNT_SESSIONS: "accountSessions",
  ACTIVE_ACCOUNT_USER_ID: "activeAccountUserId",
  SETTINGS_PREFERENCES: "settingsPreferences",
  LAST_ROLE: "lastRole",
  CURRENT_LOCATION: "currentLocation"
};

const IDENTITY_MASK = {
  PHONE_MASK_REPLACEMENT: "$1****$2",
  PHONE_MASK_REGEXP: /^(\d{3})\d{4}(\d{4})$/,
  IDCARD_MASK_REGEXP: /^(.{6}).+(.{4})$/,
  IDCARD_MASK_REPLACEMENT: "$1********$2"
};

const REQUEST_DEFAULT = {
  PAGE: 1,
  PAGE_SIZE: 10,
  TIMEOUT: 15000
};

const ERROR_CODE = {
  SUCCESS: 0,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500
};

module.exports = {
  USER_ROLE,
  LOGIN_TYPE,
  HOUSE_STATUS,
  HOUSE_TYPE,
  HOUSE_SORT_BY,
  HOUSE_SORT_FIELD,

  MESSAGE_TYPE,
  BOOKING_STATUS,
  BOOKING_TIME_SLOTS,
  NOTIFICATION_TYPE,
  DATA_STATUS,
  STORAGE_KEY,
  IDENTITY_MASK,
  REQUEST_DEFAULT,
  ERROR_CODE
};
