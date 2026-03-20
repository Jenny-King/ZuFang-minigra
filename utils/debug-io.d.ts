/** Storage I/O 计数器 */
export interface IOCounters {
  getStorageSync: number;
  setStorageSync: number;
  getStorage: number;
  setStorage: number;
  removeStorageSync: number;
  removeStorage: number;
}

/** 调用日志条目 */
export interface IOCallLogEntry {
  ts: number;
  api: string;
  key: string;
}

/** I/O 审计报告 */
export interface IOReport {
  counters: IOCounters;
  elapsed: number;
  totalSync: number;
  totalAsync: number;
  callLog: IOCallLogEntry[];
}

/** 输出 I/O 审计报告到控制台并返回结构化结果 */
export function getIOReport(): IOReport;

/** 重置所有计数器和调用日志 */
export function resetIOCounters(): void;
