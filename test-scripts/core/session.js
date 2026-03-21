const { ROUTES } = require("../../config/routes");
const {
  assert,
  reLaunchAndWait,
  sleep,
  switchTabAndWait,
  waitForCurrentRoute,
  waitForPageData
} = require("./base");
const { getPreparedContext } = require("./cloud-test-data");

function buildSessionEntries(session) {
  const userInfo = session.userInfo || {};
  const accessToken = String(session.accessToken || "").trim();
  const normalizedSession = {
    userId: String(userInfo.userId || "").trim(),
    userInfo,
    accessToken,
    updatedAt: Date.now()
  };

  return [
    {
      key: "__auth_state__",
      value: {
        sessions: [normalizedSession],
        activeUserId: normalizedSession.userId,
        updatedAt: Date.now()
      }
    },
    { key: "userInfo", value: userInfo },
    { key: "accessToken", value: accessToken },
    { key: "accountSessions", value: [normalizedSession] },
    { key: "activeAccountUserId", value: normalizedSession.userId }
  ];
}

async function clearStorage(miniProgram) {
  await miniProgram.evaluate(() => {
    wx.clearStorageSync();
    return true;
  });
  await sleep(300);
}

async function applySessionToStorage(miniProgram, session) {
  const entries = buildSessionEntries(session);
  await miniProgram.evaluate((storageEntries) => {
    storageEntries.forEach((item) => {
      wx.setStorageSync(item.key, item.value);
    });
    return true;
  }, entries);
  await sleep(300);
}

async function waitForProfileLoginState(profilePage, account) {
  return waitForPageData(profilePage, (data) => (
    Boolean(data && data.isLoggedIn)
    && Boolean(data.userInfo && data.userInfo.userId)
    && String(data.userInfo.phone || "") === String(account.phone || "")
  ), `账号 ${account.phone} 登录态建立`);
}

async function finalizeProfileState(profilePage) {
  await profilePage.callMethod("restoreUserInfo");
  await sleep(400);
  await profilePage.callMethod("refreshCurrentUser");
  await sleep(1000);
  await profilePage.callMethod("refreshDashboardStats");
  await sleep(1200);
}

async function ensureLoggedOut(miniProgram) {
  await clearStorage(miniProgram);
  return null;
}

async function ensureLoggedInByInjection(miniProgram, options = {}) {
  const accountKey = String(options.accountKey || "tenant").trim();
  return loginByPasswordThroughUi(miniProgram, accountKey);
}

async function loginByPasswordThroughUi(miniProgram, accountKey = "tenant") {
  const context = await getPreparedContext();
  const account = context.accountsByKey[accountKey];

  assert(account, `未找到测试账号配置: ${accountKey}`);

  await ensureLoggedOut(miniProgram);

  const loginPage = await reLaunchAndWait(miniProgram, ROUTES.AUTH_LOGIN);
  await loginPage.setData({
    mode: "password",
    phone: account.phone,
    password: account.password,
    code: "",
    errors: {},
    submitLoading: false,
    sendingCode: false
  });
  await loginPage.callMethod("onSubmitTap");

  await waitForCurrentRoute(miniProgram, ROUTES.HOME, 20000);

  const profilePage = await switchTabAndWait(miniProgram, ROUTES.PROFILE);
  const profileData = await waitForProfileLoginState(profilePage, account);
  await finalizeProfileState(profilePage);

  return {
    ...context,
    account,
    session: context.sessions[accountKey],
    profilePage,
    profileData
  };
}

module.exports = {
  applySessionToStorage,
  clearStorage,
  ensureLoggedInByInjection,
  ensureLoggedOut,
  loginByPasswordThroughUi
};
