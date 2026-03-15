const ENV_ALIAS_MAP = {
  develop: "dev",
  trial: "staging",
  release: "prod"
};

const ENV_CONFIG_MAP = {
  dev: {
    cloudEnvId: "cloudbase-9gqfm47q1b1d82c0",
    mapServiceBaseUrl: "",
    enableBootstrap: true
  },
  staging: {
    cloudEnvId: "cloudbase-9gqfm47q1b1d82c0",
    mapServiceBaseUrl: "",
    enableBootstrap: false
  },
  prod: {
    cloudEnvId: "cloudbase-9gqfm47q1b1d82c0",
    mapServiceBaseUrl: "",
    enableBootstrap: false
  }
};

function getWxEnvVersion() {
  if (typeof __wxConfig === "undefined" || !__wxConfig) {
    return "develop";
  }

  return __wxConfig.envVersion || "develop";
}

function resolveEnvAlias(wxEnvVersion) {
  return ENV_ALIAS_MAP[wxEnvVersion] || "dev";
}

function getEnvConfig() {
  const wxEnvVersion = getWxEnvVersion();
  const envAlias = resolveEnvAlias(wxEnvVersion);
  const envConfig = ENV_CONFIG_MAP[envAlias];

  return {
    wxEnvVersion,
    envAlias,
    ...envConfig
  };
}

module.exports = {
  ENV_ALIAS_MAP,
  ENV_CONFIG_MAP,
  getWxEnvVersion,
  resolveEnvAlias,
  getEnvConfig
};
