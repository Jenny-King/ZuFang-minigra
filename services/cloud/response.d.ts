import { StandardResult } from "../index";

/** 解析云函数原始 result 为标准结构，失败时抛出 CloudError */
export function parseCloudResult<T = unknown>(rawResult: Record<string, unknown>): StandardResult<T>;

/** 解析 wx.cloud.callFunction 的完整 response，提取 result 后交给 parseCloudResult */
export function parseCloudFunctionResponse<T = unknown>(cloudResponse: Record<string, unknown>): StandardResult<T>;
