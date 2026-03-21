const { ENV_CONFIG_MAP } = require('../config/env.js');

// 当项目实际分离出独立的 dev 云环境后，将生产 ID 加入此黑名单
const PROD_BLOCKLIST = [
  // 'cloudbase-9gqfm47q1b1d82c0'  // 取消注释即可重新启用生产拦截
];

function runSafetyCheck() {
  const devEnvId = ENV_CONFIG_MAP.dev.cloudEnvId;

  console.log(`[Safety] 正在执行防生产污染检查... 开发环境(dev)当前标定连线为: ${devEnvId}`);

  if (PROD_BLOCKLIST.includes(devEnvId)) {
    console.error('\n======================================================');
    console.error('🚫 [Fatal Error] 安全阻断：严禁高危发版状态启动自动化写库测试！');
    console.error('已侦测到 config/env.js 中的 dev 环境配置被疏忽指向了生产级数据库（' + devEnvId + '）');
    console.error('为了防止 mock 脏数据污染线上房源甚至真实租客数据脱库，所有 Automator 动作已经被熔断机制拉停。');
    console.error('请立刻将 env.js 中的开发环境切回 staging 或 dev，再重新执行 run-all.js！');
    console.error('======================================================\n');
    process.exit(1);
  }

  console.log('[Safety] ✅ 连线判定为安全测试服，准许进行脏数据读写交互。\n');
}

module.exports = runSafetyCheck;
