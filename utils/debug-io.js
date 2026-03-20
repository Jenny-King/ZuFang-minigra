/**
 * utils/debug-io.js
 * Storage I/O 性能监控 — 劫持 wx.*Storage* 接口，统计调用次数
 * 在 app.js 顶部第一行 require 即可生效
 */

const _counters = {
  getStorageSync: 0,
  setStorageSync: 0,
  getStorage: 0,
  setStorage: 0,
  removeStorageSync: 0,
  removeStorage: 0
};

const _callLog = []; // { ts, api, key }
const _startTime = Date.now();

// 保存原始引用
const _original = {
  getStorageSync: wx.getStorageSync,
  setStorageSync: wx.setStorageSync,
  getStorage: wx.getStorage,
  setStorage: wx.setStorage,
  removeStorageSync: wx.removeStorageSync,
  removeStorage: wx.removeStorage
};

function logCall(api, key) {
  _counters[api] = (_counters[api] || 0) + 1;
  const entry = { ts: Date.now() - _startTime, api, key: key || "?" };
  _callLog.push(entry);
  console.log(`[IO-Audit] ${api}: ${entry.key}  (#${_counters[api]}, +${entry.ts}ms)`);
}

// 劫持同步读
Object.defineProperty(wx, "getStorageSync", {
  configurable: true,
  writable: true,
  value: function getStorageSyncProxy(key) {
    logCall("getStorageSync", key);
    return _original.getStorageSync.call(wx, key);
  }
});

// 劫持同步写
Object.defineProperty(wx, "setStorageSync", {
  configurable: true,
  writable: true,
  value: function setStorageSyncProxy(key, data) {
    logCall("setStorageSync", key);
    return _original.setStorageSync.call(wx, key, data);
  }
});

// 劫持同步删除
Object.defineProperty(wx, "removeStorageSync", {
  configurable: true,
  writable: true,
  value: function removeStorageSyncProxy(key) {
    logCall("removeStorageSync", key);
    return _original.removeStorageSync.call(wx, key);
  }
});

// 劫持异步读
Object.defineProperty(wx, "getStorage", {
  configurable: true,
  writable: true,
  value: function getStorageProxy(options) {
    logCall("getStorage", options && options.key);
    return _original.getStorage.call(wx, options);
  }
});

// 劫持异步写
Object.defineProperty(wx, "setStorage", {
  configurable: true,
  writable: true,
  value: function setStorageProxy(options) {
    logCall("setStorage", options && options.key);
    return _original.setStorage.call(wx, options);
  }
});

// 劫持异步删除
Object.defineProperty(wx, "removeStorage", {
  configurable: true,
  writable: true,
  value: function removeStorageProxy(options) {
    logCall("removeStorage", options && options.key);
    return _original.removeStorage.call(wx, options);
  }
});

/**
 * 获取 I/O 统计报告
 */
function getIOReport() {
  const elapsed = Date.now() - _startTime;
  const totalSync = _counters.getStorageSync + _counters.setStorageSync + _counters.removeStorageSync;
  const totalAsync = _counters.getStorage + _counters.setStorage + _counters.removeStorage;

  const report = [
    "",
    "╔══════════════════════════════════════════════╗",
    "║        Storage I/O Audit Report              ║",
    "╠══════════════════════════════════════════════╣",
    `║  Elapsed:  ${elapsed}ms`,
    "╠──────────────────────────────────────────────╣",
    "║  [SYNC]                                      ║",
    `║    getStorageSync:    ${_counters.getStorageSync}`,
    `║    setStorageSync:    ${_counters.setStorageSync}`,
    `║    removeStorageSync: ${_counters.removeStorageSync}`,
    `║    Subtotal (sync):   ${totalSync}`,
    "╠──────────────────────────────────────────────╣",
    "║  [ASYNC]                                     ║",
    `║    getStorage:        ${_counters.getStorage}`,
    `║    setStorage:        ${_counters.setStorage}`,
    `║    removeStorage:     ${_counters.removeStorage}`,
    `║    Subtotal (async):  ${totalAsync}`,
    "╠──────────────────────────────────────────────╣",
    `║  TOTAL I/O:           ${totalSync + totalAsync}`,
    "╚══════════════════════════════════════════════╝",
    ""
  ].join("\n");

  console.log(report);

  // 按 key 聚合 Top 调用
  const keyAgg = {};
  _callLog.forEach((entry) => {
    const k = entry.key;
    if (!keyAgg[k]) {
      keyAgg[k] = { reads: 0, writes: 0, deletes: 0 };
    }
    if (entry.api.includes("get")) {
      keyAgg[k].reads++;
    } else if (entry.api.includes("set")) {
      keyAgg[k].writes++;
    } else {
      keyAgg[k].deletes++;
    }
  });

  console.log("[IO-Audit] Per-key breakdown:");
  Object.keys(keyAgg)
    .sort((a, b) => {
      const totalA = keyAgg[a].reads + keyAgg[a].writes + keyAgg[a].deletes;
      const totalB = keyAgg[b].reads + keyAgg[b].writes + keyAgg[b].deletes;
      return totalB - totalA;
    })
    .forEach((key) => {
      const s = keyAgg[key];
      console.log(`  ${key}: R=${s.reads} W=${s.writes} D=${s.deletes}`);
    });

  return { counters: { ..._counters }, elapsed, totalSync, totalAsync, callLog: _callLog.slice() };
}

/**
 * 重置计数器
 */
function resetIOCounters() {
  Object.keys(_counters).forEach((k) => { _counters[k] = 0; });
  _callLog.length = 0;
}

module.exports = { getIOReport, resetIOCounters };
