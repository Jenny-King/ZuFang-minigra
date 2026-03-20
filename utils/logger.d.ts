/** 日志级别常量 */
export const LOG_LEVEL: {
  readonly DEBUG: 0;
  readonly INFO: 1;
  readonly WARN: 2;
  readonly ERROR: 3;
};

/** 日志级别值 */
export type LogLevelValue = 0 | 1 | 2 | 3;

/** 日志附加数据 */
export type LogData = Record<string, unknown>;

/** 日志实例接口 */
export interface Logger {
  debug(tag: string, data?: LogData): void;
  info(tag: string, data?: LogData): void;
  warn(tag: string, data?: LogData): void;
  error(tag: string, data?: LogData): void;
}

/** 全局日志实例 */
export const logger: Logger;

/** 创建带作用域前缀的日志实例 */
export function createScopedLogger(scope: string): Logger;
