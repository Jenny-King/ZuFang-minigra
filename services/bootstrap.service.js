const { callCloud } = require("./cloud/call");
const { getEnvConfig } = require("../config/env");

function assertBootstrapAllowed() {
  const envConfig = getEnvConfig();
  const isProd = envConfig.envAlias === "prod";

  if (isProd || !envConfig.enableBootstrap) {
    throw new Error("当前环境禁止执行初始化操作");
  }
}

async function initRegions() {
  assertBootstrapAllowed();
  return callCloud("bootstrap", "initRegions", { allowBootstrap: true });
}

async function initCollections() {
  assertBootstrapAllowed();
  return callCloud("bootstrap", "initCollections", { allowBootstrap: true });
}

async function initAll() {
  assertBootstrapAllowed();
  return callCloud("bootstrap", "initAll", { allowBootstrap: true });
}

async function cleanupTestUsers(phones = []) {
  assertBootstrapAllowed();
  return callCloud("bootstrap", "cleanupTestUsers", {
    allowBootstrap: true,
    phones
  });
}

async function cleanupHousingData(options = {}) {
  assertBootstrapAllowed();

  const payload = {
    allowBootstrap: true
  };

  if (Array.isArray(options.collections) && options.collections.length) {
    payload.collections = options.collections;
  }

  if (typeof options.dryRun === "boolean") {
    payload.dryRun = options.dryRun;
  }

  return callCloud("bootstrap", "cleanupHousingData", payload);
}

module.exports = {
  initAll,
  initRegions,
  initCollections,
  cleanupTestUsers,
  cleanupHousingData
};
