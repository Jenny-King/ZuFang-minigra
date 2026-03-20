import { FavoriteRecord, PaginatedList } from "./index";

/** 获取收藏列表 */
export function getFavoriteList(params?: { page?: number; pageSize?: number }): Promise<PaginatedList<FavoriteRecord>>;

/** 切换收藏状态 */
export function toggleFavorite(houseId: string): Promise<{ isFavorite: boolean }>;

/** 检查是否已收藏 */
export function checkFavorite(houseId: string): Promise<{ isFavorite: boolean }>;
