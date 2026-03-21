const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const scriptsDir = __dirname;
const tests = fs.readdirSync(scriptsDir).filter((f) => f.startsWith('ui-') && f.endsWith('-2.js')).sort();

const batchArg = process.argv.find((a) => a.startsWith('--batch'));
const batchNum = batchArg ? Number(process.argv[process.argv.indexOf(batchArg) + 1]) : 0;
const totalBatches = 4;

let selectedTests = tests;
if (batchNum >= 1 && batchNum <= totalBatches) {
  const chunkSize = Math.ceil(tests.length / totalBatches);
  const start = (batchNum - 1) * chunkSize;
  selectedTests = tests.slice(start, start + chunkSize);
  console.log(`\n🔹 Batch ${batchNum}/${totalBatches} 模式：本批将执行 ${selectedTests.length} 个 2 号用例`);
  console.log(`   范围: ${selectedTests.join(', ')}`);
} else if (batchNum) {
  console.error('--batch 取值为 1~4');
  process.exit(1);
}

console.log('\n================================');
console.log('🚀 准备开始运行 2 号自动化批量回归测试');
console.log(`   本次待执行: ${selectedTests.length} / ${tests.length} 个 2 号场景用例`);
console.log('================================\n');

let passed = 0;
let failed = 0;

selectedTests.forEach((testFile, index) => {
  const runnerPath = path.join(scriptsDir, testFile);
  console.log(`[${index + 1}/${selectedTests.length}] >>> 正在运行 ${testFile} >>>`);
  const res = spawnSync('node', [runnerPath], { stdio: 'inherit', timeout: 60000 });

  if (res.status === 0) {
    console.log(`✅ [${testFile}] 回归运行成功\n`);
    passed += 1;
  } else {
    const reason = res.error && res.error.message.includes('TIMEOUT') ? '超时' : `Exit ${res.status}`;
    console.log(`❌ [${testFile}] 异常 (${reason})\n`);
    failed += 1;
  }
});

console.log('================================');
console.log('📈 2 号回归测试总览:');
console.log(`    成功 ✅ ${passed} 个`);
console.log(`    失败 ❌ ${failed} 个`);
console.log('🖼️  截图存放于 ./outputs/[场景名称]/');
console.log('================================\n');
