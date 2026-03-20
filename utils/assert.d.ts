/** 断言值为非空字符串，否则抛出 Error */
export function assertNonEmptyString(value: unknown, fieldName: string): asserts value is string;

/** 断言值为普通对象，否则抛出 Error */
export function assertPlainObject(value: unknown, fieldName: string): asserts value is Record<string, unknown>;

/** 断言值为数字（非 NaN），否则抛出 Error */
export function assertNumber(value: unknown, fieldName: string): asserts value is number;

/** 断言值为正整数，否则抛出 Error */
export function assertPositiveInteger(value: unknown, fieldName: string): asserts value is number;
