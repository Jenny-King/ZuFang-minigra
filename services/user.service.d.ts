import { UserInfo, UserRole, ProfileUpdateData } from "./index";

/** 获取当前登录用户信息 */
export function getCurrentUser(): Promise<UserInfo>;

/** 更新个人资料 */
export function updateProfile(updateData: ProfileUpdateData): Promise<UserInfo>;

/** 修改密码 */
export function changePassword(oldPassword: string, newPassword: string): Promise<{
  updated: boolean;
  revokedSessions: number;
}>;

/** 验证当前密码 */
export function verifyPassword(password: string): Promise<{ verified: boolean }>;

/** 更换手机号 */
export function changePhone(phone: string, code: string): Promise<UserInfo>;

/** 绑定邮箱 */
export function bindEmail(email: string): Promise<UserInfo>;

/** 切换角色（tenant ↔ landlord） */
export function switchRole(role: UserRole): Promise<UserInfo>;

/** 注销账号 */
export function deleteAccount(): Promise<{ deleted: boolean; userId: string }>;

/** 上传头像，返回云文件 ID */
export function uploadAvatar(filePath: string, cloudPath: string): Promise<string>;
