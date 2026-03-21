# 测试脚本目录说明

当前目录按“自动化底座 + 业务情景”组织：

- `core/`
  - `base.js`：连接微信开发者工具自动化、路由等待、页面断言
  - `session.js`：真实云端造数后注入登录态，并校验账号已进入登录状态
  - `simulator-capture.js`：按独立模拟器窗口截图
  - `run-all.js`：顺序执行全部 UI 情景脚本
- `scenarios/`
  - `ui-auth-home-2.js`：登录到首页
  - `ui-browse-detail-2.js`：首页到详情
  - `ui-favorites-history-2.js`：收藏与历史
  - `ui-chat-notifications-2.js`：聊天与通知
  - `ui-landlord-manage-2.js`：房东管理与编辑
  - `ui-settings-security-2.js`：我的页、设置、账号安全入口
- `legacy/`
  - `ui-home-2.js`：历史保留脚本
- `outputs/`
  - 自动化截图产物目录

执行前提：

- 先在微信开发者工具中打开当前项目
- 已安装并可用微信开发者工具 CLI
- 推荐先跑一次 `npm run seed:test-data`
- 如需独立模拟器截图，请开启独立模拟器窗口

常用命令：

```bash
npm run test:ui
```

```bash
npm run test:ui:favorites-history
```
