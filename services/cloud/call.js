const { REQUEST_DEFAULT } = require("../../config/constants");
const { parseCloudFunctionResponse } = require("./response");
const { normalizeCloudError } = require("./error");
const authUtils = require("../../utils/auth");
const { assertNonEmptyString } = require("../../utils/assert");

async function callCloud(functionName, action, payload = {}, options = {}) {
  assertNonEmptyString(functionName, "functionName");
  assertNonEmptyString(action, "action");

  const {
    timeout = REQUEST_DEFAULT.TIMEOUT,
    withTrace = true
  } = options;

  try {
    const accessToken = authUtils.getAccessToken();
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
