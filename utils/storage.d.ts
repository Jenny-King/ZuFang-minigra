import { UserInfo, SettingsPreferences } from "../services/index";
import { AccountSession } from "./auth";

// ---------------------------------------------------------------------------
// 通用 Storage 操作
// ---------------------------------------------------------------------------

/** 同步读取（失败返回 defaultValue） */
export function getStorageSync<T = unknown>(key: string, defaultValue?: T): T;

/** 同步写入（失败返回 false） */
export function setStorageSync(key: string, value: unknown): boolean;

/** 同步删除（失败返回 false） */
export function removeStorageSync(key: string): boolean;

/** 同步清空全部（失败返回 false） */
export function clearStorageSync(): boolean;

/** 异步读取 */
export function getStorage<T = unknown>(key: string): Promise<T | null>;

/** 异步写入 */
export function setStorage(key: string, data: unknown): Promise<boolean>;

/** 异步删除 */
export function removeStorage(key: string): Promise<boolean>;

// ---------------------------------------------------------------------------
// 业务快捷方法
// ---------------------------------------------------------------------------

export function getUserInfo(): UserInfo | null;
export function setUserInfo(userInfo: UserInfo): boolean;
export function clearUserInfo(): boolean;

export function getAccessToken(): string;
export function setAccessToken(accessToken: string): boolean;
export function clearAccessToken(): boolean;

export function getAccountSessions(): AccountSession[];
export function setAccountSessions(accountSessions: AccountSession[]): boolean;
export function clearAccountSessions(): boolean;

export function getActiveAccountUserId(): string;
export function setActiveAccountUserId(userId: string): boolean;
export function clearActiveAccountUserId(): boolean;

export function getSettingsPreferences(): SettingsPreferences | null;
export function setSettingsPreferences(preferences: SettingsPreferences): boolean;
export function clearSettingsPreferences(): boolean;
