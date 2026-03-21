# 租房微信小程序 - docs/AGENTS.md

> 本文件用于给 Codex / Cursor / 其他代码代理快速建立项目上下文。所有自动生成、重构和联调工作都应优先遵守本文件，再参考 `docs/文档导航.md`、`docs/PRD-需求文档.md`、`docs/技术架构设计.md`、`docs/接口设计说明.md` 与 `docs/数据库设计说明.md`。

---

## 项目简介

微信小程序租房平台，支持：

- 租客浏览房源、查看详情、收藏、浏览历史、与房东聊天
- 房东发布房源、编辑房源、删除房源、接收消息
- 用户通过微信或手机号登录，并在个人中心进行身份资料登记、角色切换、微信绑定管理

---

## 技术栈

- 前端：微信小程序原生开发
- 后端：微信云开发
- 运行形态：云函数 + 云数据库 + 云存储
- 语言：JavaScript
- 异步规范：统一使用 `async/await`

---

## 当前仓库结构

```text
coding4-1/
├─ app.js / app.json / app.wxss
├─ assets/
│  ├─ icons/
│  └─ images/
├─ behaviors/
│  └─ pagination.js
├─ cloudfunctions/
│  ├─ auth/
│  ├─ user/
│  ├─ house/
│  ├─ favorite/
│  ├─ history/
│  ├─ chat/
│  ├─ map/
│  ├─ support/
│  └─ bootstrap/
├─ config/
│  ├─ constants.js
│  ├─ env.js
│  └─ routes.js
├─ docs/
├─ scripts/
├─ package-auth/pages/
│  ├─ login/
│  ├─ register/
│  ├─ reset-password/
│  └─ verify/
├─ package-chat/pages/detail/
├─ package-house/pages/detail/
├─ package-profile/pages/
│  ├─ edit-profile/
│  ├─ favorites/
│  ├─ history/
│  ├─ notifications/
│  ├─ settings/
│  ├─ support-center/
│  └─ my-houses/   (legacy page, no longer registered in app.json)
├─ pages/
│  ├─ home/
│  ├─ publish/
│  ├─ chat/
│  └─ profile/
├─ services/
│  ├─ cloud/
│  │  ├─ call.js
│  │  └─ upload.js
│  ├─ auth.service.js
│  ├─ bootstrap.service.js
│  ├─ chat.service.js
│  ├─ favorite.service.js
│  ├─ history.service.js
│  ├─ house.service.js
│  ├─ map.service.js
│  └─ user.service.js
├─ store/
│  ├─ app.store.js
│  └─ user.store.js
├─ styles/
├─ test-scripts/
└─ utils/
   ├─ auth.js
   ├─ format.js
   ├─ logger.js
   ├─ storage.js
   └─ validate.js
```

---

## 核心编码约束

1. 页面禁止直接调用 `wx.cloud.callFunction`
2. 所有云函数调用必须经由 `services/cloud/call.js`
3. 页面层只负责 UI 和交互，业务逻辑下沉到 `services` / `store`
4. 受保护接口的当前用户识别统一走 `accessToken -> user_sessions -> userId`
5. 收藏、历史、聊天、房源归属等跨集合关系统一使用 `userId`
6. 微信身份绑定统一由 `user_identities(type=wechat_openid)` 管理
7. 手机号身份统一由 `user_identities(type=phone)` 管理
8. 客户端登录态统一保存 `accessToken + userInfo`
9. `updateProfile` 不允许直接修改手机号，手机号换绑必须走独立流程
10. `app.js` 启动时禁止自动写测试数据

---

## 服务层调用范式

```js
const houseService = require("../../services/house.service");

const list = await houseService.getHouseList(params);
```

```js
const { callCloud } = require("./cloud/call");

function getHouseList(params) {
  return callCloud("house", "getList", params);
}
```

说明：

- `callCloud()` 会统一拼装 `action`、`payload`
- 若本地已保存 `accessToken`，会自动附带到请求体中的 `auth.accessToken`
- 服务端统一返回标准结构，由 `services/cloud/response.js` 解析

