import {
  HouseListParams,
  HouseDetail,
  HouseRecord,
  HouseCreateData,
  HouseUpdateData,
  RegionItem,
  PaginatedList
} from "./index";

/** 获取房源列表（支持筛选、排序、分页） */
export function getHouseList(params?: HouseListParams): Promise<PaginatedList<HouseRecord>>;

/** 获取区域列表 */
export function getRegions(): Promise<RegionItem[]>;

/** 获取房源详情（完整 houses 文档） */
export function getHouseDetail(houseId: string): Promise<HouseDetail>;

/** 创建房源，返回新文档 _id */
export function createHouse(formData: HouseCreateData): Promise<{ _id: string }>;

/** 更新房源信息 */
export function updateHouse(houseId: string, formData: HouseUpdateData): Promise<{ updated: boolean; houseId: string }>;

/** 更新房源状态（上架/下架） */
export function updateHouseStatus(houseId: string, status: "active" | "hidden"): Promise<{ updated: boolean; houseId: string }>;

/** 删除房源（软删除） */
export function deleteHouse(houseId: string): Promise<{ removed: boolean; houseId: string }>;

/** 获取当前登录房东的房源列表 */
export function getMyHouseList(params?: HouseListParams): Promise<PaginatedList<HouseRecord>>;

/** 上传房源图片，返回云文件 ID (fileID) */
export function uploadHouseImage(filePath: string, cloudPath: string): Promise<string>;
