// ---------------------------------------------------------------------------
// services/index.d.ts — 全局公共类型（云函数 Schema 驱动）
// ---------------------------------------------------------------------------

// ========================= 基础通用 =========================

/** 云函数标准响应体（callCloud 内部解析后返回 data 部分） */
export interface CloudFunctionResult<T = unknown> {
  code: number;
  data: T;
  message: string;
}

/** parseCloudFunctionResponse 返回的标准化包装 */
export interface StandardResult<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  raw: CloudFunctionResult<T> | null;
}

/** 分页参数（通用） */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/** 分页响应（通用） */
export interface PaginatedList<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
}

// ========================= House 房源 =========================

/** 房源状态枚举 */
export type HouseStatus = "active" | "hidden" | "deleted";

/** 付款方式 */
export type PaymentMethod = "月付" | "季付" | "半年付" | "年付";

/** 设施清单（云函数 normalizeFacilities 产出） */
export interface HouseFacilities {
  elevator?: boolean;
  parking?: boolean;
  wifi?: boolean;
  airConditioner?: boolean;
  washingMachine?: boolean;
  refrigerator?: boolean;
  waterHeater?: boolean;
  bed?: boolean;
  sofa?: boolean;
  tv?: boolean;
  wardrobe?: boolean;
  balcony?: boolean;
  security?: boolean;
  gym?: boolean;
  swimmingPool?: boolean;
  hotWater?: boolean;
}

/**
 * 房源完整记录 —— 对应 `houses` 集合文档
 * 字段来源：cloudfunctions/house/index.js → buildCreateData + buildUpdateData
 */
export interface HouseRecord {
  _id: string;
  title: string;
  price: number;
  paymentMethod: PaymentMethod;
  minRentPeriod: number;
  area: number;
  type: string;
  layoutText: string;
  city: string;
  floor: string;
  orientation: string;
  address: string;
  description: string;
  images: string[];
  latitude: number;
  longitude: number;
  contactName: string;
  contactPhone: string;
  facilities: HouseFacilities;
  region: string;
  landlordUserId: string;
  status: HouseStatus;
  createTime: string | Date;
  updateTime: string | Date;
}

/** getHouseList 查询参数 */
export interface HouseListParams extends PaginationParams {
  keyword?: string;
  city?: string;
  region?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
  roomFilters?: string | string[];
  sortBy?: "latest" | "priceAsc" | "priceDesc" | "areaAsc" | "areaDesc";
}

/** getHouseDetail 返回（即 houses 集合完整文档） */
export type HouseDetail = HouseRecord;

/** createHouse 表单数据 */
export interface HouseCreateData {
  title: string;
  price: number;
  paymentMethod?: PaymentMethod;
  minRentPeriod?: number;
  area: number;
  type: string;
  layoutText?: string;
  city?: string;
  floor?: string;
  orientation?: string;
  address: string;
  description?: string;
  images: string[];
  latitude?: number;
  longitude?: number;
  contactName?: string;
  contactPhone: string;
  facilities?: HouseFacilities;
  region?: string;
}

/** updateHouse 可选字段（全部 optional） */
export type HouseUpdateData = Partial<Omit<HouseCreateData, "images">> & {
  images?: string[];
  status?: "active" | "hidden";
};

/** 区域选项 —— handleGetRegions 返回的单项 */
export interface RegionItem {
  city: string;
  name: string;
  order: number;
}

/** 房源快照（嵌入会话文档） */
export interface HouseSnapshot {
  houseId: string;
  title: string;
  price: number;
  address: string;
  layoutText: string;
  imageUrl: string;
}

// ========================= User 用户 =========================

/** 用户角色 */
export type UserRole = "tenant" | "landlord" | "admin";

/** 实名状态 */
export type IdentityProfileStatus = "unsubmitted" | "pending" | "approved";

/**
 * 序列化后的用户信息 —— 对应 serializeUser / sanitizeUser 产出
 * 字段来源：cloudfunctions/auth/index.js L224-L248 + cloudfunctions/user/index.js L114-L136
 */
