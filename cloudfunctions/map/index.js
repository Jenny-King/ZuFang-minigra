const cloud = require("wx-server-sdk");
const crypto = require("crypto");
const https = require("https");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const TENCENT_MAP_BASE_URL = "https://apis.map.qq.com/ws";

function createLogger(context) {
  const prefix = `[map][${context?.requestId || "local"}]`;
  return {
    info(tag, data) {
      console.log(`${prefix}[INFO][${tag}]`, JSON.stringify(data || {}));
    },
    error(tag, data) {
      console.error(`${prefix}[ERROR][${tag}]`, JSON.stringify(data || {}));
    }
  };
}

function success(data, message = "") {
  return {
    code: 0,
    data: data === undefined ? null : data,
    message: String(message || "")
  };
}

function fail(message, code = -1, data = null) {
  return {
    code,
    data: data === undefined ? null : data,
    message: message || "请求失败"
  };
}

function getTencentMapKey() {
  return String(process.env.TENCENT_MAP_KEY || "").trim();
}

function getTencentMapSk() {
  return String(process.env.TENCENT_MAP_SK || "").trim();
}

function sortQueryEntries(query = {}) {
  return Object.keys(query)
    .filter((key) => query[key] !== undefined && query[key] !== null && query[key] !== "")
    .sort((left, right) => left.localeCompare(right))
    .map((key) => [key, String(query[key])]);
}

function buildQueryString(query = {}, options = {}) {
  const { encode = true } = options;
  return sortQueryEntries(query)
    .map(([key, value]) => (
      encode
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : `${key}=${value}`
    ))
    .join("&");
}

function createTencentMapSignature(pathname, query = {}, secretKey = "") {
  if (!secretKey) {
    return "";
  }

  const rawQueryString = buildQueryString(query, { encode: false });
  const source = `${pathname}${rawQueryString ? `?${rawQueryString}` : ""}${secretKey}`;
  return crypto.createHash("md5").update(source, "utf8").digest("hex");
}

function buildTencentMapUrl(pathname, query = {}) {
  const queryString = buildQueryString(query, { encode: true });

  return `${TENCENT_MAP_BASE_URL}${pathname}${queryString ? `?${queryString}` : ""}`;
}

function buildTencentMapRequest(pathname, query = {}) {
  const secretKey = getTencentMapSk();
  const signedQuery = { ...query };

  if (secretKey) {
    signedQuery.sig = createTencentMapSignature(`/ws${pathname}`, query, secretKey);
  }

  return {
    url: buildTencentMapUrl(pathname, signedQuery),
    headers: {
      "x-legacy-url-decode": "no"
    }
  };
}

function normalizeCoordinate(value) {
  if (value === "" || value === null || value === undefined) {
    return NaN;
  }
  return Number(value);
}

function buildAddressComponent(component = {}) {
  return {
    province: String(component.province || "").trim(),
    city: String(component.city || "").trim(),
    district: String(component.district || "").trim()
  };
}

function buildAdInfo(adInfo = {}) {
  return {
    adcode: String(adInfo.adcode || "").trim(),
    province: String(adInfo.province || "").trim(),
    city: String(adInfo.city || "").trim(),
    district: String(adInfo.district || "").trim()
  };
}

function requestJson(url, options = {}) {
  const headers = options.headers || undefined;
  return new Promise((resolve, reject) => {
    https
      .get(url, { headers }, (res) => {
        let raw = "";
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw || "{}"));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

async function handleGeocode(payload) {
  const address = String(payload.address || "").trim();
  if (!address) return fail("address 不能为空");
  const key = getTencentMapKey();
  const fallbackLocation = { lat: 0, lng: 0 };
  if (!key) {
    return success({
      latitude: 0,
      longitude: 0,
      formattedAddress: address,
      location: fallbackLocation,
      message: "未配置地图 key，返回占位坐标"
    });
  }
  const request = buildTencentMapRequest("/geocoder/v1/", {
    address,
    key
  });
  const data = await requestJson(request.url, { headers: request.headers });
  if (Number(data.status) !== 0) return fail(data.message || "地址解析失败");
  const location = data.result?.location || fallbackLocation;
  const latitude = Number(location.lat || 0);
  const longitude = Number(location.lng || 0);
  const formattedAddress = String(
    data.result?.formatted_addresses?.recommend
      || data.result?.address
      || address
  ).trim() || address;
  return success({
    latitude,
    longitude,
    formattedAddress,
    location: {
      lat: latitude,
      lng: longitude
    }
  });
}

async function handleReverseGeocode(payload) {
  const latitude = normalizeCoordinate(payload.latitude);
  const longitude = normalizeCoordinate(payload.longitude);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return fail("经纬度格式错误");
  }

  const key = getTencentMapKey();
  if (!key) {
    return success({
      latitude,
      longitude,
      formattedAddress: "",
      address: "",
      location: {
        lat: latitude,
        lng: longitude
      },
      addressComponent: buildAddressComponent(),
      adInfo: buildAdInfo(),
      message: "未配置地图 key，返回原始坐标"
    });
  }

  const request = buildTencentMapRequest("/geocoder/v1/", {
    location: `${latitude},${longitude}`,
    get_poi: 0,
    key
  });
  const data = await requestJson(request.url, { headers: request.headers });
  if (Number(data.status) !== 0) return fail(data.message || "逆地址解析失败");

  const result = data.result || {};
  const formattedAddress = String(
    result.formatted_addresses?.recommend
      || result.address
      || ""
  ).trim();
  const address = String(result.address || formattedAddress || "").trim();

  return success({
    latitude,
    longitude,
    formattedAddress,
    address,
    location: {
      lat: latitude,
      lng: longitude
    },
    addressComponent: buildAddressComponent(result.address_component),
    adInfo: buildAdInfo(result.ad_info)
  });
}

async function handleSearchNearby(payload) {
  const latitude = normalizeCoordinate(payload.latitude);
  const longitude = normalizeCoordinate(payload.longitude);
  const keywords = String(payload.keywords || "").trim() || "超市|地铁|公交";
  if (Number.isNaN(latitude) || Number.isNaN(longitude)) return fail("经纬度格式错误");
  const key = getTencentMapKey();
  if (!key) {
    return success([]);
  }
  const boundary = `nearby(${latitude},${longitude},1000)`;
  const request = buildTencentMapRequest("/place/v1/search", {
    keyword: keywords,
    boundary,
    key
  });
  const data = await requestJson(request.url, { headers: request.headers });
  if (Number(data.status) !== 0) return fail(data.message || "周边检索失败");
  const list = (data.data || []).slice(0, 5).map((item) => ({
    title: item.title,
    distance: Number(item._distance || item.distance || 0),
    category: item.category || item.type || ""
  }));
  return success(list);
}

exports.main = async (event, context) => {
  const logger = createLogger(context);
  const action = event?.action || "";
  const payload = event?.payload || {};
  logger.info("start", { action });
  try {
    let result = fail("未知 action");
    if (action === "geocode") result = await handleGeocode(payload);
    if (action === "reverseGeocode") result = await handleReverseGeocode(payload);
    if (action === "searchNearby") result = await handleSearchNearby(payload);
    logger.info("success", { action, code: result.code });
    return result;
  } catch (err) {
    logger.error("fail", { action, err: err.message, stack: err.stack });
    return fail(err.message || "服务异常", 500);
  }
};
