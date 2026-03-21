# 脚本目录说明

## 分类

- `auth/`：鉴权联调脚本
- `assets/`：图标等资源生成脚本
- `cleanup/`：清理云端测试数据脚本
- `data/`：测试账号、房源数据与图片处理脚本
- `deploy/`：云函数部署脚本
- `devtools/`：微信开发者工具独立调试脚本

## 注册账号相关

- `auth/devtools-auth-smoke.js`：会真实执行注册、登录、绑定/解绑微信、注销等完整账号流程
- `../test-scripts/auth/ui-register.js`：注册页 UI 校验截图脚本
- `../test-scripts/auth/ui-register-2.js`：注册页模拟器截图脚本

## 测试数据相关

- `data/prepare-manual-test-data.js`：校验文档测试账号并生成最小联调数据（房源 / 收藏 / 历史 / 聊天 / 通知 / 预约）
- `data/seed-six-house-test-data.js`：通过开发者工具脚本批量生成 6 条房源

## 其它迁移说明

- 原 `tests/create-bookings-collection.js` 已移动到 `data/create-bookings-collection.js`
- 原根目录 `generateIcons.js` 已移动到 `assets/generate-icons.js`
- 原根目录 `screenshot.js` 已移动到 `devtools/screenshot.js`
- 原根目录 `uploadCloudFunction.sh` 已移动到 `deploy/upload-cloudfunction.sh`
