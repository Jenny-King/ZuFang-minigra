const LOG_LEVEL = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};

const ENV_LOG_LEVEL = {
  develop: LOG_LEVEL.DEBUG,
  trial: LOG_LEVEL.INFO,
  release: LOG_LEVEL.WARN
};

function getEnvVersion() {
  if (typeof __wxConfig === "undefined" || !__wxConfig) {
    return "develop";
  }

  return __wxConfig.envVersion || "develop";
}

function getCurrentLevel() {
  const envVersion = getEnvVersion();
  return ENV_LOG_LEVEL[envVersion] ?? LOG_LEVEL.DEBUG;
}

function safeStringify(data) {
  try {
    return JSON.stringify(data ?? {});
  } catch (error) {
    return JSON.stringify({
      stringifyError: error.message,
      fallbackType: typeof data
    });
  }
}

function formatMessage(level, tag, data) {
  return `[${level}][${tag}] ${safeStringify(data)}`;
}

function shouldLog(targetLevel) {
  return getCurrentLevel() <= targetLevel;
}

const logger = {
  debug(tag, data) {
    if (!shouldLog(LOG_LEVEL.DEBUG)) {
      return;
    }
    console.debug(formatMessage("DEBUG", tag, data));
  },
  info(tag, data) {
    if (!shouldLog(LOG_LEVEL.INFO)) {
      return;
    }
    console.log(formatMessage("INFO", tag, data));
  },
  warn(tag, data) {
    if (!shouldLog(LOG_LEVEL.WARN)) {
      return;
    }
    console.warn(formatMessage("WARN", tag, data));
  },
  error(tag, data) {
    console.error(formatMessage("ERROR", tag, data));
    try {
      const realtimeLogManager = wx.getRealtimeLogManager();
      realtimeLogManager.error(tag, safeStringify(data));
    } catch (error) {
      console.warn(formatMessage("WARN", "realtime_log_unavailable", { error: error.message }));
    }
  }
};

function createScopedLogger(scope) {
  return {
    debug(tag, data) {
      logger.debug(`${scope}:${tag}`, data);
    },
    info(tag, data) {
      logger.info(`${scope}:${tag}`, data);
    },
    warn(tag, data) {
      logger.warn(`${scope}:${tag}`, data);
    },
    error(tag, data) {
      logger.error(`${scope}:${tag}`, data);
    }
  };
}

module.exports = {
  LOG_LEVEL,
  logger,
  createScopedLogger
};
