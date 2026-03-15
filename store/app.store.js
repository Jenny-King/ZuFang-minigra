const { getEnvConfig } = require("../config/env");
const { logger } = require("../utils/logger");

const appState = {
  initialized: false,
  bootstrapping: false,
  globalLoading: false,
  currentRoute: "",
  lastError: null,
  env: getEnvConfig()
};

const listeners = new Set();

function getState() {
  return { ...appState };
}

function notify() {
  const snapshot = getState();
  listeners.forEach((listener) => {
    try {
      listener(snapshot);
    } catch (error) {
      logger.warn("app_store_listener_error", { error: error.message });
    }
  });
}

function setState(patch = {}) {
  Object.assign(appState, patch);
  notify();
}

function subscribe(listener) {
  if (typeof listener !== "function") {
    throw new Error("listener 必须是函数");
  }

  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setInitialized(initialized) {
  setState({ initialized: Boolean(initialized) });
}

function setBootstrapping(bootstrapping) {
  setState({ bootstrapping: Boolean(bootstrapping) });
}

function setGlobalLoading(globalLoading) {
  setState({ globalLoading: Boolean(globalLoading) });
}

function setCurrentRoute(currentRoute) {
  setState({ currentRoute: currentRoute || "" });
}

function setLastError(error) {
  setState({ lastError: error || null });
}

function refreshEnv() {
  setState({ env: getEnvConfig() });
}

module.exports = {
  getState,
  subscribe,
  setState,
  setInitialized,
  setBootstrapping,
  setGlobalLoading,
  setCurrentRoute,
  setLastError,
  refreshEnv
};
