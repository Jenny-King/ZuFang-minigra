import { UserInfo } from "../services/index";

// ---------------------------------------------------------------------------
// EnvConfig — from config/env.js → getEnvConfig()
// ---------------------------------------------------------------------------

interface EnvConfig {
  envAlias: "dev" | "staging" | "prod";
  cloudEnvId: string;
  enableBootstrap: boolean;
  enableMock: boolean;
}

// ---------------------------------------------------------------------------
// AppState — app.store.js L4-L11
// ---------------------------------------------------------------------------

/** 应用全局状态 */
export interface AppState {
  /** 初始化完成标志 */
  initialized: boolean;
  /** 正在执行 bootstrap 流程 */
  bootstrapping: boolean;
  /** 全局加载遮罩 */
  globalLoading: boolean;
  /** 最近一次全局错误 */
  lastError: Error | null;
  /** 当前环境配置 */
  env: EnvConfig;
}

/** 状态变更监听器 */
export type AppStateListener = (state: AppState) => void;

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/** 获取状态快照（shallow copy） */
export function getState(): AppState;

/** 订阅状态变更，返回取消订阅函数 */
export function subscribe(listener: AppStateListener): () => void;

/** 原子性合并 state（触发通知） */
export function setState(patch: Partial<AppState>): void;

/** 标记初始化完成 */
export function setInitialized(initialized: boolean): void;

/** 标记 bootstrap 中 */
export function setBootstrapping(bootstrapping: boolean): void;

/** 切换全局 loading 遮罩 */
export function setGlobalLoading(globalLoading: boolean): void;

/** 记录全局错误 */
export function setLastError(error: Error | null): void;

/** 从 config/env.js 重新加载环境配置 */
export function refreshEnv(): void;
