import { HistoryRecord, PaginatedList } from "./index";

/** 获取浏览历史列表 */
export function getHistoryList(params?: { page?: number; pageSize?: number }): Promise<PaginatedList<HistoryRecord>>;

/** 添加浏览记录 */
export function addHistory(houseId: string): Promise<void>;

/** 删除单条浏览记录 */
export function removeHistory(historyId: string): Promise<void>;

/** 清空所有浏览记录 */
export function clearHistory(): Promise<void>;
