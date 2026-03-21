const path = require("path");
const { spawn } = require("child_process");

const SCENARIO_FILES = [
  "test-scripts/scenarios/ui-auth-home-2.js",
  "test-scripts/scenarios/ui-browse-detail-2.js",
  "test-scripts/scenarios/ui-favorites-history-2.js",
  "test-scripts/scenarios/ui-chat-notifications-2.js",
  "test-scripts/scenarios/ui-landlord-manage-2.js",
  "test-scripts/scenarios/ui-settings-security-2.js"
];

function runOne(scriptPath) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [scriptPath], {
      cwd: process.cwd(),
      stdio: "inherit",
      windowsHide: false
    });

    child.on("close", (code) => {
      resolve({
        scriptPath,
        code: Number(code || 0)
      });
    });
  });
}

async function main() {
  const results = [];

  for (const relativePath of SCENARIO_FILES) {
    const scriptPath = path.resolve(process.cwd(), relativePath);
    // eslint-disable-next-line no-await-in-loop
    const result = await runOne(scriptPath);
    results.push(result);
  }

  const failed = results.filter((item) => item.code !== 0);
  const passed = results.length - failed.length;

  console.log("");
  console.log(`[ui-run-all] pass=${passed} fail=${failed.length}`);
  results.forEach((item) => {
    console.log(`- ${item.code === 0 ? "PASS" : "FAIL"} ${item.scriptPath}`);
  });

  if (failed.length) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("[ui-run-all] fail:", error && error.stack ? error.stack : error);
  process.exit(1);
});
