import { StandardResult } from "../index";

interface CallCloudOptions {
  /** 请求超时（毫秒），默认 15000 */
  timeout?: number;
  /** 是否追踪用户，默认 true */
  withTrace?: boolean;
}

/**
 * 调用微信云函数的统一封装
 * @returns 云函数响应中的 `data` 字段（已通过 parseCloudFunctionResponse 校验）
 */
export function callCloud<T = unknown>(
  functionName: string,
  action: string,
  payload?: Record<string, string | number | boolean | string[] | Record<string, unknown>>,
  options?: CallCloudOptions
): Promise<T>;
