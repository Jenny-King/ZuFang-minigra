# 微信小程序租房平台

原生微信小程序 + 微信云开发的租房平台，采用严格分层架构：

`页面层 -> services -> services/cloud -> cloudfunctions`

## 主要能力

- 微信 / 手机号登录
- 密码重置与身份资料登记
- 房源发布、编辑、删除
- 收藏、浏览历史、聊天与通知
- 开发环境 bootstrap 初始化与测试数据脚本

## 关键目录

- `pages/` 与 `package-*`：小程序页面
- `services/`：前端服务层与云能力封装
- `cloudfunctions/`：云函数
- `scripts/`：联调、部署、测试数据相关脚本
- `docs/`：架构、接口、数据库与维护文档

## 开发说明

- 页面禁止直接调用 `wx.cloud.callFunction`
- 图片上传统一走 `services/cloud/upload.js`
- 受保护接口统一通过 `accessToken -> user_sessions -> userId` 鉴权
- `bootstrap` 仅允许在显式标记的非生产环境执行
- `map` 云函数接入腾讯地图 WebService 时，需要在云开发控制台配置环境变量 `TENCENT_MAP_KEY`

更多上下文请先阅读：

- `docs/AGENTS.md`
- `docs/技术架构设计.md`
- `docs/接口设计说明.md`
- `docs/数据库设计说明.md`
