const { ENV_CONFIG_MAP } = require("../../config/env");

function normalizeEnvAlias(rawValue = "") {
  const value = String(rawValue || "").trim().toLowerCase();
  if (value === "develop") {
    return "dev";
  }
  if (value === "trial") {
    return "staging";
  }
  if (value === "release") {
    return "prod";
  }
  return value || "dev";
}

function runSafetyCheck() {
  const envAlias = normalizeEnvAlias(
    process.env.MINIPROGRAM_ENV_ALIAS
    || process.env.WX_ENV_VERSION
    || process.env.WECHAT_ENV_VERSION
  );
  const envConfig = ENV_CONFIG_MAP[envAlias] || ENV_CONFIG_MAP.dev;

  if (envAlias === "prod") {
    throw new Error("当前 UI 自动化被判定为 prod 环境，已阻止执行。请切回开发环境后再试。");
  }

  console.log(`[ui-safety] env=${envAlias} cloudEnvId=${envConfig.cloudEnvId}`);
}

module.exports = runSafetyCheck;
