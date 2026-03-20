import { UserInfo, UserRole } from "../services/index";

// ---------------------------------------------------------------------------
// 内存缓存结构 — _MEM_SESSIONS (auth.js L22-L26)
// ---------------------------------------------------------------------------

/** 单个标准化账号会话 */
export interface AccountSession {
  userId: string;
  userInfo: UserInfo;
  accessToken: string;
  updatedAt: number;
}

/** auth 内存缓存对象（_MEM_SESSIONS）— 全生命周期单例 */
export interface MemSessionsCache {
  /** 多账号会话列表（按 updatedAt 降序，最多 5 条） */
  sessions: AccountSession[];
  /** 当前激活的 userId */
  activeUserId: string;
  /** 是否已从磁盘冷启动完成 */
  initialized: boolean;
}

/** getAuthSnapshot() 返回结构 */
export interface AuthSnapshot {
  userInfo: UserInfo | null;
  accessToken: string;
  accountSessions: AccountSession[];
  activeUserId: string;
}

/** requireLogin 选项 */
export interface RequireLoginOptions {
  redirect?: boolean;
}

// ---------------------------------------------------------------------------
// 纯工具函数
// ---------------------------------------------------------------------------

/** 判断 userInfo 是否包含有效 userId */
export function hasValidUserId(userInfo: UserInfo | null | undefined): boolean;

/** 判断 accessToken 是否为有效非空字符串 */
export function hasValidAccessToken(accessToken: string | null | undefined): boolean;

// ---------------------------------------------------------------------------
// 读取接口（Pure Getter, 零 I/O）
// ---------------------------------------------------------------------------

/** 获取当前登录用户信息（若未登录返回 null） */
export function getLoginUser(): UserInfo | null;

/** 获取当前 accessToken（若未登录返回空字符串） */
export function getAccessToken(): string;

/** 获取所有缓存的账号会话列表 */
export function getAccountSessions(): AccountSession[];

/** 获取当前激活的 userId */
export function getActiveAccountUserId(): string;

/** 获取当前激活的完整会话 */
export function getActiveSession(): AccountSession | null;

/** 获取 auth 状态快照（userInfo + accessToken + accountSessions + activeUserId） */
export function getAuthSnapshot(): AuthSnapshot;

/** 当前是否已登录 */
export function isLoggedIn(): boolean;

/** 判断当前用户是否具有指定角色 */
export function hasRole(role: UserRole): boolean;

/** 判断当前用户是否有发布房源权限 (landlord | admin) */
export function canPublishHouse(): boolean;

// ---------------------------------------------------------------------------
// 写入接口（内存即时更新 + 500ms 防抖落盘）
// ---------------------------------------------------------------------------

/** 保存完整登录会话（新增或替换同 userId 会话） */
export function saveLoginSession(session: {
  userInfo: UserInfo;
  accessToken: string;
  updatedAt?: number;
}): boolean;

/** 更新当前激活用户的 userInfo（merge 模式） */
export function updateCurrentUserInfo(userInfo: Partial<UserInfo> & { userId: string }): boolean;

/** 切换到指定 userId 对应的缓存账号 */
export function switchAccount(userId: string): AccountSession | null;

/** 移除指定 userId 的缓存会话 */
export function removeAccount(userId: string): AccountSession | null;

/** 清除当前激活用户会话（保留其他缓存账号） */
export function clearActiveLoginState(): AccountSession | null;

/** 清除所有缓存的登录状态 */
export function clearLoginState(): boolean;

/** 检查登录状态，未登录时可跳转登录页 */
export function requireLogin(options?: RequireLoginOptions): boolean;

/** 强制从磁盘重新加载认证状态 */
export function restoreFromStorage(): void;
