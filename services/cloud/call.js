const { REQUEST_DEFAULT } = require("../../config/constants");
const { parseCloudFunctionResponse } = require("./response");
const { normalizeCloudError } = require("./error");
const storage = require("../../utils/storage");

function assertRequiredString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 必须是非空字符串`);
  }
}

async function callCloud(functionName, action, payload = {}, options = {}) {
  assertRequiredString(functionName, "functionName");
  assertRequiredString(action, "action");

  const {
    timeout = REQUEST_DEFAULT.TIMEOUT,
    withTrace = true
  } = options;

  try {
    const accessToken = storage.getAccessToken();
    const response = await wx.cloud.callFunction({
      name: functionName,
      data: {
        action,
        payload,
        auth: accessToken ? { accessToken } : undefined
      },
      config: withTrace ? { traceUser: true } : undefined,
      timeout
    });

    const standardResult = parseCloudFunctionResponse(response);
    return standardResult.data;
  } catch (error) {
    throw normalizeCloudError(error, {
      moduleName: functionName,
      action
    });
  }
}

module.exports = {
  callCloud
};
