import { LoginResult, SmsSendResult } from "./index";

/** 微信一键登录 */
export function wechatLogin(userInfo?: { nickName?: string; avatarUrl?: string }): Promise<LoginResult>;

/** 发送短信验证码 */
export function sendSmsCode(phone: string): Promise<SmsSendResult>;

/** 校验短信验证码（不消耗） */
export function verifySmsCode(phone: string, code: string): Promise<{ verified: boolean }>;

/** 手机号 + 验证码登录 */
export function loginWithPhoneCode(phone: string, code: string): Promise<LoginResult>;

/** 手机号 + 密码登录 */
export function loginWithPassword(phone: string, password: string): Promise<LoginResult>;

/** 注册新用户 */
export function register(formData: {
  phone: string;
  nickName: string;
  password: string;
  role?: "tenant" | "landlord";
  userId?: string;
  wechatId?: string;
}): Promise<LoginResult>;

/** 重置密码 */
export function resetPassword(phone: string, code: string, newPassword: string): Promise<{
  reset: boolean;
  revokedSessions: number;
}>;

/** 绑定微信 */
export function bindWechat(): Promise<{ bound: boolean }>;

/** 解绑微信 */
export function unbindWechat(): Promise<{ unbound: boolean }>;

/** 退出登录 */
export function logout(): Promise<{ revoked: boolean }>;

/** 提交实名认证资料 */
export function submitIdentityProfile(realName: string, idCard: string): Promise<{
  userInfo: import("./index").UserInfo;
}>;

/** submitIdentityProfile 的别名 */
export const verifyIdentity: typeof submitIdentityProfile;
