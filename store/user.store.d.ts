import { UserInfo } from "../services/index";

// ---------------------------------------------------------------------------
// AccountSession — auth.js L50-L63 normalizeAccountSession 产出
// ---------------------------------------------------------------------------
export interface AccountSession {
  userId: string;
  userInfo: UserInfo;
  accessToken: string;
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// UserStoreState — user.store.js getState() 产出
// ---------------------------------------------------------------------------

/** 用户层全局状态（含计算属性） */
export interface UserStoreState {
  /** 当前激活用户信息 */
  userInfo: UserInfo | null;
  /** 当前访问令牌 */
  accessToken: string;
  /** 多账号会话列表 */
  accountSessions: AccountSession[];
  /** 当前激活用户 ID */
  activeUserId: string;
  /** 远程刷新中 */
  loading: boolean;
  /** 计算属性：是否已登录（userInfo 有效 && accessToken 非空） */
  isLoggedIn: boolean;
  /** 计算属性：多账号缓存数量 */
  cachedAccountCount: number;
}

/** 状态变更监听器 */
export type UserStateListener = (state: UserStoreState) => void;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** 获取状态快照（含计算属性 isLoggedIn / cachedAccountCount） */
export function getState(): UserStoreState;

/** 订阅状态变更，返回取消订阅函数 */
export function subscribe(listener: UserStateListener): () => void;

/** 原子性合并 state（触发通知） */
export function setState(patch: Partial<UserStoreState>): void;

/** 切换 loading 标志 */
export function setLoading(loading: boolean): void;

/** 更新当前用户信息（同步写入 auth 缓存），传 null 则清除 */
export function setUserInfo(userInfo: UserInfo | null): UserInfo | null;

/** 保存完整登录会话（userInfo + accessToken） */
export function setSession(session: { userInfo: UserInfo; accessToken: string }): UserInfo | null;

/** 切换激活账号 */
export function switchAccount(userId: string): UserInfo | null;

/** 移除指定缓存账号 */
export function removeAccount(userId: string): UserInfo | null;

/** 清除当前激活用户（保留其他缓存账号） */
export function clearUser(): UserInfo | null;

/** 清除所有缓存账号 */
export function clearAllUsers(): UserInfo | null;

/** 从本地存储恢复 */
export function restoreFromStorage(): UserInfo | null;

/** 远程刷新当前用户信息 */
export function refreshCurrentUser(): Promise<UserInfo | null>;
