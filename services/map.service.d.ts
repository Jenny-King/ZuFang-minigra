import { GeocodeResult, ReverseGeocodeResult, NearbyPOI } from "./index";

/** 地址 → 经纬度 */
export function geocodeAddress(address: string): Promise<GeocodeResult>;

/** 经纬度 → 地址 */
export function reverseGeocode(latitude: number, longitude: number): Promise<ReverseGeocodeResult>;

/** 搜索附近设施 */
export function searchNearby(
  latitude: number,
  longitude: number,
  keywords?: string
): Promise<NearbyPOI[]>;
