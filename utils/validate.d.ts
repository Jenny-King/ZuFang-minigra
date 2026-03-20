import { UserRole } from "../services/index";

/** 表单校验结果 */
export interface ValidationResult {
  valid: boolean;
  message: string;
}

/** 注册表单数据 */
export interface RegisterFormData {
  nickName?: string;
  phone?: string;
  password?: string;
  role?: string;
}

/** 房源表单数据 */
export interface HouseFormValidateData {
  title?: string;
  price?: string | number;
  type?: string;
  address?: string;
}

// ---------------------------------------------------------------------------
// 校验函数
// ---------------------------------------------------------------------------

export function isNonEmptyString(value: unknown): value is string;
export function isPhone(value: unknown): boolean;
export function isEmail(value: unknown): boolean;
export function isPassword(value: unknown): boolean;
export function isStrongPassword(value: unknown): boolean;
export function isIdCard(value: unknown): boolean;
export function isUserRole(value: unknown): value is UserRole;
export function isPositiveNumber(value: unknown): value is number;
export function validateRegisterForm(formData?: RegisterFormData): ValidationResult;
export function validateHouseForm(formData?: HouseFormValidateData): ValidationResult;