export interface UserInfo {
  userId: string;
  nickName: string;
  avatarUrl: string;
  role: UserRole;
  phone: string;
  email: string;
  verified: boolean;
  identityStatus: IdentityProfileStatus;
  identitySubmittedAt: string | Date | null;
  wechatId: string;
  province: string;
  city: string;
  district: string;
  idCardMasked: string;
  wechatBound: boolean;
}

/**
 * 登录成功响应 —— buildAuthSuccess 产出
 * 字段来源：cloudfunctions/auth/index.js L447-L454
 */
export interface LoginResult {
  userInfo: UserInfo;
  accessToken: string;
  expiresAt: string | Date;
}

/** 短信发送响应 */
export interface SmsSendResult {
  phone: string;
  expireInSeconds: number;
  deliveryMode: "mock" | "production";
}

/** updateProfile 允许修改的字段 */
export interface ProfileUpdateData {
  nickName?: string;
  avatarUrl?: string;
  wechatId?: string;
  province?: string;
  city?: string;
  district?: string;
  gender?: string;
}

// ========================= Chat 会话 & 消息 =========================

/** 消息类型 */
export type MessageType = "text" | "image" | "system";

/**
 * 会话记录 —— conversations 集合文档 + handleGetConversations 附加字段
 * 字段来源：cloudfunctions/chat/index.js L302-L314 + L223-L233
 */
export interface ConversationItem {
  _id: string;
  conversationId: string;
  participantIds: [string, string];
  houseId: string;
  houseSnapshot: HouseSnapshot | null;
  lastMessage: string;
  lastMessageTime: string | Date;
  unreadMap: Record<string, number>;
  createTime: string | Date;
  updateTime: string | Date;
  /** 附加：对方用户 ID */
  targetUserId: string;
  /** 附加：对方用户信息 */
  targetUser: {
    userId: string;
    nickName: string;
    avatarUrl: string;
  } | null;
  /** 附加：房源快照 */
  houseInfo: HouseSnapshot | null;
  /** 附加：当前用户未读数 */
  unreadCount: number;
}

/** 聊天消息 —— chat_messages 集合文档 */
export interface ChatMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  messageType: MessageType;
  read: boolean;
  createTime: string | Date;
}

// ========================= Favorite & History =========================

export interface FavoriteRecord {
  _id: string;
  userId: string;
  houseId: string;
  createTime: string | Date;
  houseInfo?: HouseRecord;
}

export interface HistoryRecord {
  _id: string;
  userId: string;
  houseId: string;
  createTime: string | Date;
  houseInfo?: HouseRecord;
}

// ========================= Notification 通知 =========================

export interface NotificationItem {
  _id: string;
  userId: string;
  type: string;
  title: string;
  content: string;
  read: boolean;
  readTime?: string | Date;
  createTime: string | Date;
}

export interface NotificationListResult extends PaginatedList<NotificationItem> {
  unreadCount: number;
}

// ========================= Map 地图 =========================

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

export interface ReverseGeocodeResult {
  address: string;
  formattedAddress: string;
  city: string;
  district: string;
  addressComponent?: {
    city: string;
    district: string;
    province: string;
  };
  adInfo?: {
    city: string;
    district: string;
  };
}

export interface NearbyPOI {
  name: string;
  category: string;
  distance: number;
  latitude: number;
  longitude: number;
  address: string;
}

// ========================= Settings 设置 =========================

export interface NotificationPreferences {
  chatNotice: boolean;
  systemNotice: boolean;
}

export interface PrivacyPreferences {
  maskPhone: boolean;
  personalizedLocation: boolean;
}

export interface SettingsPreferences {
  notification: NotificationPreferences;
  privacy: PrivacyPreferences;
}

// ========================= Support 反馈 =========================

export interface FeedbackPayload {
  category: string;
  content: string;
  contact?: string;
}

// ========================= Bootstrap 初始化 =========================

export interface BootstrapResult {
  success: boolean;
  message?: string;
}
