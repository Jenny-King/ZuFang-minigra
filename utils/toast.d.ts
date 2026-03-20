/** 显示成功 Toast（1.5s 后自动隐藏） */
export function success(message?: string): Promise<void>;

/** 显示错误提示（长文本用 Modal，短文本用 Toast） */
export function error(message?: string): Promise<void>;

/** 显示信息 Toast（1.5s 后自动隐藏） */
export function info(message?: string): Promise<void>;

/** 显示 Loading 遮罩（调用 hide() 后 resolve） */
export function loading(message?: string): Promise<void>;

/** 隐藏所有 Toast / Loading */
export function hide(): Promise<void>;
