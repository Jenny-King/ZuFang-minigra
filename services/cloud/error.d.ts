interface CloudErrorOptions {
  code?: number;
  details?: Record<string, string>;
  raw?: unknown;
}

/** 云函数调用异常 */
export class CloudError extends Error {
  name: "CloudError";
  code: number;
  details: Record<string, string> | null;
  raw: unknown;
  constructor(message?: string, options?: CloudErrorOptions);
}

/** 判断是否为 CloudError 实例（类型守卫） */
export function isCloudError(error: unknown): error is CloudError;

/** 将任意错误规范化为 CloudError */
export function normalizeCloudError(
  error: unknown,
  context?: { moduleName?: string; action?: string }
): CloudError;
