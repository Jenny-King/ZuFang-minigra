module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1773651886796, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
const clone = require("clone");
const signer_1 = require("./signer");
const utils_1 = require("./utils");
__exportStar(require("./keyvalue"), exports);
__exportStar(require("./signer"), exports);
__exportStar(require("./utils.http"), exports);
__exportStar(require("./utils.lang"), exports);
__exportStar(require("./utils"), exports);
function sign(options) {
    const { secretId, secretKey, method, url, service, withSignedParams, isCloudApi, includeKeys, excludeKeys } = options;
    // isCloudApi 为 true, 说明使用 cloud api v3, 返回签名值中不能携带 signedParams
    let validWithSignedParams = withSignedParams;
    if (isCloudApi === true && withSignedParams === true) {
        console.warn('isCloudApi 和 withSignedParams 参数同时为 true, withSignedParams 会自动转为 false');
        validWithSignedParams = false;
    }
    const signer = new signer_1.Signer({ secretId, secretKey }, service || 'tcb');
    const headers = clone(options.headers || {});
    const params = clone(options.params === undefined ? '' : options.params);
    const timestamp = options.timestamp || utils_1.second() - 1;
    const signatureInfo = signer.tc3sign(method, url, headers, params, timestamp, {
        withSignedParams: validWithSignedParams,
        isCloudApi,
        includeKeys,
        excludeKeys
    });
    return {
        authorization: signatureInfo.authorization,
        timestamp: signatureInfo.timestamp,
        multipart: signatureInfo.multipart
    };
}
exports.sign = sign;

}, function(modId) {var map = {"./signer":1773651886797,"./utils":1773651886798,"./keyvalue":1773651886800,"./utils.http":1773651886801,"./utils.lang":1773651886799}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886797, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.Signer = exports.signedParamsSeparator = void 0;
const crypto = require("crypto");
const url_1 = require("url");
const util = require("util");
const isStream = require("is-stream");
const utils_1 = require("./utils");
const utils_lang_1 = require("./utils.lang");
const keyvalue_1 = require("./keyvalue");
const debug = util.debuglog('@cloudbase/signature');
exports.signedParamsSeparator = ';';
const HOST_KEY = 'host';
const CONTENT_TYPE_KEY = 'content-type';
var MIME;
(function (MIME) {
    MIME["MULTIPART_FORM_DATA"] = "multipart/form-data";
    MIME["APPLICATION_JSON"] = "application/json";
})(MIME || (MIME = {}));
class Signer {
    constructor(credential, service, options = {}) {
        this.credential = credential;
        this.service = service;
        this.algorithm = 'TC3-HMAC-SHA256';
        this.options = options;
    }
    static camSafeUrlEncode(str) {
        return encodeURIComponent(str)
            .replace(/!/g, '%21')
            .replace(/'/g, '%27')
            .replace(/\(/g, '%28')
            .replace(/\)/g, '%29')
            .replace(/\*/g, '%2A');
    }
    /**
     * 将一个对象处理成 KeyValue 形式，嵌套的对象将会被处理成字符串，Key转换成小写字母
     * @param {Object}  obj - 待处理的对象
     * @param {Object}  options
     * @param {Boolean} options.enableBuffer
     */
    static formatKeyAndValue(obj, options = {}) {
        if (!utils_lang_1.isPlainObject(obj)) {
            return obj;
        }
        // enableValueToLowerCase：头部字段，要求小写，其他数据不需要小写，所以这里避免转小写
        const { multipart, enableValueToLowerCase = false, selectedKeys, filter } = options;
        const kv = {};
        Object.keys(obj || {}).forEach((key) => {
            // NOTE: 客户端类型在服务端可能会丢失
            const lowercaseKey = Signer.camSafeUrlEncode(key.toLowerCase().trim());
            // 过滤 Key，服务端接收到的数据，可能含有未签名的 Key，通常是签名的时候被过滤掉的流，数据量可能会比较大
            // 所以这里提供一个过滤的判断，避免不必要的计算
            // istanbul ignore next
            if (Array.isArray(selectedKeys) && !selectedKeys.includes(lowercaseKey)) {
                return;
            }
            // istanbul ignore next
            if (typeof filter === 'function') {
                if (filter(key, obj[key], options)) {
                    return;
                }
            }
            // istanbul ignore else
            if (key && obj[key] !== undefined) {
                if (lowercaseKey === CONTENT_TYPE_KEY) {
                    // multipart/form-data; boundary=???
                    if (obj[key].startsWith(MIME.MULTIPART_FORM_DATA)) {
                        kv[lowercaseKey] = MIME.MULTIPART_FORM_DATA;
                    }
                    else {
                        kv[lowercaseKey] = obj[key];
                    }
                    return;
                }
                if (isStream(obj[key])) {
                    // 这里如果是个文件流，在发送的时候可以识别
                    // 服务端接收到数据之后传到这里判断不出来的
                    // 所以会进入后边的逻辑
                    return;
                }
                if (utils_1.isNodeEnv() && Buffer.isBuffer(obj[key])) {
                    if (multipart) {
                        kv[lowercaseKey] = obj[key];
                    }
                    else {
                        kv[lowercaseKey] = enableValueToLowerCase
                            ? utils_1.stringify(obj[key]).trim().toLowerCase()
                            : utils_1.stringify(obj[key]).trim();
                    }
                }
                else {
                    kv[lowercaseKey] = enableValueToLowerCase
                        ? utils_1.stringify(obj[key]).trim().toLowerCase()
                        : utils_1.stringify(obj[key]).trim();
                }
            }
        });
        return kv;
    }
    static calcParamsHash(params, options = {}) {
        debug(params, 'calcParamsHash');
        if (utils_lang_1.isString(params)) {
            return utils_1.sha256hash(params);
        }
        // 只关心业务参数，不关心以什么类型的 Content-Type 传递的
        // 所以 application/json multipart/form-data 计算方式是相同的
        /* eslint-disable no-param-reassign */
        const includeKeys = options.includeKeys || keyvalue_1.SortedKeyValue.kv(params).keys();
        /* eslint-enable no-param-reassign */
        const excludeKeys = new Set(options.excludeKeys);
        const hash = crypto.createHash('sha256');
        for (const key of includeKeys) {
            if (excludeKeys.has(key)) {
                continue;
            }
            // istanbul ignore next
            if (!params[key]) {
                continue;
            }
            // istanbul ignore next
            if (isStream(params[key])) {
                continue;
            }
            if (Array.isArray(options.hashedKeys)) {
                options.hashedKeys.push(key);
            }
            // string && buffer
            hash.update(`&${key}=`);
            hash.update(params[key]);
            hash.update('\r\n');
        }
        return hash.digest(options.encoding || 'hex');
    }
    /**
     * 计算签名信息
     * 注：默认是tcb签名算法，传入 options.isCloudApi=true，则使用云API V3签名算法
     * 云API V3算法文档：https://cloud.tencent.com/document/api/598/38504#NodeJS
     *
     * @param {string} method       - Http Verb：GET/get POST/post 区分大小写
     * @param {string} url          - 地址：http://abc.org/api/v1?a=1&b=2
     * @param {Object} headers      - 需要签名的头部字段
     * @param {string} params       - 请求参数
     * @param {number} [timestamp]  - 签名时间戳
     * @param {object} [options]    - 可选参数
     */
    tc3sign(method, url, headers, params, timestamp, options = {}) {
        /* eslint-disable no-param-reassign */
        timestamp = timestamp || utils_1.second();
        /* eslint-enable no-param-reassign */
        const urlInfo = url_1.parse(url);
        const formatedHeaders = Signer.formatKeyAndValue(headers, {
            enableValueToLowerCase: true
        });
        const headerKV = keyvalue_1.SortedKeyValue.kv(formatedHeaders);
        const signedHeaders = headerKV.keys();
        const canonicalHeaders = `${headerKV.toString(':', '\n')}\n`;
        const { enableHostCheck = true, enableContentTypeCheck = true, isCloudApi = false } = options;
        if (enableHostCheck && headerKV.get(HOST_KEY) !== urlInfo.host) {
            throw new TypeError(`host:${urlInfo.host} in url must be equals to host:${headerKV.get('host')} in headers`);
        }
        if (enableContentTypeCheck && !headerKV.get(CONTENT_TYPE_KEY)) {
            throw new TypeError(`${CONTENT_TYPE_KEY} field must in headers`);
        }
        const multipart = headerKV
            .get(CONTENT_TYPE_KEY)
            .startsWith(MIME.MULTIPART_FORM_DATA);
        const formatedParams = (() => {
            // case 1：类似云API签名方式，整体 stringify 一下
            if (isCloudApi) {
                return params === '' ? '' : JSON.stringify(params);
            }
            // case 2: tcbapi 签名方式，需要对参数进行排序处理
            return method.toUpperCase() === 'GET'
                ? ''
                : Signer.formatKeyAndValue(params, {
                    multipart
                });
        })();
        const signedParams = [];
        const hashedPayload = Signer.calcParamsHash(formatedParams, {
            includeKeys: options.includeKeys,
            excludeKeys: options.excludeKeys,
            hashedKeys: signedParams
        });
        const signedUrl = isCloudApi
            ? urlInfo.pathname
            : url.replace(/^https?:/, '').split('?')[0];
        const canonicalRequest = `${method}\n${signedUrl}\n${urlInfo.query || ''}\n${canonicalHeaders}\n${signedHeaders.join(';')}\n${hashedPayload}`;
        debug(canonicalRequest, 'canonicalRequest\n\n');
        const date = utils_1.formateDate(timestamp);
        const { service } = this;
        const { algorithm } = this;
        const credentialScope = `${date}/${service}/tc3_request`;
        const stringToSign = `${algorithm}\n${timestamp}\n${credentialScope}\n${utils_1.sha256hash(canonicalRequest)}`;
        debug(stringToSign, 'stringToSign\n\n');
        const secretDate = utils_1.sha256hmac(date, `TC3${this.credential.secretKey}`);
        const secretService = utils_1.sha256hmac(service, secretDate);
        const secretSigning = utils_1.sha256hmac('tc3_request', secretService);
        const signature = utils_1.sha256hmac(stringToSign, secretSigning, 'hex');
        debug(secretDate.toString('hex'), 'secretDate');
        debug(secretService.toString('hex'), 'secretService');
        debug(secretSigning.toString('hex'), 'secretSigning');
        debug(signature.toString('hex'), 'signature');
        let { withSignedParams = false } = options;
        if ((options.includeKeys && options.includeKeys.length > 0) ||
            (options.excludeKeys && options.excludeKeys.length > 0)) {
            withSignedParams = true;
        }
        return {
            // 需注意该字段长度
            // https://stackoverflow.com/questions/686217/maximum-on-http-header-values
            // https://www.tutorialspoint.com/What-is-the-maximum-size-of-HTTP-header-values
            authorization: `${algorithm} Credential=${this.credential.secretId}/${credentialScope},${withSignedParams ? ` SignedParams=${signedParams.join(';')},` : ''} SignedHeaders=${signedHeaders.join(';')}, Signature=${signature}`,
            signedParams,
            signedHeaders,
            signature,
            timestamp,
            multipart
        };
    }
}
exports.Signer = Signer;

}, function(modId) { var map = {"./utils":1773651886798,"./utils.lang":1773651886799,"./keyvalue":1773651886800}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886798, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeEnv = exports.sha256hmac = exports.sha256hash = exports.stringify = exports.second = exports.formateDate = void 0;
const crypto = require("crypto");
function formateDate(timestamp) {
    return new Date(timestamp * 1000).toISOString().split('T')[0];
}
exports.formateDate = formateDate;
function second() {
    // istanbul ignore next
    return Math.floor(new Date().getTime() / 1000);
}
exports.second = second;
function stringify(v) {
    return typeof v !== 'string' ? JSON.stringify(v) : v;
}
exports.stringify = stringify;
function sha256hash(string, encoding = 'hex') {
    return crypto.createHash('sha256').update(string).digest(encoding);
}
exports.sha256hash = sha256hash;
function sha256hmac(string, secret = '', encoding) {
    return crypto.createHmac('sha256', secret).update(string).digest(encoding);
}
exports.sha256hmac = sha256hmac;
function isNodeEnv() {
    /* eslint-disable @typescript-eslint/prefer-optional-chain */
    return process && process.release && process.release.name === 'node';
}
exports.isNodeEnv = isNodeEnv;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886799, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.isObject = exports.isString = exports.isNumber = void 0;
function isNumber(v) {
    return v === +v;
}
exports.isNumber = isNumber;
function isString(v) {
    return typeof v === 'string';
}
exports.isString = isString;
function isObject(v) {
    return v !== null && typeof v === 'object' && Array.isArray(v) === false;
}
exports.isObject = isObject;
function isPlainObject(v) {
    return (isObject(v) && [null, Object.prototype].includes(Object.getPrototypeOf(v)));
}
exports.isPlainObject = isPlainObject;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886800, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.SortedKeyValue = void 0;
const utils_lang_1 = require("./utils.lang");
class SortedKeyValue {
    constructor(obj, selectkeys) {
        this._keys = [];
        this._values = [];
        this._pairs = [];
        this._obj = {};
        if (!utils_lang_1.isObject(obj)) {
            return this;
        }
        // https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
        // https://www.stefanjudis.com/today-i-learned/property-order-is-predictable-in-javascript-objects-since-es2015/
        Object.keys(obj || {})
            .sort((l, r) => l.toString().localeCompare(r))
            .forEach((key) => {
            if (!selectkeys || selectkeys.includes(key)) {
                this._keys.push(key);
                this._values.push(obj[key]);
                this._pairs.push([key, obj[key]]);
                this._obj[key.toLowerCase()] = obj[key];
            }
        });
    }
    static kv(obj, selectkeys) {
        return new SortedKeyValue(obj, selectkeys);
    }
    get(key) {
        return this._obj[key];
    }
    keys() {
        return this._keys;
    }
    values() {
        return this._values;
    }
    pairs() {
        return this._pairs;
    }
    toString(kvSeparator = '=', joinSeparator = '&') {
        return this._pairs.map((pair) => pair.join(kvSeparator)).join(joinSeparator);
    }
}
exports.SortedKeyValue = SortedKeyValue;

}, function(modId) { var map = {"./utils.lang":1773651886799}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886801, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.mustUseFormdata = exports.canUseFormdata = void 0;
const utils_1 = require("./utils");
const utils_lang_1 = require("./utils.lang");
const isStream = require("is-stream");
/**
 * 是否能够使用 FormData 发送数据
 * @param {any} data - 待发送的数据
 */
function canUseFormdata(data) {
    let enable = true;
    /* eslint-disable no-restricted-syntax */
    for (const key in data) {
        const value = data[key];
        if (!isStream(value) &&
            utils_1.isNodeEnv() &&
            !Buffer.isBuffer(value) &&
            !utils_lang_1.isString(value) &&
            !utils_lang_1.isNumber(value)) {
            enable = false;
            break;
        }
    }
    /* eslint-enable no-restricted-syntax */
    return enable;
}
exports.canUseFormdata = canUseFormdata;
/**
 * 是否一定要通过 FormData 发送数据
 * 如果有 Buffer 和 Stream 必须用 multipart/form-data，如果同时还含有
 * @param {any} data - 待发送的数据
 */
function mustUseFormdata(data) {
    let must = false;
    /* eslint-disable no-restricted-syntax */
    for (const key in data) {
        const value = data[key];
        if ((utils_1.isNodeEnv() && Buffer.isBuffer(value)) || isStream(value)) {
            must = true;
            break;
        }
    }
    /* eslint-enable no-restricted-syntax */
    return must;
}
exports.mustUseFormdata = mustUseFormdata;

}, function(modId) { var map = {"./utils":1773651886798,"./utils.lang":1773651886799}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1773651886796);
})()
//miniprogram-npm-outsideDeps=["clone","crypto","url","util","is-stream"]
//# sourceMappingURL=index.js.map