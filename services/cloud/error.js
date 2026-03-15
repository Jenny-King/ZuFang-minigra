class CloudError extends Error {
  constructor(message, options = {}) {
    super(message || "请求失败");
    this.name = "CloudError";
    this.code = typeof options.code === "number" ? options.code : 500;
    this.details = options.details || null;
    this.raw = options.raw || null;
  }
}

function isCloudError(error) {
  return error instanceof CloudError;
}

function getErrorMessage(error) {
  if (typeof error === "string" && error.trim()) {
    return error.trim();
  }

  if (error && typeof error.message === "string" && error.message.trim()) {
    return error.message.trim();
  }

  if (error && typeof error.errMsg === "string" && error.errMsg.trim()) {
    return error.errMsg.trim();
  }

  return "请求失败";
}

function normalizeCloudError(error, context = {}) {
  if (isCloudError(error)) {
    return error;
  }

  const contextMessage = [context.moduleName, context.action].filter(Boolean).join(".");
  const baseMessage = getErrorMessage(error);
  const message = contextMessage ? `${contextMessage}: ${baseMessage}` : baseMessage;

  return new CloudError(message, {
    code: typeof error?.code === "number" ? error.code : 500,
    details: {
      moduleName: context.moduleName || "",
      action: context.action || ""
    },
    raw: error || null
  });
}

module.exports = {
  CloudError,
  isCloudError,
  normalizeCloudError
};
