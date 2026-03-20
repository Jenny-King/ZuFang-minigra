import { BootstrapResult } from "./index";

/** 初始化全部（集合 + 区域数据） */
export function initAll(): Promise<BootstrapResult>;

/** 仅初始化区域数据 */
export function initRegions(): Promise<BootstrapResult>;

/** 仅初始化数据库集合 */
export function initCollections(): Promise<BootstrapResult>;

/** 清理测试用户 */
export function cleanupTestUsers(phones?: string[]): Promise<BootstrapResult>;
