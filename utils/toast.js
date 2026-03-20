let activeTimer = null;
let loadingResolver = null;

function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] || null;
}

function getToastHost() {
  const currentPage = getCurrentPage();
  if (!currentPage || typeof currentPage.selectComponent !== "function") {
    return null;
  }

  return (
    currentPage.selectComponent("#app-toast") ||
    currentPage.selectComponent(".app-toast-host") ||
    null
  );
}

function clearTimer() {
  if (activeTimer) {
    clearTimeout(activeTimer);
    activeTimer = null;
  }
}

function resolveLoading() {
  if (typeof loadingResolver === "function") {
    const resolver = loadingResolver;
    loadingResolver = null;
    resolver();
  }
}

function wait(duration, callback) {
  clearTimer();
  return new Promise((resolve) => {
    activeTimer = setTimeout(() => {
      activeTimer = null;
      if (typeof callback === "function") {
        callback();
      }
      resolve();
    }, duration);
  });
}

function showNativeToast(options, duration) {
  wx.showToast(options);
  return wait(duration, () => {
    wx.hideToast();
  });
}

function showHostToast(type, message, duration) {
  const host = getToastHost();
  if (!host || typeof host.show !== "function") {
    return null;
  }

  host.show({
    type,
    message,
    duration
  });

  return wait(duration, () => {
    if (typeof host.hide === "function") {
      host.hide();
    }
  });
}

function showLoadingToast(message = "") {
  clearTimer();
  wx.showLoading({
    title: message,
    mask: true
  });

  return new Promise((resolve) => {
    loadingResolver = resolve;
  });
}

function hide() {
  clearTimer();
  wx.hideToast();
  wx.hideLoading();

  const host = getToastHost();
  if (host && typeof host.hide === "function") {
    host.hide();
  }

  resolveLoading();
  return Promise.resolve();
}

function success(message = "") {
  hide();
  return showNativeToast(
    {
      title: message,
      icon: "success",
      mask: false,
      duration: 1500
    },
    1500
  );
}

function info(message = "") {
  hide();
  return showNativeToast(
    {
      title: message,
      icon: "none",
      mask: false,
      duration: 1500
    },
    1500
  );
}

function error(message = "") {
  hide();

  if (message.length > 7) {
    return new Promise((resolve) => {
      wx.showModal({
        title: "错误",
        content: message,
        showCancel: false,
        success: resolve
      });
    });
  }

  return showNativeToast(
    {
      title: message,
      icon: "error",
      mask: false,
      duration: 2000
    },
    2000
  );
}

function loading(message = "") {
  hide();
  return showLoadingToast(message);
}

module.exports = {
  success,
  error,
  info,
  loading,
  hide
};
