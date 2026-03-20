import { SettingsPreferences, SmsSendResult, UserInfo } from "./index";

/** 默认设置常量 */
export const DEFAULT_SETTINGS: SettingsPreferences;

/** 读取用户设置偏好（本地存储） */
export function getSettingsPreferences(): SettingsPreferences;

/** 保存用户设置偏好（本地存储） */
export function saveSettingsPreferences(preferences: Partial<SettingsPreferences>): SettingsPreferences;

/** 修改密码（代理 → userService.changePassword） */
export function changePassword(oldPassword: string, newPassword: string): Promise<{
  updated: boolean;
  revokedSessions: number;
}>;

/** 验证当前密码 */
export function verifyPassword(password: string): Promise<{ verified: boolean }>;

/** 更换手机号 */
export function changePhone(phone: string, code: string): Promise<UserInfo>;

/** 发送短信验证码 */
export function sendSmsCode(phone: string): Promise<SmsSendResult>;

/** 绑定邮箱 */
export function bindEmail(email: string): Promise<UserInfo>;

/** 绑定微信 */
export function bindWechat(): Promise<{ bound: boolean }>;

/** 解绑微信 */
export function unbindWechat(): Promise<{ unbound: boolean }>;

/** 提交实名认证 */
export function submitIdentityProfile(realName: string, idCard: string): Promise<{ userInfo: UserInfo }>;

/** 注销账号 */
export function deleteAccount(): Promise<{ deleted: boolean; userId: string }>;
