# 微信小程序租房平台

原生微信小程序 + 微信云开发的租房平台，采用严格分层架构：

`页面层 -> services -> services/cloud -> cloudfunctions`

## 主要能力

- 微信 / 手机号登录
- 密码重置、换绑手机号、绑定邮箱
- 房源发布、编辑、上下架、删除
- 收藏、浏览历史、聊天与通知
- 在线客服、问题反馈与系统回执通知
- 开发环境 bootstrap 初始化与测试数据脚本

## 关键目录

- `pages/` 与 `package-*`：小程序页面
- `services/`：前端服务层与云能力封装
- `cloudfunctions/`：云函数
- `scripts/`：按 `auth / assets / cleanup / data / deploy / devtools` 分类的工具脚本
- `test-scripts/`：按 `core / scenarios / legacy / outputs` 组织的 UI 自动化与截图目录
- `docs/`：需求、架构、接口、数据库与联调文档

## 开发说明

- 页面禁止直接调用 `wx.cloud.callFunction`
- 图片上传统一走 `services/cloud/upload.js`
- 受保护接口统一通过 `accessToken -> user_sessions -> userId` 鉴权
- `bootstrap` 仅允许在显式标记的非生产环境执行
- `map` 云函数接入腾讯地图 WebService 时，需要在云开发控制台配置环境变量 `TENCENT_MAP_KEY` 和 `TENCENT_MAP_SK`

## 文档导航

- [docs/文档导航.md](D:/Grade4-2/coding4-1/docs/文档导航.md)：先读这份，了解各文档用途
- [docs/AGENTS.md](D:/Grade4-2/coding4-1/docs/AGENTS.md)：给 Codex / Cursor / 代码代理的仓库上下文
- [docs/PRD-需求文档.md](D:/Grade4-2/coding4-1/docs/PRD-需求文档.md)：产品需求与范围
- [docs/技术架构设计.md](D:/Grade4-2/coding4-1/docs/技术架构设计.md)：系统架构、分层、路由与云函数设计
- [docs/接口设计说明.md](D:/Grade4-2/coding4-1/docs/接口设计说明.md)：前端 service 与云函数 action 约定
- [docs/数据库设计说明.md](D:/Grade4-2/coding4-1/docs/数据库设计说明.md)：集合设计与数据约束
- [docs/开发规范说明.md](D:/Grade4-2/coding4-1/docs/开发规范说明.md)：编码与分层规范
- [docs/测试计划.md](D:/Grade4-2/coding4-1/docs/测试计划.md)：按测试层次与业务主链路组织的整体测试方案
- [docs/测试与联调指南.md](D:/Grade4-2/coding4-1/docs/测试与联调指南.md)：测试账号、联调命令与核心验收清单

## 测试脚本说明

当前 UI 自动化脚本按业务链路拆分在 `test-scripts/scenarios/`：

```bash
npm run test:ui
```

如只回归“收藏/历史必须有数据”的关键链路，可执行：

```bash
npm run test:ui:favorites-history
```

截图仍统一落在 `test-scripts/outputs/`，可用于留档或比对。
