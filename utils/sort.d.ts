import { HouseRecord } from "../services/index";

/** 排序 Tab 标识符 */
export const LIST_SORT_TAB_KEYS: {
  readonly LATEST: string;
  readonly PRICE: string;
  readonly AREA: string;
};

/** 排序 Tab 项 */
export interface SortTab {
  key: string;
  label: string;
  active: boolean;
}

/** 排序值 */
export type SortValue = "latest" | "priceAsc" | "priceDesc" | "areaAsc" | "areaDesc";

/** 判断排序值是否为价格排序 */
export function isPriceSort(sortValue?: string): boolean;

/** 判断排序值是否为面积排序 */
export function isAreaSort(sortValue?: string): boolean;

/** 构建排序 Tab 列表（含 active 状态） */
export function buildListSortTabs(selectedSort?: SortValue): SortTab[];

/** 获取下一个排序值（点击同 Tab 则切换升降序） */
export function getNextListSort(currentSort?: SortValue, tabKey?: string): SortValue;

/** 按指定排序值对房源列表排序（返回新数组） */
export function sortBySelectedTab<T extends Pick<HouseRecord, "price" | "area" | "createTime">>(
  list?: T[],
  sortValue?: SortValue
): T[];
