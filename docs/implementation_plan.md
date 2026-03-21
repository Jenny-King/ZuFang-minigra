# [自动化测试目录进阶扩充方案]

基于已经搭建好的 `test-scripts/` 底座环境，进一步扩充 4 个复杂组件及业务隔离的 UI 重绘自动化截屏测试。

## Proposed Changes

### test-scripts/core/base.js
- **[MODIFY]** [takeScreen(miniProgram, scene)](file:///C:/Users/Q12/.gemini/antigravity/scratch/ZuFang-minigra/test-scripts/core/base.js#37-56) 方法中，通过 `path.join('outputs', scene)` 动态创建该场景对应的子目录，并将截图文件统一使用 `Date.now() + '.png'` 时间格式进行重命名。由于之前的四个脚本参数 `name` 便是 `sceneName`，改动无需侵入旧有场景脚本即可向前兼容生效。

### 新增进阶场景用例
#### [NEW] test-scripts/auth/ui-auth-flow.js
- 转跳至登录页，**不使用 mockLogin**。
- 清除表单后试图直接强制提交，截取表单校验不合规报红或 Toast 的排版截图，存放于 `outputs/ui-auth-flow/`。

#### [NEW] test-scripts/chat/ui-chat-detail.js
- 跳入 `pages/chat/index` （聊天具体详情框），调用 `setData` 人为推入图文混排的长数据以填充列表，并聚焦键盘拉起输入框。
- 观测 ScrollView 内容不被输入法键盘遮盖及图文自适应边界，存放于 `outputs/ui-chat-detail/`。

#### [NEW] test-scripts/housing/ui-house-filter.js
- 停留在首页 `pages/home/index`，模拟点击顶部的筛选项分类开启 Dropdown Menu（如触发“整租”或者“区域”气泡），随后劫持数据列表置为一个空数组 `[]`。
- 测试缺省 EmptyState 以及下拉悬浮层面的 z-index，存放于 `outputs/ui-house-filter/`。

#### [NEW] test-scripts/housing/ui-skeleton-smoke.js
- 极其重要的占位符性能保障感知测试。
- 使用 `miniProgram.mockWxMethod('request', ...)` 覆盖网络原生层！使所有针对底层详情和首页列表的响应死阻塞或强行挂起超 3-5 秒钟。
- 此时捕获页面渲染的骨架屏层级及动画完整度，存放于 `outputs/ui-skeleton-smoke/`。

### 批量运行管理器
#### [NEW] test-scripts/core/run-all.js
- 核心批处理调度总线。
- 载入 `fs` 获取 `test-scripts/` 目录下匹配 `ui-*.js` 的测试用例集，通过 `child_process.spawnSync` 进行按需单线程**串行**驱动。
- 因为 Automator wsEndpoint 独占端口的连接特性，采用串行执行并在结束后流转，并在终端 Console 彩色输出每一个用例成功和失败的汇总状态。

## Verification Plan
1. 人为执行一嘴 `node test-scripts/core/run-all.js` 
2. 检测脚本中继的报错回滚，等待全数回归后使用 `tree` 确保对应的 `outputs/场景名/时间戳.png` 能够被树形检阅到，并上报给协作者审查。
