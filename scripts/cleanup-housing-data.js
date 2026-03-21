#!/usr/bin/env node

const path = require("path");
const { spawn } = require("child_process");
const { ENV_CONFIG_MAP } = require("../config/env");

const DEFAULT_COLLECTIONS = ["houses", "favorites", "history", "bookings"];

function parseArgs(argv) {
  const parsed = {};

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    if (!current.startsWith("--")) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    index += 1;
  }

  return parsed;
}

function resolveEnvId(args) {
  const explicitEnvId = String(args.envId || process.env.CLOUDBASE_ENV_ID || "").trim();
  if (explicitEnvId) {
    return explicitEnvId;
  }

  return String(ENV_CONFIG_MAP?.dev?.cloudEnvId || "").trim();
}

function normalizeCollections(rawValue) {
  const source = rawValue
    ? String(rawValue).split(",")
    : DEFAULT_COLLECTIONS;

  return Array.from(new Set(
    source
      .map((item) => String(item || "").trim())
      .filter((item) => DEFAULT_COLLECTIONS.includes(item))
  ));
}

function runCommand(command, args, timeoutMs) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true
    });

    let stdout = "";
    let stderr = "";
    let settled = false;
    let timeoutId = null;

    function finish(error) {
      if (settled) {
        return;
      }

      settled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        reject(error);
        return;
      }

      resolve({ stdout, stderr });
    }

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => finish(error));
    child.on("close", (code) => {
      if (code === 0) {
        finish(null);
        return;
      }

      finish(new Error(`PowerShell command exited with code ${code}`));
    });

    timeoutId = setTimeout(() => {
      try {
        child.kill();
      } catch {
        // Ignore cleanup failures after timeout.
      }

      finish(new Error(`PowerShell command timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });
}

function resolveTcbExecutable() {
  const nodeExecutable = process.execPath;
  const cliScriptPath = path.join(
    path.dirname(nodeExecutable),
    "node_modules",
    "@cloudbase",
    "cli",
    "bin",
    "tcb"
  );

  if (require("fs").existsSync(cliScriptPath)) {
    return {
      command: nodeExecutable,
      argsPrefix: [cliScriptPath]
    };
  }

  return {
    command: "tcb",
    argsPrefix: []
  };
}

function parseInvokeResult(output) {
  const matched = String(output || "").match(/Return result[：:](.+)/);
  if (!matched || !matched[1]) {
    throw new Error("未能从 tcb 输出中解析 Return result");
  }

  return JSON.parse(matched[1].trim());
}

function printSummary(data) {
  const summary = data && data.summary ? data.summary : {};
  const collections = Array.isArray(data?.collections) ? data.collections : [];

  console.log("");
  console.log(`[cleanup-housing-data] 模式: ${data?.dryRun ? "dry-run" : "apply"}`);
  console.log(`[cleanup-housing-data] 集合: ${collections.join(", ") || "(none)"}`);

  collections.forEach((collectionName) => {
    const item = summary[collectionName] || {};
    console.log(`- ${collectionName}: total=${Number(item.total || 0)}, removed=${Number(item.removed || 0)}`);
  });

  console.log(`[cleanup-housing-data] totalDocuments=${Number(data?.totalDocuments || 0)}`);
  console.log(`[cleanup-housing-data] totalRemoved=${Number(data?.totalRemoved || 0)}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const envId = resolveEnvId(args);
  const collections = normalizeCollections(args.collections);
  const dryRun = !Boolean(args.apply);

  if (!envId) {
    throw new Error("未找到 CloudBase 环境 ID，请通过 --envId 或 CLOUDBASE_ENV_ID 提供");
  }

  if (!collections.length) {
    throw new Error("未提供合法集合，请通过 --collections 指定 houses,favorites,history,bookings 中的一项或多项");
  }

  const params = JSON.stringify({
    action: "cleanupHousingData",
    payload: {
      allowBootstrap: true,
      dryRun,
      collections
    }
  });

  console.log(`[cleanup-housing-data] envId=${envId}`);
  console.log(`[cleanup-housing-data] mode=${dryRun ? "dry-run" : "apply"}`);
  console.log(`[cleanup-housing-data] collections=${collections.join(",")}`);

  const tcbExecutable = resolveTcbExecutable();
  const invokeArgs = [
    ...tcbExecutable.argsPrefix,
    "fn",
    "invoke",
    "bootstrap",
    "-e",
    envId,
    "--params",
    params
  ];
  const invokeResult = await runCommand(tcbExecutable.command, invokeArgs, 180000);
  const parsedResult = parseInvokeResult(invokeResult.stdout);

  if (!parsedResult || parsedResult.code !== 0) {
    throw new Error(parsedResult?.message || "cleanupHousingData 调用失败");
  }

  printSummary(parsedResult.data || {});
}

main().catch((error) => {
  console.error("[cleanup-housing-data] 执行失败");
  if (error && error.stdout) {
    console.error(error.stdout.trim());
  }
  if (error && error.stderr) {
    console.error(error.stderr.trim());
  }
  console.error(error && error.message ? error.message : error);
  process.exitCode = 1;
});
