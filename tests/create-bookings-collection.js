"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

const CloudBaseManager = require("@cloudbase/manager-node");
const { ENV_CONFIG_MAP } = require("../config/env");

const COLLECTION_NAME = "bookings";
const AUTH_FILE = path.join(os.homedir(), ".config", ".cloudbase", "auth.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveEnvId() {
  const explicitEnvId = String(process.env.CLOUDBASE_ENV_ID || "").trim();
  if (explicitEnvId) {
    return explicitEnvId;
  }

  return ENV_CONFIG_MAP.dev.cloudEnvId;
}

function loadCredential() {
  if (!fs.existsSync(AUTH_FILE)) {
    throw new Error(`未找到 CloudBase 登录凭证：${AUTH_FILE}，请先执行 tcb login`);
  }

  const authConfig = readJson(AUTH_FILE);
  const credential = authConfig && authConfig.credential ? authConfig.credential : null;

  if (!credential) {
    throw new Error("CloudBase 登录凭证格式无效，请重新执行 tcb login");
  }

  const secretId = String(credential.tmpSecretId || "").trim();
  const secretKey = String(credential.tmpSecretKey || "").trim();
  const token = String(credential.tmpToken || "").trim();
  const expiresAt = Number(credential.tmpExpired || 0);

  if (!secretId || !secretKey || !token) {
    throw new Error("CloudBase 临时凭证缺失，请重新执行 tcb login");
  }

  if (expiresAt && Date.now() >= expiresAt) {
    throw new Error("CloudBase 临时凭证已过期，请重新执行 tcb login");
  }

  return { secretId, secretKey, token };
}

function isAlreadyExistsError(error) {
  const message = String(error && error.message ? error.message : "").toLowerCase();
  return (
    message.includes("already exists")
    || message.includes("already exist")
    || message.includes("table exist")
    || message.includes("table exists")
    || message.includes("已存在")
    || message.includes("duplicate")
  );
}

async function main() {
  const envId = resolveEnvId();
  const credential = loadCredential();
  const manager = new CloudBaseManager({
    ...credential,
    envId
  });

  try {
    const result = await manager.database.createCollection(COLLECTION_NAME);
    console.log(JSON.stringify({
      success: true,
      envId,
      collection: COLLECTION_NAME,
      created: true,
      requestId: result && result.RequestId ? result.RequestId : ""
    }, null, 2));
  } catch (error) {
    if (isAlreadyExistsError(error)) {
      console.log(JSON.stringify({
        success: true,
        envId,
        collection: COLLECTION_NAME,
        created: false,
        message: "集合已存在"
      }, null, 2));
      return;
    }

    throw error;
  }
}

main().catch((error) => {
  console.error(JSON.stringify({
    success: false,
    collection: COLLECTION_NAME,
    message: error && error.message ? error.message : "未知错误"
  }, null, 2));
  process.exit(1);
});
