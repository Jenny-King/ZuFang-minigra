/** 区域选项 */
export interface RegionOption {
  label: string;
  value: string;
  city?: string;
}

/** 城市选项 */
export interface CityOption {
  label: string;
  value: string;
}

/** 地理信息详情（reverseGeocode 结果或类似结构） */
export interface LocationDetail {
  city?: string;
  district?: string;
  region?: string;
  addressComponent?: { city?: string; district?: string; province?: string };
  adInfo?: { city?: string; district?: string };
}

/** 全市区域值常量 */
export const CITY_WIDE_REGION_VALUE: string;

/** 兜底区域选项 */
export const FALLBACK_REGION_OPTIONS: RegionOption[];

/** 从区域数据构建下拉选项（含 "全部区域" 前缀） */
export function buildRegionOptions(regions?: Array<{ name?: string; city?: string }>): RegionOption[];

/** 查找区域在选项列表中的索引（未命中返回 0） */
export function getRegionIndex(regionOptions?: RegionOption[], region?: string, city?: string): number;

/** 规范化区域值（"全市"/"全部区域" → ""） */
export function normalizeRegionValue(region?: string): string;

/** 规范化城市标签（移除尾部 "市" 字） */
export function normalizeCityLabel(city?: string): string;

/** 从定位详情提取区名 */
export function normalizeDistrictName(locationDetail?: LocationDetail): string;

/** 从定位详情提取城市名 */
export function normalizeCityName(locationDetail?: LocationDetail): string;

/** 判断两个城市名是否同一城市 */
export function isSameCity(left?: string, right?: string): boolean;

/** 从区域选项中提取去重城市列表 */
export function buildCityOptions(regionOptions?: RegionOption[]): CityOption[];

/** 按城市筛选区域选项 */
export function filterRegionOptionsByCity(regionOptions?: RegionOption[], city?: string): RegionOption[];

/** 从区域选项中获取兜底城市 */
export function getFallbackCityFromRegions(regionOptions?: RegionOption[]): string;
