# 自动化脚本目录说明

## 分类

- `unit/`：Jest 单元测试与测试初始化文件
- `core/`：Automator 公共底座、批量运行器、安全检查、模拟器截图能力
- `auth/`：登录、注册、重置密码相关 UI 用例
- `chat/`：聊天页相关 UI 用例
- `housing/`：首页、筛选、房源详情、发布、收藏、历史等 UI 用例
- `profile/`：个人中心与通知相关 UI 用例
- `legacy/`：旧版 `-2.js` 模拟器截图用例，默认不参与 `core/run-all.js`

## 注册账号相关

- `auth/ui-register.js`
- `auth/ui-register-2.js`