---

## 用户身份与登录态规范

当前统一模型如下：

- `users`：用户资料主体，只存业务资料和认证状态
- `user_identities`：身份映射，只存 `phone` / `wechat_openid -> userId`
- `user_sessions`：登录会话，只存 `tokenHash -> userId`
- `accessToken`：客户端当前请求凭证
- `userInfo`：客户端展示缓存，不作为服务端认证依据

约束：

- 手机号注册、手机号登录不会自动写入微信 `openid`
- 微信绑定必须显式调用 `auth.bindWechat`
- 微信解绑必须显式调用 `auth.unbindWechat`
- 退出登录必须显式调用 `auth.logout`
- 服务端不能再通过 `users._openid` 判断“当前用户是谁”

---

## 当前认证链路

1. 注册 / 登录成功后，`auth` 云函数创建 `user_sessions`
2. 前端保存 `accessToken + userInfo`
3. 后续请求由 `callCloud()` 自动附带 `auth.accessToken`
4. 受保护云函数先校验 session，再拿 `userId` 读取 `users`
5. 若 token 失效，前端通过 `userStore.refreshCurrentUser()` 自动清理本地登录态

---

## 页面与云函数职责

主要页面：

- `pages/home/index`：房源列表
- `pages/publish/index`：房源管理首页（Tab“发布”）
- `package-house/pages/detail/index`：房源详情
- `pages/publish/edit`：发布 / 编辑房源三步表单
- `pages/chat/index`：会话列表
- `package-chat/pages/detail/index`：聊天详情
- `pages/profile/index`：个人中心，包含统计卡、客服中心、设置、账号缓存与退出登录
- `package-auth/pages/login/index`：微信登录 / 手机号登录
- `package-auth/pages/register/index`：注册
- `package-auth/pages/reset-password/index`：重置密码
- `package-auth/pages/verify/index`：身份资料登记
- `package-profile/pages/edit-profile/index`：资料编辑
- `package-profile/pages/support-center/index`：客服中心与问题反馈
- `package-profile/pages/settings/index`：设置页
- `package-profile/pages/notifications/index`：通知列表

主要云函数：

- `auth`：登录、注册、验证码、重置密码、身份资料登记、微信绑定、退出登录
- `user`：当前用户资料、资料更新、换绑手机号、绑定邮箱、修改密码、切换角色、注销账号
- `house`：房源列表、详情、区域、发布 / 编辑 / 删除 / 我的房源
- `favorite`：收藏
- `history`：浏览历史
- `chat`：会话、消息、通知
- `map`：地理编码、逆地理编码、周边搜索
- `support`：问题反馈提交与反馈成功通知
- `bootstrap`：初始化集合与区域数据，仅开发环境允许

---

## 数据库集合清单

| 集合名 | 用途 |
| --- | --- |
| `users` | 用户资料、角色、认证状态 |
| `user_identities` | 身份映射：手机号 / 微信身份 |
| `user_sessions` | 登录会话 |
| `sms_codes` | 短信验证码临时存储 |
| `houses` | 房源主数据 |
| `favorites` | 收藏关系 |
| `history` | 浏览历史 |
| `conversations` | 会话摘要 |
| `chat_messages` | 聊天消息 |
| `messages` | 系统 / 业务通知 |
| `regions` | 区域筛选基础数据 |
| `support_feedbacks` | 客服反馈工单 |

---

## 生成与改造建议

进行后续开发或重构时，优先遵循以下顺序：

1. 先确认 `docs/接口设计说明.md` 和 `docs/数据库设计说明.md`
2. 再改 `services/*` 和 `store/*`
3. 再改页面层
4. 最后改云函数与联调脚本

任何新增功能都不得重新引入以下旧做法：

- 以 `_openid` 作为当前用户主键
- 让手机号注册自动绑定微信身份
- 在页面层手写 `wx.cloud.callFunction`
- 通过 `updateProfile` 直接改手机号
