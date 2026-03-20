/** 格式化日期为 "YYYY-MM-DD HH:mm:ss" */
export function formatDate(input: Date | string | number): string;

/** 格式化价格（带后缀），NaN 返回 "0元/月" */
export function formatPrice(price: number, suffix?: string): string;

/** 手机号脱敏：13812345678 → 138****5678 */
export function maskPhone(phone?: string): string;

/** 身份证脱敏：110101199001011234 → 110101********1234 */
export function maskIdCard(idCard?: string): string;

/** 空文本回退：空字符串 → fallback（默认 "--"） */
export function fallbackText(text: string, fallback?: string): string;
