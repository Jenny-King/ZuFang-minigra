/** 位置源信息 */
export interface LocationInput {
  city?: string;
  region?: string;
  district?: string;
  latitude?: number;
  longitude?: number;
}

/** buildLocationState 返回 */
export interface LocationState {
  currentCityRaw: string;
  currentCityLabel: string;
  currentDistrict: string;
  currentLatitude: number;
  currentLongitude: number;
  currentLocationSource: string;
  locationReady: boolean;
}

/** 缓存定位负载 */
export interface CachedLocationPayload {
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  updateTime: string;
}

/** 默认兜底城市 */
export const FALLBACK_CITY_LABEL: string;

/** 从位置信息构建页面 LocationState */
export function buildLocationState(location?: LocationInput, source?: string): LocationState;

/** 构建可持久化的定位缓存 */
export function buildCachedLocationPayload(location?: LocationInput): CachedLocationPayload;
