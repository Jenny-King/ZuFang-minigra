const TAB_ROUTES = {
  HOME: "/pages/home/index",
  PUBLISH: "/pages/publish/index",
  CHAT: "/pages/chat/index",
  PROFILE: "/pages/profile/index"
};

const ROOT_ROUTES = {
  PUBLISH_EDIT: "/pages/publish/edit"
};

const SUBPACKAGE_ROUTES = {
  HOUSE_DETAIL: "/package-house/pages/detail/index",
  AUTH_LOGIN: "/package-auth/pages/login/index",
  AUTH_REGISTER: "/package-auth/pages/register/index",
  AUTH_RESET_PASSWORD: "/package-auth/pages/reset-password/index",
  AUTH_VERIFY: "/package-auth/pages/verify/index",
  PROFILE_SUPPORT: "/package-profile/pages/support-center/index",
  PROFILE_SETTINGS: "/package-profile/pages/settings/index",
  PROFILE_CHANGE_PHONE: "/package-profile/pages/change-phone/index",
  PROFILE_CHANGE_PASSWORD: "/package-profile/pages/change-password/index",
  PROFILE_FAVORITES: "/package-profile/pages/favorites/index",
  PROFILE_HISTORY: "/package-profile/pages/history/index",
  PROFILE_EDIT: "/package-profile/pages/edit-profile/index",
  PROFILE_NOTIFICATIONS: "/package-profile/pages/notifications/index",
  CHAT_DETAIL: "/package-chat/pages/detail/index"
};

const ROUTES = {
  ...TAB_ROUTES,
  ...ROOT_ROUTES,
  ...SUBPACKAGE_ROUTES
};

function buildUrl(path, query = {}) {
  const keys = Object.keys(query);

  if (!keys.length) {
    return path;
  }

  const queryString = keys
    .filter((key) => query[key] !== undefined && query[key] !== null && query[key] !== "")
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(query[key]))}`)
    .join("&");

  return queryString ? `${path}?${queryString}` : path;
}

function navigateTo(path, query = {}) {
  const url = buildUrl(path, query);
  return wx.navigateTo({ url });
}

function redirectTo(path, query = {}) {
  const url = buildUrl(path, query);
  return wx.redirectTo({ url });
}

function switchTab(path) {
  return wx.switchTab({ url: path });
}

function reLaunch(path, query = {}) {
  const url = buildUrl(path, query);
  return wx.reLaunch({ url });
}

module.exports = {
  TAB_ROUTES,
  ROOT_ROUTES,
  SUBPACKAGE_ROUTES,
  ROUTES,
  buildUrl,
  navigateTo,
  redirectTo,
  switchTab,
  reLaunch
};
