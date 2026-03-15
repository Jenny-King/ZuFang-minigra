const { CloudError } = require("./error");

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function toStandardSuccess(data, code = 0, message = "", raw = null) {
  return {
    success: true,
    code,
    message,
    data: data === undefined ? null : data,
    raw
  };
}

function parseCloudResult(rawResult) {
  if (!isPlainObject(rawResult)) {
    throw new CloudError("云函数返回格式错误", {
      code: 500,
      raw: rawResult
    });
  }

  if (typeof rawResult.success === "boolean") {
    if (rawResult.success) {
      return toStandardSuccess(rawResult.data, Number(rawResult.code) || 0, rawResult.message || "", rawResult);
    }

    throw new CloudError(rawResult.message || "请求失败", {
      code: typeof rawResult.code === "number" ? rawResult.code : 500,
      raw: rawResult
    });
  }

  if (typeof rawResult.code === "number") {
    if (rawResult.code === 0) {
      return toStandardSuccess(rawResult.data, rawResult.code, rawResult.message || "", rawResult);
    }

    throw new CloudError(rawResult.message || "请求失败", {
      code: rawResult.code,
      raw: rawResult
    });
  }

  return toStandardSuccess(rawResult, 0, "", rawResult);
}

function parseCloudFunctionResponse(cloudResponse) {
  if (!isPlainObject(cloudResponse) || !("result" in cloudResponse)) {
    throw new CloudError("云调用响应无 result 字段", {
      code: 500,
      raw: cloudResponse
    });
  }

  return parseCloudResult(cloudResponse.result);
}

module.exports = {
  parseCloudResult,
  parseCloudFunctionResponse
};
