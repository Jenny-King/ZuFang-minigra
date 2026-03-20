/** 户型筛选选项 */
export interface RoomFilterOption {
  label: string;
  value: string;
}

/** 带选中状态的户型选项 */
export interface RoomFilterOptionWithState extends RoomFilterOption {
  selected: boolean;
}

/** buildDraftSelectionState 参数 */
export interface DraftSelectionSource {
  selectedRegionIndex?: number;
  selectedRoomFilterValues?: string[];
  selectedMinPrice?: string;
  selectedMaxPrice?: string;
}

/** buildDraftSelectionState 返回 */
export interface DraftSelectionState {
  draftRegionIndex: number;
  draftRoomFilterValues: string[];
  draftRoomFilterOptions: RoomFilterOptionWithState[];
  draftMinPrice: string;
  draftMaxPrice: string;
}

/** 户型筛选选项常量 */
export const ROOM_FILTER_OPTIONS: RoomFilterOption[];

/** 只保留数字字符（最多 6 位） */
export function normalizePriceInputValue(value?: string): string;

/** 解析价格字符串为数字（无效返回 0） */
export function parsePriceValue(value?: string): number;

/** 构建价格范围标签（如 "500-1000" / "500+" / "1000以下"） */
export function buildPriceLabel(minPrice?: string, maxPrice?: string): string;

/** 规范化户型筛选值（去重 + 排除 "all"） */
export function normalizeRoomFilterValues(values?: string | string[]): string[];

/** 构建带选中态的户型筛选列表 */
export function buildRoomFilterOptions(selectedValues?: string[]): RoomFilterOptionWithState[];

/** 构建户型筛选标签（"多选" / 单项 label / ""） */
export function buildRoomFilterLabel(values?: string[]): string;

/** 将 index 钳位到 [0, options.length-1] */
export function clampOptionIndex(options?: unknown[], index?: number): number;

/** 从源状态构建草稿选中态 */
export function buildDraftSelectionState(source?: DraftSelectionSource): DraftSelectionState;

/** 格式化面积（如 "120㎡" / "面积待定"） */
export function formatArea(area: number | string): string;
