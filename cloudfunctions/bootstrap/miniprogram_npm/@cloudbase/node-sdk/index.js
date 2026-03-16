module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1773651886764, function(require, module, exports) {

const cloudbase_1 = require("./cloudbase");
const symbol_1 = require("./const/symbol");
const utils_1 = require("./utils/utils");
const request_1 = require("./utils/request");
const version_1 = require("./utils/version");
module.exports = {
    version: version_1.version,
    SYMBOL_CURRENT_ENV: symbol_1.SYMBOL_CURRENT_ENV,
    SYMBOL_DEFAULT_ENV: symbol_1.SYMBOL_DEFAULT_ENV,
    init: (config) => {
        return new cloudbase_1.CloudBase(config);
    },
    parseContext: (context) => {
        return cloudbase_1.CloudBase.parseContext(context);
    },
    getCloudbaseContext: (context) => {
        return cloudbase_1.CloudBase.getCloudbaseContext(context);
    },
    request: request_1.extraRequest,
    setThrowOnCode: utils_1.setThrowOnCode
};

}, function(modId) {var map = {"./cloudbase":1773651886765,"./const/symbol":1773651886769,"./utils/utils":1773651886767,"./utils/request":1773651886776,"./utils/version":1773651886781}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886765, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudBase = void 0;
const axios_1 = __importDefault(require("axios"));
const wx_cloud_client_sdk_1 = __importDefault(require("@cloudbase/wx-cloud-client-sdk"));
const auth_1 = require("./auth");
const functions_1 = require("./functions");
const cloudrun_1 = require("./cloudrun");
const database_1 = require("./database");
const storage_1 = require("./storage");
const wx_1 = require("./wx");
const analytics_1 = require("./analytics");
const ai_1 = require("./ai");
const logger_1 = require("./logger");
const cloudplatform_1 = require("./utils/cloudplatform");
const tcbcontext_1 = require("./utils/tcbcontext");
const notification_1 = require("./notification");
const openapicommonrequester = __importStar(require("./utils/tcbopenapicommonrequester"));
const tcbopenapiendpoint_1 = require("./utils/tcbopenapiendpoint");
const symbol_1 = require("./const/symbol");
const utils_1 = require("./utils/utils");
class CloudBase {
    static parseContext(context) {
        const parseResult = (0, tcbcontext_1.parseContext)(context);
        CloudBase.scfContext = parseResult;
        return parseResult;
    }
    static getCloudbaseContext(context) {
        return (0, tcbcontext_1.getCloudbaseContext)(context);
    }
    constructor(config) {
        this.init(config);
    }
    init(config = {}) {
        // 预检运行环境，调用与否并不影响后续逻辑
        // 注意：该函数为异步函数，这里并不等待检查结果
        /* eslint-disable-next-line */
        (0, cloudplatform_1.preflightRuntimeCloudPlatform)();
        // 所有的鉴权，参数塑形都在 normalizeConfig 中处理
        // 后续其他模块获取 config 都通过 CloudBase 实例的 config 获取
        // 禁止在业务模块中直接修改 config 配置
        this.config = (0, utils_1.normalizeConfig)(config);
        this.extensionMap = new Map();
        // NOTE：try-catch 为防止 init 报错
        try {
            // 初始化数据模型等 SDK 方法
            const envId = this.config.envName === symbol_1.SYMBOL_CURRENT_ENV
                ? openapicommonrequester.getEnvIdFromContext()
                : this.config.envName;
            const httpClient = wx_cloud_client_sdk_1.default.generateHTTPClient(this.callFunction.bind(this), async (options) => {
                var _a;
                const result = await openapicommonrequester.request({
                    config: this.config,
                    data: safeParseJSON(options.body),
                    method: (_a = options.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
                    url: options.url,
                    headers: Object.assign({ 'Content-Type': 'application/json' }, headersInitToRecord(options.headers)),
                    /**
                     * 既然 openapicommonrequester.request 的参数里的 token 获取也是通过 openapicommonrequester.request 方法去获取的
                     * 为什么不把这里的 token 去掉，全部放在 openapicommonrequester.request 中去统一处理 token 获取的逻辑
                     */
                    token: (await this.auth().getClientCredential()).access_token
                });
                return result.body;
            }, (0, tcbopenapiendpoint_1.buildCommonOpenApiUrlWithPath)({ serviceUrl: this.config.serviceUrl, envId, path: '/v1/model', region: this.config.region }), {
                sqlBaseUrl: (0, tcbopenapiendpoint_1.buildCommonOpenApiUrlWithPath)({ serviceUrl: this.config.serviceUrl, envId, path: '/v1/sql', region: this.config.region })
            });
            this.models = httpClient;
        }
        catch (e) {
            // ignore
        }
        try {
            const getEntity = (options) => {
                const envId = this.config.envName === symbol_1.SYMBOL_CURRENT_ENV
                    ? openapicommonrequester.getEnvIdFromContext()
                    : this.config.envName;
                const { instance = 'default', database = envId } = options || {};
                const mysqlClient = wx_cloud_client_sdk_1.default.generateMySQLClient(this, {
                    mysqlBaseUrl: (0, tcbopenapiendpoint_1.buildCommonOpenApiUrlWithPath)({
                        serviceUrl: this.config.serviceUrl,
                        envId,
                        path: '/v1/rdb/rest',
                        region: this.config.region
                    }),
                    fetch: async (url, options) => {
                        var _a;
                        let headers = {};
                        if (options.headers instanceof Headers) {
                            options.headers.forEach((value, key) => {
                                headers[key] = value;
                            });
                        }
                        else {
                            headers = options.headers || {};
                        }
                        const result = await openapicommonrequester.request({
                            config: this.config,
                            data: safeParseJSON(options.body),
                            method: (_a = options.method) === null || _a === void 0 ? void 0 : _a.toUpperCase(),
                            url: url instanceof URL ? url.href : String(url),
                            headers: Object.assign({ 'Content-Type': 'application/json' }, headersInitToRecord(Object.assign({ 'X-Db-Instance': instance, 'Accept-Profile': database, 'Content-Profile': database }, headers))),
                            token: (await this.auth().getClientCredential()).access_token
                        });
                        const data = result.body;
                        const res = {
                            ok: (result === null || result === void 0 ? void 0 : result.statusCode) >= 200 && (result === null || result === void 0 ? void 0 : result.statusCode) < 300,
                            status: (result === null || result === void 0 ? void 0 : result.statusCode) || 200,
                            statusText: (result === null || result === void 0 ? void 0 : result.statusMessage) || 'OK',
                            json: async () => await Promise.resolve(data || {}),
                            text: async () => await Promise.resolve(typeof data === 'string' ? data : JSON.stringify(data || {})),
                            headers: new Headers(incomingHttpHeadersToHeadersInit((result === null || result === void 0 ? void 0 : result.headers) || {}))
                        };
                        return res;
                    }
                });
                return mysqlClient;
            };
            this.mysql = (options) => {
                return getEntity(options)(options);
            };
            this.rdb = (options) => {
                return getEntity(options)(options);
            };
        }
        catch (e) {
            // ignore
        }
    }
    logger() {
        if (!this.clsLogger) {
            this.clsLogger = (0, logger_1.logger)();
        }
        return this.clsLogger;
    }
    auth() {
        return (0, auth_1.auth)(this);
    }
    database(dbConfig = {}) {
        return (0, database_1.newDb)(this, dbConfig);
    }
    ai() {
        if (!this.aiInstance) {
            this.aiInstance = (0, ai_1.createAI)(this);
        }
        return this.aiInstance;
    }
    async callFunction(callFunctionOptions, opts) {
        return await (0, functions_1.callFunction)(this, callFunctionOptions, opts);
    }
    async callContainer(callContainerOptions, opts) {
        return await (0, cloudrun_1.callContainer)(this, callContainerOptions, opts);
    }
    async callApis(callApiOptions, opts) {
        return await (0, functions_1.callApis)(this, callApiOptions, opts);
    }
    async callWxOpenApi(wxOpenApiOptions, opts) {
        return await (0, wx_1.callWxOpenApi)(this, wxOpenApiOptions, opts);
    }
    async callWxPayApi(wxOpenApiOptions, opts) {
        return await (0, wx_1.callWxPayApi)(this, wxOpenApiOptions, opts);
    }
    async wxCallContainerApi(wxOpenApiOptions, opts) {
        return await (0, wx_1.wxCallContainerApi)(this, wxOpenApiOptions, opts);
    }
    async callCompatibleWxOpenApi(wxOpenApiOptions, opts) {
        return await (0, wx_1.callCompatibleWxOpenApi)(this, wxOpenApiOptions, opts);
    }
    async uploadFile({ cloudPath, fileContent }, opts) {
        return await (0, storage_1.uploadFile)(this, { cloudPath, fileContent }, opts);
    }
    async downloadFile({ fileID, urlType, tempFilePath }, opts) {
        return await (0, storage_1.downloadFile)(this, { fileID, urlType, tempFilePath }, opts);
    }
    /**
     * 复制文件
     *
     * @param fileList 复制列表
     * @param fileList.srcPath 源文件路径
     * @param fileList.dstPath 目标文件路径
     * @param fileList.overwrite 当目标文件已经存在时，是否允许覆盖已有文件，默认 true
     * @param fileList.removeOriginal 复制文件后是否删除源文件，默认不删除
     * @param opts
     */
    async copyFile({ fileList }, opts) {
        return await (0, storage_1.copyFile)(this, { fileList }, opts);
    }
    async deleteFile({ fileList }, opts) {
        return await (0, storage_1.deleteFile)(this, { fileList }, opts);
    }
    async getTempFileURL({ fileList }, opts) {
        return await (0, storage_1.getTempFileURL)(this, { fileList }, opts);
    }
    async getFileInfo({ fileList }, opts) {
        return await (0, storage_1.getFileInfo)(this, { fileList }, opts);
    }
    async getUploadMetadata({ cloudPath }, opts) {
        return await (0, storage_1.getUploadMetadata)(this, { cloudPath }, opts);
    }
    async getFileAuthority({ fileList }, opts) {
        return await (0, storage_1.getFileAuthority)(this, { fileList }, opts);
    }
    /**
     * @deprecated
     */
    async analytics(reportData) {
        await (0, analytics_1.analytics)(this, reportData);
    }
    registerExtension(ext) {
        this.extensionMap.set(ext.name, ext);
    }
    async invokeExtension(name, opts) {
        const ext = this.extensionMap.get(name);
        if (!ext) {
            throw Error(`Please register '${name}' extension before invoke.`);
        }
        return ext.invoke(opts, this);
    }
    // SDK推送消息（对外API：sendTemplateNotification）
    async sendTemplateNotification(params, opts) {
        return await (0, notification_1.sendNotification)(this, params, opts);
    }
    /**
     * shim for tcb extension ci
     */
    get requestClient() {
        return {
            get: axios_1.default,
            post: axios_1.default,
            put: axios_1.default,
            delete: axios_1.default
        };
    }
}
exports.CloudBase = CloudBase;
function headersInitToRecord(headers) {
    if (!headers) {
        return {};
    }
    const ret = {};
    if (Array.isArray(headers)) {
        headers.forEach(([key, value]) => {
            ret[key] = value;
        });
    }
    else if (typeof headers.forEach === 'function') {
        headers.forEach(([key, value]) => {
            ret[key] = value;
        });
    }
    else {
        Object.keys(headers).forEach((key) => {
            ret[key] = headers[key];
        });
    }
    return ret;
}
function safeParseJSON(x) {
    try {
        return JSON.parse(x);
    }
    catch (e) {
        return x;
    }
}
function incomingHttpHeadersToHeadersInit(headers) {
    const result = [];
    for (const [key, value] of Object.entries(headers)) {
        if (value === undefined) {
            continue;
        }
        if (Array.isArray(value)) {
            for (const v of value) {
                result.push([key, v]);
            }
        }
        else {
            result.push([key, value]);
        }
    }
    return result;
}

}, function(modId) { var map = {"./auth":1773651886766,"./functions":1773651886784,"./cloudrun":1773651886785,"./database":1773651886787,"./storage":1773651886789,"./wx":1773651886790,"./analytics":1773651886791,"./ai":1773651886792,"./logger":1773651886794,"./utils/cloudplatform":1773651886772,"./utils/tcbcontext":1773651886775,"./notification":1773651886795,"./utils/tcbopenapicommonrequester":1773651886782,"./utils/tcbopenapiendpoint":1773651886783,"./const/symbol":1773651886769,"./utils/utils":1773651886767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886766, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const cloudbase_1 = require("../cloudbase");
const symbol_1 = require("../const/symbol");
const tcbapicaller = __importStar(require("../utils/tcbapirequester"));
const tcbopenapicommonrequester = __importStar(require("../utils/tcbopenapicommonrequester"));
const checkCustomUserIdRegex = /^[a-zA-Z0-9_\-#@~=*(){}[\]:.,<>+]{4,32}$/;
function validateUid(uid) {
    if (typeof uid !== 'string') {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'uid must be a string' }));
    }
    if (!checkCustomUserIdRegex.test(uid)) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: `Invalid uid: "${uid}"` }));
    }
}
class Auth {
    constructor(cloudbase) {
        this.cloudbase = cloudbase;
    }
    async getAuthContext(context) {
        const { TCB_UUID, LOGINTYPE, QQ_OPENID, QQ_APPID } = cloudbase_1.CloudBase.getCloudbaseContext(context);
        const result = {
            uid: TCB_UUID,
            loginType: LOGINTYPE
        };
        if (LOGINTYPE === 'QQ-MINI') {
            result.appId = QQ_APPID;
            result.openId = QQ_OPENID;
        }
        return result;
    }
    getClientIP() {
        const { TCB_SOURCE_IP } = cloudbase_1.CloudBase.getCloudbaseContext();
        return TCB_SOURCE_IP || '';
    }
    getUserInfo() {
        const { WX_OPENID, WX_APPID, TCB_UUID, TCB_CUSTOM_USER_ID, TCB_ISANONYMOUS_USER } = cloudbase_1.CloudBase.getCloudbaseContext();
        return {
            openId: WX_OPENID || '',
            appId: WX_APPID || '',
            uid: TCB_UUID || '',
            customUserId: TCB_CUSTOM_USER_ID || '',
            isAnonymous: TCB_ISANONYMOUS_USER === 'true'
        };
    }
    async getEndUserInfo(uid, opts) {
        const { WX_OPENID, WX_APPID, TCB_UUID, TCB_CUSTOM_USER_ID, TCB_ISANONYMOUS_USER } = cloudbase_1.CloudBase.getCloudbaseContext();
        const defaultUserInfo = {
            openId: WX_OPENID || '',
            appId: WX_APPID || '',
            uid: TCB_UUID || '',
            customUserId: TCB_CUSTOM_USER_ID || '',
            isAnonymous: TCB_ISANONYMOUS_USER === 'true'
        };
        if (uid === undefined) {
            return await Promise.resolve({
                userInfo: defaultUserInfo
            });
        }
        validateUid(uid);
        return await tcbapicaller.request({
            config: this.cloudbase.config,
            params: {
                action: 'auth.getUserInfoForAdmin',
                uuid: uid
            },
            method: 'post',
            opts,
            headers: {
                'content-type': 'application/json'
            }
        }).then(result => {
            if (result.code) {
                return result;
            }
            return {
                userInfo: Object.assign(Object.assign({}, defaultUserInfo), result.data),
                requestId: result.requestId
            };
        });
    }
    async queryUserInfo(query, opts) {
        const { uid, platform, platformId } = query;
        return await tcbapicaller.request({
            config: this.cloudbase.config,
            params: {
                action: 'auth.getUserInfoForAdmin',
                uuid: uid,
                platform,
                platformId
            },
            method: 'post',
            opts,
            headers: {
                'content-type': 'application/json'
            }
        }).then(result => {
            if (result.code) {
                return result;
            }
            return {
                userInfo: Object.assign({}, result.data),
                requestId: result.requestId
            };
        });
    }
    async getClientCredential(opts) {
        // 如果有 accessKey 直接返回 accessKey，不用再去换取 token
        if (this.cloudbase.config.accessKey) {
            return this.cloudbase.config.accessKey;
        }
        return await tcbopenapicommonrequester.request({
            config: this.cloudbase.config,
            method: 'POST',
            opts,
            headers: {
                'content-type': 'application/json'
            },
            path: '/auth/v1/token/clientCredential',
            data: {
                grant_type: 'client_credentials'
            }
        }).then(result => {
            return result.body;
        });
    }
    createTicket(uid, options = {}) {
        validateUid(uid);
        const timestamp = new Date().getTime();
        const { TCB_ENV, SCF_NAMESPACE } = cloudbase_1.CloudBase.getCloudbaseContext();
        const { credentials } = this.cloudbase.config;
        /* eslint-disable-next-line */
        const { env_id } = credentials;
        let { envName } = this.cloudbase.config;
        if (!envName) {
            throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'no env in config' }));
        }
        // 检查 credentials 是否包含 env
        if (!env_id) {
            throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '当前私钥未包含env_id 信息， 请前往腾讯云云开发控制台，获取自定义登录最新私钥' }));
        }
        // 使用symbol时替换为环境变量内的env
        if (envName === symbol_1.SYMBOL_CURRENT_ENV) {
            envName = TCB_ENV || SCF_NAMESPACE;
        }
        else if (envName === symbol_1.SYMBOL_DEFAULT_ENV) {
            // nothing to do
        }
        // 检查 credentials env 和 init 指定 env 是否一致
        if (env_id && env_id !== envName) {
            throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '当前私钥所属环境与 init 指定环境不一致！' }));
        }
        if (!Reflect.has(options, 'allowInsecureKeySizes')) {
            options.allowInsecureKeySizes = true;
        }
        const { refresh = 3600 * 1000, expire = timestamp + 7 * 24 * 60 * 60 * 1000 } = options;
        const token = jsonwebtoken_1.default.sign({
            alg: 'RS256',
            env: envName,
            iat: timestamp,
            exp: timestamp + 10 * 60 * 1000,
            uid,
            refresh,
            expire
        }, credentials.private_key, {
            allowInsecureKeySizes: options.allowInsecureKeySizes === true,
            algorithm: 'RS256'
        });
        return credentials.private_key_id + '/@@/' + token;
    }
}
exports.Auth = Auth;
function auth(cloudbase) {
    return new Auth(cloudbase);
}
exports.auth = auth;

}, function(modId) { var map = {"../utils/utils":1773651886767,"../const/code":1773651886768,"../cloudbase":1773651886765,"../const/symbol":1773651886769,"../utils/tcbapirequester":1773651886770,"../utils/tcbopenapicommonrequester":1773651886782}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886767, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeConfig = exports.isValidEnvFormat = exports.isPageModuleName = exports.processReturn = exports.setThrowOnCode = exports.second = exports.isNonEmptyString = exports.E = exports.filterUndefined = exports.filterValue = exports.isAppId = exports.TcbError = void 0;
const utils = __importStar(require("../utils/utils"));
const code_1 = require("../const/code");
class TcbError extends Error {
    constructor(error) {
        super(error.message);
        this.code = error.code;
        this.message = error.message;
        this.requestId = error.requestId || '';
    }
}
exports.TcbError = TcbError;
function isAppId(appIdStr) {
    return /^[1-9][0-9]{4,64}$/gim.test(appIdStr);
}
exports.isAppId = isAppId;
function filterValue(o, value) {
    for (const key in o) {
        if (o[key] === value) {
            /* eslint-disable-next-line @typescript-eslint/no-dynamic-delete */
            delete o[key];
        }
    }
}
exports.filterValue = filterValue;
function filterUndefined(o) {
    filterValue(o, undefined);
}
exports.filterUndefined = filterUndefined;
function E(errObj) {
    return new TcbError(errObj);
}
exports.E = E;
function isNonEmptyString(str) {
    return typeof str === 'string' && str !== '';
}
exports.isNonEmptyString = isNonEmptyString;
function second() {
    // istanbul ignore next
    return Math.floor(new Date().getTime() / 1000);
}
exports.second = second;
// 兼容模式开关，兼容模式下，不抛出异常，直接返回
let throwOnCode = true;
function setThrowOnCode(value) {
    throwOnCode = value;
}
exports.setThrowOnCode = setThrowOnCode;
function processReturn(result) {
    if (!throwOnCode) {
        // 不抛报错，直接返回
        return result;
    }
    throw E(Object.assign({}, result));
}
exports.processReturn = processReturn;
/**
 * 是否是场景模块名
 *
 * $: 前缀，表示SaaS场景模块名，非实际环境ID，当前通过特殊环境ID标识
 *
 * @param envId
 * @returns
 */
function isPageModuleName(envId = '') {
    return typeof envId === 'string' && envId.startsWith('$:');
}
exports.isPageModuleName = isPageModuleName;
// 20 + 1 + 16, 限制长度 40
const kEnvRuleReg = /^[a-z0-9_-]{1,40}$/;
function isValidEnvFormat(env = '') {
    return typeof env === 'string' && kEnvRuleReg.test(env);
}
exports.isValidEnvFormat = isValidEnvFormat;
function normalizeConfig(config) {
    var _a, _b, _c, _d;
    const { debug = false, secretId, secretKey, env, timeout = 15000, headers = {}, accessKey } = config;
    // 检查用户显示配置的 secretId 和 secretKey 是否成对出现，要么都有，要么都没有
    if (!secretId !== !secretKey) {
        throw utils.E(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'secretId and secretKey must be a pair' }));
    }
    const cloudbaseConfigBase = Object.assign(Object.assign({}, config), { debug, 
        // secretId,
        // secretKey,
        envName: env, headers: Object.assign({}, headers), // 结构用户传进来的 headers，防止用户修改原对象
        timeout
        // accessKey: accessKey || process.env.CLOUDBASE_APIKEY
     });
    const { TENCENTCLOUD_SECRETID, TENCENTCLOUD_SECRETKEY, TENCENTCLOUD_SESSIONTOKEN, CLOUDBASE_APIKEY } = process.env;
    // 如果用户显示配置了accessKey，取用户显示配置的 accessKey,优先级最高
    if (accessKey) {
        return Object.assign(cloudbaseConfigBase, { secretId: undefined, secretKey: undefined, accessKey });
    }
    // 显示配置了 secretId, secretKey，取 secretId, secretKey
    if (secretId && secretKey) {
        return Object.assign(cloudbaseConfigBase, { secretId, secretKey, accessKey: undefined });
    }
    // 下面从环境变量取 secretId, secretKey, accessKey
    if (CLOUDBASE_APIKEY) {
        return Object.assign(cloudbaseConfigBase, { secretId: undefined, secretKey: undefined, accessKey: CLOUDBASE_APIKEY });
    }
    if (TENCENTCLOUD_SECRETID && TENCENTCLOUD_SECRETKEY) {
        return Object.assign(cloudbaseConfigBase, { secretId: TENCENTCLOUD_SECRETID, secretKey: TENCENTCLOUD_SECRETKEY, sessionToken: TENCENTCLOUD_SESSIONTOKEN, accessKey: undefined });
    }
    if ((_a = config.context) === null || _a === void 0 ? void 0 : _a.extendedContext) {
        const extendedContext = config.context.extendedContext;
        if (!cloudbaseConfigBase.env) {
            cloudbaseConfigBase.env = extendedContext.envId;
            cloudbaseConfigBase.envName = extendedContext.envId;
        }
        // 从 context 中获取 secret
        if (!cloudbaseConfigBase.secretId && !cloudbaseConfigBase.secretKey) {
            cloudbaseConfigBase.secretId = (_b = extendedContext === null || extendedContext === void 0 ? void 0 : extendedContext.tmpSecret) === null || _b === void 0 ? void 0 : _b.secretId;
            cloudbaseConfigBase.secretKey = (_c = extendedContext === null || extendedContext === void 0 ? void 0 : extendedContext.tmpSecret) === null || _c === void 0 ? void 0 : _c.secretKey;
            cloudbaseConfigBase.sessionToken = (_d = extendedContext === null || extendedContext === void 0 ? void 0 : extendedContext.tmpSecret) === null || _d === void 0 ? void 0 : _d.token;
        }
    }
    // 都没有配置，返回原始的配置
    return cloudbaseConfigBase;
}
exports.normalizeConfig = normalizeConfig;

}, function(modId) { var map = {"../utils/utils":1773651886767,"../const/code":1773651886768}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886768, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR = void 0;
exports.ERROR = {
    INVALID_PARAM: {
        code: 'INVALID_PARAM',
        message: 'invalid param'
    },
    SYS_ERR: {
        code: 'SYS_ERR',
        message: 'system error'
    },
    STORAGE_REQUEST_FAIL: {
        code: 'STORAGE_REQUEST_FAIL',
        message: 'storage request fail'
    },
    STORAGE_FILE_NONEXIST: {
        code: 'STORAGE_FILE_NONEXIST',
        message: 'storage file not exist'
    },
    TCB_CLS_UNOPEN: {
        code: 'TCB_CLS_UNOPEN',
        message: '需要先开通日志检索功能'
    },
    INVALID_CONTEXT: {
        code: 'INVALID_CONTEXT',
        message: '无效的context对象，请使用 云函数入口的context参数'
    }
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886769, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.SYMBOL_DEFAULT_ENV = exports.SYMBOL_CURRENT_ENV = void 0;
exports.SYMBOL_CURRENT_ENV = Symbol.for('SYMBOL_CURRENT_ENV'); // 当前环境
exports.SYMBOL_DEFAULT_ENV = Symbol.for('SYMBOL_DEFAULT_ENV'); // 默认环境

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886770, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.TcbApiHttpRequester = exports.prepareCredentials = exports.getCredentialsOnDemand = exports.getEnvIdFromContext = void 0;
const http_1 = __importDefault(require("http"));
/* eslint-disable-next-line */
const url_1 = require("url");
const signature_nodejs_1 = require("@cloudbase/signature-nodejs");
const code_1 = require("../const/code");
const symbol_1 = require("../const/symbol");
const tracing_1 = require("./tracing");
const utils = __importStar(require("./utils"));
const cloudbase_1 = require("../cloudbase");
const cloudplatform_1 = require("./cloudplatform");
const tcbapiendpoint_1 = require("./tcbapiendpoint");
const request_1 = require("./request");
const wxCloudToken_1 = require("./wxCloudToken");
const version_1 = require("./version");
const { E, second, processReturn } = utils;
function getEnvIdFromContext() {
    const { TCB_ENV, SCF_NAMESPACE } = cloudbase_1.CloudBase.getCloudbaseContext();
    return TCB_ENV || SCF_NAMESPACE || '';
}
exports.getEnvIdFromContext = getEnvIdFromContext;
function getCredentialsOnDemand(credentials) {
    const { secretId, secretKey } = credentials;
    let newCredentials = credentials;
    // 原本这里只在SCF云函数环境下，运行支持任意环境通过环境变量传递密钥
    if (!secretId || !secretKey) {
        // 尝试从环境变量中读取
        const { TENCENTCLOUD_SECRETID, TENCENTCLOUD_SECRETKEY, TENCENTCLOUD_SESSIONTOKEN } = cloudbase_1.CloudBase.getCloudbaseContext();
        if (TENCENTCLOUD_SECRETID && TENCENTCLOUD_SECRETKEY) {
            newCredentials = {
                secretId: TENCENTCLOUD_SECRETID,
                secretKey: TENCENTCLOUD_SECRETKEY,
                sessionToken: TENCENTCLOUD_SESSIONTOKEN
            };
        }
        // 注意：CBR 环境下，已经禁止该方式获取临时密钥，这里实际是不会成功的
        // if (checkIsInCBR()) {
        //   const tmpSecret = await getTmpSecret()
        //   newCredentials = {
        //     secretId: tmpSecret.id,
        //     secretKey: tmpSecret.key,
        //     sessionToken: tmpSecret.token
        //   }
        //   return newCredentials
        // }
        // if (await checkIsInTencentCloud()) {
        //   const tmpSecret = await getTmpSecret()
        //   newCredentials = {
        //     secretId: tmpSecret.id,
        //     secretKey: tmpSecret.key,
        //     sessionToken: tmpSecret.token
        //   }
        //   return newCredentials
        // }
    }
    return newCredentials;
}
exports.getCredentialsOnDemand = getCredentialsOnDemand;
async function prepareCredentials() {
    const opts = this.opts;
    // CrossAccountInfo: 跨账号调用
    const getCrossAccountInfo = opts.getCrossAccountInfo || this.config.getCrossAccountInfo;
    /* istanbul ignore if */
    if (getCrossAccountInfo) {
        const crossAccountInfo = await getCrossAccountInfo();
        const { credential } = crossAccountInfo;
        const { secretId, secretKey, token } = credential || {};
        this.config = Object.assign(Object.assign({}, this.config), { secretId,
            secretKey, sessionToken: token });
        if (!this.config.secretId || !this.config.secretKey) {
            throw E(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'missing secretId or secretKey of tencent cloud' }));
        }
        // 替换掉原函数，缓存数据，这里缓存是否起作用，取决于 this 实例是否复用
        // 另一处获取 authorization 的代码可以服用吃这里的缓存
        this.opts.getCrossAccountInfo = async () => await Promise.resolve(crossAccountInfo);
    }
    else {
        const { secretId, secretKey, sessionToken } = this.config;
        const credentials = getCredentialsOnDemand({ secretId, secretKey, sessionToken });
        this.config = Object.assign(Object.assign({}, this.config), { secretId: credentials.secretId, secretKey: credentials.secretKey, sessionToken: credentials.sessionToken });
        if (!this.config.secretId || !this.config.secretKey) {
            throw E(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'missing secretId or secretKey of tencent cloud, please set secretId and secretKey in config' }));
        }
    }
}
exports.prepareCredentials = prepareCredentials;
class TcbApiHttpRequester {
    constructor(args) {
        var _a, _b;
        this.defaultTimeout = 15000;
        this.timestamp = new Date().valueOf();
        /* eslint-disable no-undef */
        this.slowWarnTimer = null;
        /* eslint-enable no-undef */
        this.hooks = {};
        this.args = args;
        this.config = args.config;
        this.opts = args.opts || {};
        this.tracingInfo = (0, tracing_1.generateTracingInfo)((_b = (_a = args.config) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.eventID);
    }
    async request() {
        // 如果没有配置 accessKey，则通过密钥获取签名，这里先检查密钥是否存在
        if (!this.config.accessKey) {
            // 检查密钥是否存在
            await this.prepareCredentials();
        }
        const params = await this.makeParams();
        // console.log('params', params)
        const opts = this.makeReqOpts(params);
        // console.log('opts', opts)
        const action = this.getAction();
        const key = {
            functions: 'function_name',
            database: 'collectionName',
            wx: 'apiName'
        }[action.split('.')[0]];
        const argopts = this.opts;
        const config = this.config;
        // 注意：必须初始化为 null
        let retryOptions = null;
        if (argopts.retryOptions) {
            retryOptions = argopts.retryOptions;
        }
        else if (config.retries && typeof config.retries === 'number') {
            retryOptions = { retries: config.retries };
        }
        return await (0, request_1.extraRequest)(opts, {
            debug: config.debug,
            op: `${action}:${this.args.params[key]}@${params.envName}`,
            seqId: this.tracingInfo.seqId,
            retryOptions,
            timingsMeasurerOptions: config.timingsMeasurerOptions || {}
        }).then((response) => {
            this.slowWarnTimer && clearTimeout(this.slowWarnTimer);
            const { body } = response;
            if (response.statusCode === 200) {
                let result;
                try {
                    result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (this.hooks && this.hooks.handleData) {
                        result = this.hooks.handleData(result, null, response, body);
                    }
                }
                catch (e) {
                    result = body;
                }
                return result;
            }
            else {
                const e = E({
                    code: response.statusCode,
                    message: `${response.statusCode} ${http_1.default.STATUS_CODES[response.statusCode]} | [${opts.url}]`
                });
                throw e;
            }
        });
    }
    setHooks(hooks) {
        Object.assign(this.hooks, hooks);
    }
    setSlowWarning(timeout) {
        const action = this.getAction();
        const { seqId } = this.tracingInfo;
        this.slowWarnTimer = setTimeout(() => {
            /* istanbul ignore next */
            const msg = `[TCB][WARN] Your current request ${action
                || ''} is longer than 3s, it may be due to the network or your query performance | [${seqId}]`;
            /* istanbul ignore next */
            console.warn(msg);
        }, timeout);
    }
    getAction() {
        return this.args.params.action;
    }
    async makeParams() {
        const { TCB_SESSIONTOKEN } = cloudbase_1.CloudBase.getCloudbaseContext();
        const args = this.args;
        const opts = this.opts;
        const config = this.config;
        const crossAuthorizationData = opts.getCrossAccountInfo && (await opts.getCrossAccountInfo()).authorization;
        const { wxCloudApiToken, wxCloudbaseAccesstoken } = (0, wxCloudToken_1.getWxCloudToken)();
        const params = Object.assign(Object.assign({}, args.params), { envName: config.envName || '', wxCloudApiToken,
            wxCloudbaseAccesstoken, tcb_sessionToken: TCB_SESSIONTOKEN || '', sessionToken: config.sessionToken, crossAuthorizationToken: crossAuthorizationData
                ? Buffer.from(JSON.stringify(crossAuthorizationData)).toString('base64')
                : '' });
        if (!params.envName) {
            if ((0, cloudplatform_1.checkIsInScf)()) {
                params.envName = getEnvIdFromContext();
                console.warn(`[TCB][WARN] 当前未指定env，将默认使用当前函数所在环境的环境：${params.envName}！`);
            }
            else {
                console.warn('[TCB][WARN] 当前未指定env，将默认使用第一个创建的环境！');
            }
        }
        // 取当前云函数环境时，替换为云函数下环境变量
        if (params.envName === symbol_1.SYMBOL_CURRENT_ENV) {
            params.envName = getEnvIdFromContext();
        }
        else if (params.envName === symbol_1.SYMBOL_DEFAULT_ENV) {
            // 这里传空字符串没有可以跟不传的情况做一个区分
            params.envName = '';
        }
        utils.filterUndefined(params);
        return params;
    }
    makeReqOpts(params) {
        var _a, _b;
        const config = this.config;
        const args = this.args;
        const url = (0, tcbapiendpoint_1.buildUrl)({
            envId: params.envName || '',
            region: this.config.region,
            protocol: this.config.protocol || 'https',
            serviceUrl: this.config.serviceUrl,
            seqId: this.tracingInfo.seqId,
            isInternal: this.args.isInternal
        });
        const method = this.args.method || 'get';
        const timeout = ((_a = this.args.opts) === null || _a === void 0 ? void 0 : _a.timeout) || this.config.timeout || this.defaultTimeout;
        const opts = {
            url,
            method,
            timeout,
            // 优先取config，其次取模块，最后取默认
            headers: this.getHeaders(method, url, params),
            proxy: config.proxy,
            type: ((_b = this.opts) === null || _b === void 0 ? void 0 : _b.type) || 'json'
        };
        if (typeof config.keepalive === 'undefined' && !(0, cloudplatform_1.checkIsInScf)()) {
            // 非云函数环境下，默认开启 keepalive
            opts.keepalive = true;
        }
        else {
            /** eslint-disable-next-line */
            opts.keepalive = typeof config.keepalive === 'boolean' && config.keepalive;
        }
        if (args.method === 'post') {
            if (args.isFormData) {
                opts.formData = params;
                opts.encoding = null;
            }
            else {
                opts.body = params;
                opts.json = true;
            }
        }
        else {
            /* istanbul ignore next */
            opts.qs = params;
        }
        return opts;
    }
    async prepareCredentials() {
        prepareCredentials.bind(this)();
    }
    getHeaders(method, url, params) {
        var _a;
        const config = this.config;
        const { context, secretId, secretKey, accessKey } = config;
        const args = this.args;
        const { TCB_SOURCE } = cloudbase_1.CloudBase.getCloudbaseContext();
        // Note: 云函数被调用时可能调用端未传递 SOURCE，TCB_SOURCE 可能为空
        const SOURCE = `${((_a = context === null || context === void 0 ? void 0 : context.extendedContext) === null || _a === void 0 ? void 0 : _a.source) || TCB_SOURCE || ''},${args.opts.runEnvTag}`;
        // 注意：因为 url.parse 和 url.URL 存在差异，因 url.parse 已被废弃，这里可能会需要改动。
        // 因 @cloudbase/signature-nodejs sign 方法目前内部使用 url.parse 解析 url，
        // 如果这里需要改动，需要注意与 @cloudbase/signature-nodejs 的兼容性
        // 否则将导致签名存在问题
        const parsedUrl = (0, url_1.parse)(url);
        // const parsedUrl = new URL(url)
        let requiredHeaders = {
            'User-Agent': `tcb-node-sdk/${version_1.version}`,
            'X-TCB-Source': SOURCE,
            'X-Client-Timestamp': this.timestamp,
            'X-SDK-Version': `tcb-node-sdk/${version_1.version}`,
            Host: parsedUrl.host
        };
        if (config.version) {
            requiredHeaders['X-SDK-Version'] = config.version;
        }
        if (this.tracingInfo.trace) {
            requiredHeaders['X-TCB-Tracelog'] = this.tracingInfo.trace;
        }
        const region = this.config.region || process.env.TENCENTCLOUD_REGION || '';
        if (region) {
            requiredHeaders['X-TCB-Region'] = region;
        }
        requiredHeaders = Object.assign(Object.assign(Object.assign({}, config.headers), args.headers), requiredHeaders);
        const { authorization, timestamp } = (0, signature_nodejs_1.sign)({
            secretId,
            secretKey,
            method,
            url,
            params,
            headers: requiredHeaders,
            withSignedParams: true,
            timestamp: second() - 1
        });
        /* eslint-disable @typescript-eslint/dot-notation */
        // 优先使用 accessKey，否则使用签名
        requiredHeaders['Authorization'] = accessKey ? `Bearer ${accessKey}` : authorization;
        requiredHeaders['X-Signature-Expires'] = 600;
        requiredHeaders['X-Timestamp'] = timestamp;
        return Object.assign({}, requiredHeaders);
    }
}
exports.TcbApiHttpRequester = TcbApiHttpRequester;
const handleWxOpenApiData = (res, err, response, body) => {
    // wx.openApi 调用时，需用content-type区分buffer or JSON
    const { headers } = response;
    let transformRes = res;
    if (headers['content-type'] === 'application/json; charset=utf-8') {
        transformRes = JSON.parse(transformRes.toString()); // JSON错误时buffer转JSON
    }
    return transformRes;
};
async function request(args) {
    // console.log('args', args)
    if (typeof args.isInternal === 'undefined') {
        args.isInternal = await (0, cloudplatform_1.checkIsInternalAsync)();
    }
    args.opts = args.opts || {};
    args.opts.runEnvTag = await (0, cloudplatform_1.getCurrRunEnvTag)();
    const requester = new TcbApiHttpRequester(args);
    const { action } = args.params;
    if (action === 'wx.openApi' || action === 'wx.wxPayApi') {
        requester.setHooks({ handleData: handleWxOpenApiData });
    }
    if (action.startsWith('database') && process.env.SILENCE !== 'true') {
        requester.setSlowWarning(3000);
    }
    const result = await requester.request();
    if (result === null || result === void 0 ? void 0 : result.code) {
        return processReturn(result);
    }
    return result;
}
exports.request = request;

}, function(modId) { var map = {"../const/code":1773651886768,"../const/symbol":1773651886769,"./tracing":1773651886771,"./utils":1773651886767,"../cloudbase":1773651886765,"./cloudplatform":1773651886772,"./tcbapiendpoint":1773651886774,"./request":1773651886776,"./wxCloudToken":1773651886780,"./version":1773651886781}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886771, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTracingInfo = void 0;
const cloudbase_1 = require("../cloudbase");
let seqNum = 0;
function getSeqNum() {
    return ++seqNum;
}
function generateEventId() {
    return Date.now().toString(16) + '_' + getSeqNum().toString(16);
}
const generateTracingInfo = (id) => {
    const { TCB_SEQID = '', TCB_TRACELOG } = cloudbase_1.CloudBase.getCloudbaseContext();
    const eventId = generateEventId();
    const seqId = id
        ? `${id}-${eventId}`
        : (TCB_SEQID ? `${TCB_SEQID}-${eventId}` : eventId);
    return { eventId, seqId, trace: TCB_TRACELOG };
};
exports.generateTracingInfo = generateTracingInfo;

}, function(modId) { var map = {"../cloudbase":1773651886765}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886772, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrRunEnvTag = exports.checkIsInternalAsync = exports.checkIsInternal = exports.checkIsInTencentCloud = exports.checkIsInSumeru = exports.checkIsInCBR = exports.checkIsInScf = exports.getCloudPlatform = exports.preflightRuntimeCloudPlatform = exports.hasPreflight = void 0;
const metadata_1 = require("./metadata");
const utils_1 = require("./utils");
var CloudPlatform;
(function (CloudPlatform) {
    CloudPlatform["Unknown"] = "";
    CloudPlatform["TencentCloud"] = "tencentcloud";
    CloudPlatform["Other"] = "other";
})(CloudPlatform || (CloudPlatform = {}));
let hasDetected = false;
let cloudPlatform = CloudPlatform.Unknown;
function hasPreflight() {
    return hasDetected;
}
exports.hasPreflight = hasPreflight;
async function preflightRuntimeCloudPlatform() {
    if (hasDetected) {
        return;
    }
    if (await checkIsInternalAsync()) {
        cloudPlatform = CloudPlatform.TencentCloud;
    }
    else {
        cloudPlatform = CloudPlatform.Other;
    }
    hasDetected = true;
}
exports.preflightRuntimeCloudPlatform = preflightRuntimeCloudPlatform;
function getCloudPlatform() {
    return cloudPlatform;
}
exports.getCloudPlatform = getCloudPlatform;
function checkIsInScf() {
    return process.env.TENCENTCLOUD_RUNENV === 'SCF';
}
exports.checkIsInScf = checkIsInScf;
function checkIsInCBR() {
    // CBR = CLOUDBASE_RUN
    return !!process.env.CBR_ENV_ID;
}
exports.checkIsInCBR = checkIsInCBR;
const kSumeruEnvSet = new Set(['formal', 'pre', 'test']);
function checkIsInSumeru() {
    // SUMERU_ENV=formal | test | pre
    return kSumeruEnvSet.has(process.env.SUMERU_ENV);
}
exports.checkIsInSumeru = checkIsInSumeru;
async function checkIsInTencentCloud() {
    if (process.env.TENCENTCLOUD === 'true') {
        return true;
    }
    return (0, utils_1.isNonEmptyString)(await (0, metadata_1.lookupAppId)());
}
exports.checkIsInTencentCloud = checkIsInTencentCloud;
function checkIsInternal() {
    return checkIsInScf() || checkIsInCBR() || checkIsInSumeru();
}
exports.checkIsInternal = checkIsInternal;
async function checkIsInternalAsync() {
    return checkIsInternal() ? await Promise.resolve(true) : await checkIsInTencentCloud();
}
exports.checkIsInternalAsync = checkIsInternalAsync;
async function getCurrRunEnvTag() {
    if (checkIsInScf()) {
        return 'scf';
    }
    else if (checkIsInCBR()) {
        return 'cbr';
    }
    else if (checkIsInSumeru()) {
        return 'sumeru';
    }
    else if (await checkIsInTencentCloud()) {
        return 'tencentcloud';
    }
    return 'unknown';
}
exports.getCurrRunEnvTag = getCurrRunEnvTag;

}, function(modId) { var map = {"./metadata":1773651886773,"./utils":1773651886767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886773, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lookupCredentials = exports.lookupAppId = exports.lookup = exports.isAppId = exports.kMetadataVersions = exports.kSecurityCredentialsPath = exports.kAppIdPath = exports.kMetadataBaseUrl = void 0;
const axios_1 = __importDefault(require("axios"));
// 注意：改地址已经不是一定可以访问的了
exports.kMetadataBaseUrl = 'http://metadata.tencentyun.com';
exports.kAppIdPath = 'meta-data/app-id';
exports.kSecurityCredentialsPath = 'meta-data/cam/security-credentials';
var kMetadataVersions;
(function (kMetadataVersions) {
    kMetadataVersions["v20170919"] = "2017-09-19";
    kMetadataVersions["v1.0"] = "1.0";
    kMetadataVersions["latest"] = "latest";
})(kMetadataVersions = exports.kMetadataVersions || (exports.kMetadataVersions = {}));
function isAppId(appIdStr) {
    return /^[1-9][0-9]{4,64}$/gim.test(appIdStr);
}
exports.isAppId = isAppId;
async function lookup(path, options = {}) {
    const url = `${exports.kMetadataBaseUrl}/${kMetadataVersions.latest}/${path}`;
    const resp = await axios_1.default.get(url, options);
    if (resp.status === 200) {
        return resp.data;
    }
    else {
        throw new Error(`[ERROR] GET ${url} status: ${resp.status}`);
    }
}
exports.lookup = lookup;
const metadataCache = {
    appId: undefined
};
/**
 * lookupAppId - 该方法主要用于判断是否在云上环境
 * @returns
 */
async function lookupAppId() {
    if (metadataCache.appId === undefined) {
        try {
            // 只有首次会请求且要求快速返回，超时时间很短，DNS无法解析将会超时返回
            // 在云环境中，这个时间通常在 10ms 内，部分耗时长（30+ms）的情况是 DNS 解析耗时长（27+ms）
            const appId = await lookup(exports.kAppIdPath, { timeout: 30 });
            if (isAppId(appId)) {
                metadataCache.appId = appId;
            }
            else {
                metadataCache.appId = '';
            }
        }
        catch (e) {
            // ignore
        }
    }
    return metadataCache.appId || '';
}
exports.lookupAppId = lookupAppId;
async function lookupCredentials(ruleName) {
    // `${kMetadataBaseUrl}/meta-data/cam/security-credentials/TCB_QcsRole`
    // 这里设置了一个较短的超时时间，因为这个请求是在云环境中发起的，通常会很快返回
    return await lookup(`${exports.kSecurityCredentialsPath}/${ruleName}`, { timeout: 200 });
}
exports.lookupCredentials = lookupCredentials;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886774, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUrl = void 0;
const cloudbase_1 = require("../cloudbase");
const utils_1 = require("./utils");
const tcbcontext_1 = require("./tcbcontext");
/* eslint-disable complexity */
function buildUrl(options = { isInternal: false }) {
    // 优先级：用户配置 > 环境变量
    const region = options.region || process.env.TENCENTCLOUD_REGION || '';
    // 有地域信息则访问地域级别域名，无地域信息则访问默认域名，默认域名固定解析到上海地域保持兼容
    const internetRegionEndpoint = region
        ? `${region}.tcb-api.tencentcloudapi.com`
        : 'tcb-api.tencentcloudapi.com';
    const internalRegionEndpoint = region
        ? `internal.${region}.tcb-api.tencentcloudapi.com`
        : 'internal.tcb-api.tencentcloudapi.com';
    // 同地域走内网，跨地域走公网
    const isSameRegionVisit = region
        ? region === process.env.TENCENTCLOUD_REGION
        : true;
    const endpoint = isSameRegionVisit && (options.isInternal)
        ? internalRegionEndpoint
        : internetRegionEndpoint;
    const envId = options.envId || '';
    // 注意：特殊环境ID不能拼在请求地址的域名中，所以这里需要特殊处理
    const envEndpoint = (0, utils_1.isValidEnvFormat)(envId) ? `${envId}.${endpoint}` : endpoint;
    const protocol = options.isInternal ? 'http' : options.protocol;
    // 注意：云函数环境下有地域信息，云应用环境下不确定是否有，如果没有，用户必须显式的传入
    const path = '/admin';
    const defaultUrl = `${protocol}://${envEndpoint}${path}`;
    const serverInjectUrl = (0, tcbcontext_1.getServerInjectUrl)();
    const url = options.serviceUrl || serverInjectUrl || defaultUrl;
    const seqId = options.seqId;
    const qs = cloudbase_1.CloudBase.scfContext
        ? `env=${envId}&seqId=${seqId}&scfRequestId=${cloudbase_1.CloudBase.scfContext.requestId}`
        : `env=${envId}&seqId=${seqId}`;
    return url.includes('?') ? `${url}${qs}` : `${url}?${qs}`;
}
exports.buildUrl = buildUrl;

}, function(modId) { var map = {"../cloudbase":1773651886765,"./utils":1773651886767,"./tcbcontext":1773651886775}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886775, function(require, module, exports) {

/* eslint-disable @typescript-eslint/naming-convention */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerInjectUrl = exports.getTcbContextConfig = exports.getCloudbaseContext = exports.parseContext = void 0;
const code_1 = require("../const/code");
const utils_1 = require("./utils");
const cloudplatform_1 = require("./cloudplatform");
/**
 * parseContext 解析并校验 Context 格式
 * @param context {IContextParam}
 * @returns
 */
function parseContext(context) {
    if (typeof context !== 'object') {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_CONTEXT), { message: 'context 必须为对象类型' }));
    }
    const parseResult = {};
    const { memory_limit_in_mb, time_limit_in_ms, request_id, function_version, namespace, function_name, environ, environment } = context;
    try {
        parseResult.memoryLimitInMb = memory_limit_in_mb;
        parseResult.timeLimitIns = time_limit_in_ms;
        parseResult.requestId = request_id;
        parseResult.functionVersion = function_version;
        parseResult.namespace = namespace;
        parseResult.functionName = function_name;
        // 存在 environment 为新架构上新字段，可直接JSON.parse字符串，否则为老架构，需特殊处理
        if (environment) {
            parseResult.environment = JSON.parse(environment);
        }
        else {
            // TODO: 考虑移除老架构的兼容逻辑
            // 老架构上存在bug，无法识别value含特殊字符(若允许特殊字符，影响解析，这里特殊处理)
            const parseEnviron = environ.split(';');
            const parseEnvironObj = {};
            // eslint-disable-next-line @typescript-eslint/no-for-in-array
            for (const i in parseEnviron) {
                // value含分号影响切割，未找到=均忽略
                if (parseEnviron[i].includes('=')) {
                    const equalIndex = parseEnviron[i].indexOf('=');
                    const key = parseEnviron[i].slice(0, equalIndex);
                    let value = parseEnviron[i].slice(equalIndex + 1);
                    // value 含, 为数组
                    if (value.indexOf(',') >= 0) {
                        value = value.split(',');
                    }
                    parseEnvironObj[key] = value;
                }
            }
            parseResult.environ = parseEnvironObj;
        }
    }
    catch (err) {
        throw (0, utils_1.E)(Object.assign({}, code_1.ERROR.INVALID_CONTEXT));
    }
    return parseResult;
}
exports.parseContext = parseContext;
/**
 * getCloudbaseContext
 * 获取当前函数内的所有环境变量(作为获取变量的统一方法，取值来源 process.env 和 context)
 */
function getCloudbaseContext(context) {
    // console.log('context', context)
    if ((0, cloudplatform_1.checkIsInScf)()) {
        // 云函数环境下，应该包含以下环境变量，如果没有，后续逻辑可能会有问题
        if (!process.env.TENCENTCLOUD_REGION) {
            console.error('[TCB][ERROR] missing `TENCENTCLOUD_REGION` environment');
        }
        if (!process.env.SCF_NAMESPACE) {
            console.error('[TCB][ERROR] missing `SCF_NAMESPACE` environment');
        }
    }
    const { TRIGGER_SRC, _SCF_TCB_LOG, SCF_NAMESPACE, TENCENTCLOUD_RUNENV, TENCENTCLOUD_SECRETID, TENCENTCLOUD_SECRETKEY, TENCENTCLOUD_SESSIONTOKEN, WX_CONTEXT_KEYS, WX_TRIGGER_API_TOKEN_V0, WX_CLIENTIP, WX_CLIENTIPV6, TCB_CONTEXT_KEYS, TCB_CONTEXT_CNFG, LOGINTYPE } = process.env;
    const envFromProcessEnv = {
        TRIGGER_SRC,
        _SCF_TCB_LOG,
        SCF_NAMESPACE,
        TENCENTCLOUD_RUNENV,
        TENCENTCLOUD_SECRETID,
        TENCENTCLOUD_SECRETKEY,
        TENCENTCLOUD_SESSIONTOKEN,
        WX_CONTEXT_KEYS,
        WX_TRIGGER_API_TOKEN_V0,
        WX_CLIENTIP,
        WX_CLIENTIPV6,
        TCB_CONTEXT_KEYS,
        TCB_CONTEXT_CNFG,
        LOGINTYPE
    };
    let envFromContext = {};
    if (context) {
        const { environment, environ } = parseContext(context);
        envFromContext = environment || environ || {};
    }
    // 从TCB_CONTEXT_KEYS 和 WX_CONTEXT_KEYS中解析环境变量 取值优先级为 context > process.env
    const tcbContextKeys = envFromContext.TCB_CONTEXT_KEYS || TCB_CONTEXT_KEYS;
    const wxContextKeys = envFromContext.WX_CONTEXT_KEYS || WX_CONTEXT_KEYS;
    if (tcbContextKeys) {
        try {
            const tcbKeysList = tcbContextKeys.split(',');
            for (const item of tcbKeysList) {
                envFromProcessEnv[item] = envFromContext[item] || process.env[item];
            }
        }
        catch (e) { }
    }
    if (wxContextKeys) {
        try {
            const wxKeysList = wxContextKeys.split(',');
            for (const item of wxKeysList) {
                envFromProcessEnv[item] = envFromContext[item] || process.env[item];
            }
        }
        catch (e) { }
    }
    const allContext = Object.assign(Object.assign({}, envFromProcessEnv), envFromContext);
    const finalContext = {};
    for (const key in allContext) {
        if (allContext[key] !== undefined) {
            finalContext[key] = allContext[key];
        }
    }
    return finalContext;
}
exports.getCloudbaseContext = getCloudbaseContext;
function getTcbContextConfig() {
    try {
        const { TCB_CONTEXT_CNFG } = getCloudbaseContext();
        if (TCB_CONTEXT_CNFG) {
            // 检查约定环境变量字段是否存在
            return JSON.parse(TCB_CONTEXT_CNFG);
        }
        return {};
    }
    catch (e) {
        /* istanbul ignore next */
        console.error('[TCB][ERROR] parse context error: ', e);
        /* istanbul ignore next */
        return {};
    }
}
exports.getTcbContextConfig = getTcbContextConfig;
function getServerInjectUrl() {
    const tcbContextConfig = getTcbContextConfig();
    return tcbContextConfig.URL || '';
}
exports.getServerInjectUrl = getServerInjectUrl;

}, function(modId) { var map = {"../const/code":1773651886768,"./utils":1773651886767,"./cloudplatform":1773651886772}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886776, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extraRequest = exports.requestWithTimingsMeasure = void 0;
const http_1 = __importDefault(require("http"));
const retry_1 = require("./retry");
const request_timings_measurer_1 = require("./request-timings-measurer");
const request_core_1 = require("./request-core");
const SAFE_RETRY_CODE_SET = new Set([
    'ENOTFOUND',
    'ENETDOWN',
    'EHOSTDOWN',
    'ENETUNREACH',
    'EHOSTUNREACH',
    'ECONNREFUSED'
]);
// const RETRY_CODE_SET = new Set(['ECONNRESET', 'ESOCKETTIMEDOUT'])
const RETRY_STATUS_CODE_SET = new Set([]);
/* istanbul ignore next */
function shouldRetry(e, result, operation) {
    // 重试的错误码
    if (e && SAFE_RETRY_CODE_SET.has(e.code)) {
        return {
            retryAble: true,
            message: e.message
        };
    }
    // 连接超时
    if (e && e.code === 'ETIMEDOUT' && e.connecting === true) {
        return {
            retryAble: true,
            message: e.message
        };
    }
    // 重试的状态码
    if (result && RETRY_STATUS_CODE_SET.has(result.statusCode)) {
        return {
            retryAble: true,
            message: `${result.request.method} ${result.request.href} ${result.statusCode} ${http_1.default.STATUS_CODES[result.statusCode]}`
        };
    }
    return {
        retryAble: false,
        message: ''
    };
}
/* istanbul ignore next */
async function requestWithTimingsMeasure(opts, extraOptions) {
    return await new Promise((resolve, reject) => {
        const timingsMeasurerOptions = extraOptions.timingsMeasurerOptions || {};
        const { waitingTime = 1000, interval = 200, enable = !!extraOptions.debug } = timingsMeasurerOptions;
        const timingsMeasurer = request_timings_measurer_1.RequestTimgingsMeasurer.new({
            waitingTime,
            interval,
            enable
        });
        timingsMeasurer.on('progress', (timings, reason = '') => {
            const timingsLine = `s:${timings.socket || '-'}|l:${timings.lookup
                || '-'}|c:${timings.connect || '-'}|r:${timings.ready || '-'}|w:${timings.waiting
                || '-'}|d:${timings.download || '-'}|e:${timings.end || '-'}|E:${timings.error || '-'}`;
            console.warn(`[TCB][RequestTimgings][${extraOptions.op || ''}] spent ${Date.now()
                - timings.start}ms(${timingsLine}) [${extraOptions.seqId}][${extraOptions.attempts || 1}][${reason}]`);
        });
        (function r() {
            const cRequest = (0, request_core_1.request)(opts, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve({
                        statusCode: res.statusCode,
                        headers: res.headers,
                        body
                    });
                }
            });
            if (cRequest instanceof http_1.default.ClientRequest) {
                timingsMeasurer.measure(cRequest);
            }
        }());
    });
}
exports.requestWithTimingsMeasure = requestWithTimingsMeasure;
async function extraRequest(opts, extraOptions) {
    if (extraOptions && extraOptions.retryOptions) {
        return await (0, retry_1.withRetry)(async (attempts) => {
            return await requestWithTimingsMeasure(opts, Object.assign(Object.assign({}, extraOptions), { attempts }));
        }, Object.assign({ shouldRetry }, extraOptions.retryOptions));
    }
    else {
        return await requestWithTimingsMeasure(opts, Object.assign(Object.assign({}, extraOptions), { attempts: 1 }));
    }
}
exports.extraRequest = extraRequest;

}, function(modId) { var map = {"./retry":1773651886777,"./request-timings-measurer":1773651886778,"./request-core":1773651886779}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886777, function(require, module, exports) {

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = void 0;
const retry_1 = __importDefault(require("retry"));
// import { RetryOperation } from 'retry/lib/retry_operation'
/* eslint-disable-next-line */
const RetryOperation = require('retry/lib/retry_operation');
/* istanbul ignore next */
function defaultShouldRetry(e, result) {
    return { retryAble: false, message: '' };
}
/**
 * withRetry 重试封装函数
 * @param fn
 * @param retryOptions
 */
/* istanbul ignore next */
async function withRetry(fn, retryOptions) {
    // 默认不重试，0 表达未开启的含义，所以直接返回 promise
    if (!retryOptions || retryOptions.retries === 0) {
        return await fn();
    }
    // 默认重试策略采取指数退避策略，超时时间计算公式及参数可查文档
    // https://github.com/tim-kos/node-retry/
    // 自定重试时间：
    // timeouts: [1000, 2000, 4000, 8000]
    const timeouts = retryOptions.timeouts
        ? [...retryOptions.timeouts]
        : retry_1.default.timeouts(retryOptions);
    const operation = new RetryOperation(timeouts, {
        forever: retryOptions.forever,
        unref: retryOptions.unref,
        maxRetryTime: retryOptions.maxRetryTime // 重试总的时间，单位毫秒，默认：Infinity
    });
    const shouldRetry = retryOptions.shouldRetry || defaultShouldRetry;
    return await new Promise((resolve, reject) => {
        const isReadyToRetry = (e, resp, operation) => {
            // 外层有效识别需要或者能够进行重试
            // shouldRetry 中可调用 operation.stop 停掉重试，operation.retry 返回 false
            const { retryAble, message } = shouldRetry(e, resp, operation);
            const info = {};
            info.nth = operation.attempts();
            info.at = new Date();
            info.message = message;
            // 双重条件判断是否重试，外层判断满足条件与否，还需判断是否满足再次重试条件
            const readyToRetry = retryAble && operation.retry(Object.assign({}, info));
            if (!readyToRetry) {
                // 如果不准备进行重试，并且尝试不止一次
                // 最后一个错误记录重试信息
                const ref = e || resp;
                if (ref && operation.attempts() > 1) {
                    ref.attempt = {};
                    ref.attempt.timeouts = operation._originalTimeouts;
                    ref.attempt.attempts = operation.attempts();
                    ref.attempt.errors = operation.errors();
                    // 如果最后一次因为 !retryAble 而没有进行重试
                    // ref.attempt.errors 中将缺少最后的这个错误
                    // ref.attempt.errors 中包含最后一次错误信息
                    if (!retryAble) {
                        ref.attempt.errors.push(info);
                    }
                }
            }
            return readyToRetry;
        };
        operation.attempt(async () => {
            try {
                const result = await fn(operation.attempts());
                if (!isReadyToRetry(null, result, operation)) {
                    resolve(result);
                }
            }
            catch (e) {
                try {
                    if (!isReadyToRetry(e, null, operation)) {
                        reject(e);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }
        }, retryOptions.timeoutOps);
    });
}
exports.withRetry = withRetry;

}, function(modId) { var map = {"retry":1773651886777}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886778, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTimgingsMeasurer = void 0;
const events_1 = require("events");
class RequestTimgingsMeasurer extends events_1.EventEmitter {
    static new(options) {
        return new RequestTimgingsMeasurer(options);
    }
    constructor(options) {
        super();
        this.e = null;
        this.timings = {
        // start: 0,
        // lookup: -1,
        // connect: -1,
        // ready: -1,
        // waiting: -1,
        // download: -1,
        // end: -1
        };
        this.e = null;
        this.enable = options.enable === true;
        this.timerStarted = false;
        this.intervalId = null;
        this.timeoutId = null;
        this.waitingTime = options.waitingTime || 1000;
        this.interval = options.interval || 200;
    }
    /* istanbul ignore next */
    measure(clientRequest) {
        if (!this.enable) {
            return;
        }
        this.startTimer();
        const timings = this.timings;
        timings.start = Date.now();
        clientRequest
            .once('response', message => {
            timings.response = Date.now();
            timings.waiting = Date.now() - timings.start;
            message.once('end', () => {
                timings.socket = timings.socket || 0;
                // timings.lookup = timings.lookup || timings.socket
                // timings.connect = timings.connect || timings.lookup
                timings.download = Date.now() - timings.response;
                timings.end = Date.now() - timings.start;
                this.stopTimer('end');
            });
        })
            .once('socket', socket => {
            timings.socket = Date.now() - timings.start;
            const onlookup = () => {
                this.timings.lookup = Date.now() - this.timings.start;
            };
            const onconnect = () => {
                this.timings.connect = Date.now() - this.timings.start;
            };
            const onready = () => {
                this.timings.ready = Date.now() - this.timings.start;
            };
            if (socket.connecting) {
                socket.once('lookup', onlookup);
                socket.once('connect', onconnect);
                socket.once('ready', onready);
                socket.once('error', e => {
                    socket.off('lookup', onlookup);
                    socket.off('connect', onconnect);
                    socket.off('ready', onready);
                    this.e = e;
                    this.timings.error = Date.now() - this.timings.start;
                    this.stopTimer(`ee:${e.message}`);
                });
            }
            else {
                this.timings.lookup = -1;
                this.timings.connect = -1;
                this.timings.ready = -1;
            }
            // socket.once('data', () => {})
            // socket.once('drain', () => {})
            // socket.once('end', () => {
            //   this.stopTimer('end')
            // })
            // socket.once('timeout', () => {
            //   this.timings.timeout = Date.now() - this.timings.start
            // })
        })
            .once('error', (e) => {
            this.stopTimer(`ee:${e.message}`);
        });
    }
    /* istanbul ignore next */
    startTimer() {
        if (!this.enable) {
            return;
        }
        if (this.timerStarted) {
            return;
        }
        this.timerStarted = true;
        this.intervalId = null;
        this.timeoutId = setTimeout(() => {
            this.process('inprogress');
            this.intervalId = setInterval(() => {
                this.process('inprogress');
            }, this.interval);
        }, this.waitingTime);
    }
    /* istanbul ignore next */
    stopTimer(reason) {
        // if (!this.enable) {
        //   return
        // }
        // if (!this.timerStarted) {
        //   return
        // }
        this.timerStarted = false;
        clearTimeout(this.timeoutId);
        clearInterval(this.intervalId);
        this.process(reason);
    }
    /* istanbul ignore next */
    process(reason) {
        this.emit('progress', Object.assign({}, this.timings), reason);
    }
}
exports.RequestTimgingsMeasurer = RequestTimgingsMeasurer;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886779, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = void 0;
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const agentkeepalive_1 = __importStar(require("agentkeepalive"));
const https_proxy_agent_1 = require("https-proxy-agent");
const http_proxy_agent_1 = require("http-proxy-agent");
const form_data_1 = __importDefault(require("form-data"));
const kAgentCache = new Map();
/**
 * selectAgent
 *
 * 注意：当前不支持 keepalive & proxy 同时配置，如果同时配置，proxy 优先级更高
 *
 * @param url
 * @param options
 * @returns
 */
function selectAgent(url, options) {
    // 开 keepalive 或 proxy 才需要 agent
    if (!options.keepalive && !options.proxy) {
        return null;
    }
    const isHttps = url.startsWith('https');
    const cacheKey = `protocol=${isHttps ? 'https' : 'http'}timeout=${options.timeout}|keepalive${options.keepalive}|proxy=${options.proxy}`;
    if (kAgentCache && kAgentCache.has(cacheKey)) {
        return kAgentCache.get(cacheKey);
    }
    let agent = isHttps
        ? https_1.default.globalAgent
        : http_1.default.globalAgent;
    if (options.keepalive) {
        const keepAliveOpts = {
            keepAliveMsecs: 3000,
            maxSockets: 100,
            maxFreeSockets: 10,
            freeSocketTimeout: 4800,
            // timeout: options.timeout,
            socketActiveTTL: null
        };
        agent = isHttps
            ? new agentkeepalive_1.HttpsAgent(Object.assign({}, keepAliveOpts))
            : new agentkeepalive_1.default(Object.assign({}, keepAliveOpts));
    }
    // 当前需兼容 node.js 12，http(s) proxy agent 最高版本为5，不支持传入 agent
    // 副作用：有 proxy 时，指定 keepalive 无效。由于 proxy 一般调试使用，可以接受
    if (options.proxy) {
        const { protocol, hostname, port } = new URL(options.proxy);
        agent = isHttps
            ? new https_proxy_agent_1.HttpsProxyAgent({ protocol, host: hostname, port: Number(port), timeout: options.timeout })
            : new http_proxy_agent_1.HttpProxyAgent({ protocol, host: hostname, port: Number(port), timeout: options.timeout });
    }
    if (kAgentCache && agent) {
        kAgentCache.set(cacheKey, agent);
    }
    return agent;
}
function buildHttpRequestInfo(opts) {
    // NOTE: 仅某些 method 携带 body 这里仅简单处理
    if (opts.formData) {
        const formdata = new form_data_1.default();
        for (const key in opts.formData) {
            if (Object.prototype.hasOwnProperty.call(opts.formData, key)) {
                formdata.append(key, opts.formData[key]);
            }
        }
        return {
            headers: formdata.getHeaders(),
            body: formdata.getBuffer()
        };
    }
    else {
        if (opts.body === undefined || opts.body === null) {
            return {
                headers: {}
            };
        }
        const body = JSON.stringify(opts.body);
        return {
            headers: { 'content-length': Buffer.byteLength(body, 'utf8') },
            body
        };
    }
}
async function onResponse(res, { encoding, type = 'json' }) {
    if (type === 'stream') {
        return await Promise.resolve(undefined);
    }
    // rawStream: 返回原始的 Node.js 流，用于真正的流式处理
    if (type === 'rawStream') {
        return await Promise.resolve(res);
    }
    if (encoding) {
        res.setEncoding(encoding);
    }
    return await new Promise((resolve, reject) => {
        const bufs = [];
        res.on('data', (chunk) => {
            bufs.push(chunk);
        });
        res.on('end', () => {
            const buf = Buffer.concat(bufs);
            if (type === 'json') {
                try {
                    if (buf.byteLength === 0) {
                        resolve(undefined);
                        return;
                    }
                    resolve(JSON.parse(buf.toString()));
                }
                catch (e) {
                    reject(e);
                }
            }
            resolve(buf);
        });
        res.on('error', (err) => {
            reject(err);
        });
    });
}
function onTimeout(req, cb) {
    let hasConnected = false;
    req.once('socket', (socket) => {
        // NOTE: reusedSocket 为 true 时，不会触发 connect 事件
        if (req.reusedSocket) {
            hasConnected = true;
        }
        else {
            socket.once('connect', () => {
                hasConnected = true;
            });
        }
    });
    req.on('timeout', () => {
        // request.reusedSocket
        // https://nodejs.org/api/net.html#socketconnecting
        // code 遵循 request 库定义：
        // ·ETIMEDOUT：connection timeouts，建立连接时发生超时
        // ·ESOCKETTIMEDOUT：read timeouts，已经成功连接到服务器，等待响应超时
        // https://github.com/request/request#timeouts
        const err = new Error(hasConnected ? 'request timeout' : 'connect timeout');
        err.code = hasConnected ? 'ESOCKETTIMEDOUT' : 'ETIMEDOUT';
        err.reusedSocket = req.reusedSocket;
        err.hasConnected = hasConnected;
        err.connecting = req.socket.connecting;
        err.url = `${req.protocol}://${req.host}${req.path}`;
        cb(err);
    });
}
function request(opts, cb) {
    var _a;
    const times = opts.times || 1;
    const options = {
        method: opts.method,
        headers: opts.headers,
        timeout: opts.timeout || 1
    };
    const { headers, body } = buildHttpRequestInfo(opts);
    options.headers = Object.assign(Object.assign({}, options.headers), headers);
    options.agent = options.agent
        ? options.agent
        : selectAgent(opts.url, {
            timeout: opts.timeout,
            keepalive: opts.keepalive,
            proxy: opts.proxy
        });
    const isHttps = (_a = opts.url) === null || _a === void 0 ? void 0 : _a.startsWith('https');
    const req = (isHttps ? https_1.default : http_1.default).request(opts.url, options, (res) => {
        onResponse(res, {
            encoding: opts.encoding,
            type: opts.json ? 'json' : opts.type
        })
            .then((body) => {
            cb(null, res, body);
        })
            .catch((err) => {
            cb(err);
        });
    });
    req.on('abort', () => {
        cb(new Error('request aborted by client'));
    });
    req.on('error', (err) => {
        if (err && opts.debug) {
            console.warn(`[TCB][RequestTimgings][keepalive:${opts.keepalive}][reusedSocket:${req === null || req === void 0 ? void 0 : req.reusedSocket}][code:${err.code}][message:${err.message}]${opts.url}`);
        }
        if ((err === null || err === void 0 ? void 0 : err.code) === 'ECONNRESET' && (req === null || req === void 0 ? void 0 : req.reusedSocket) && opts.keepalive && opts.times >= 0) {
            return request(Object.assign(Object.assign({}, opts), { times: times - 1 }), cb);
        }
        cb(err);
    });
    if (typeof opts.timeout === 'number' && opts.timeout >= 0) {
        onTimeout(req, cb);
        req.setTimeout(opts.timeout);
    }
    // NOTE: 未传 body 时，不调用 write&end 方法，由外部调用，通常是 pipe 调用
    if (body) {
        req.write(body);
        req.end();
    }
    else {
        // 如果显式指明 noBody 则直接调用 end
        if (opts.noBody) {
            req.end();
        }
    }
    // NOTE: http(s).request 需手动调用 end 方法
    if (options.method.toLowerCase() === 'get') {
        req.end();
    }
    return req;
}
exports.request = request;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886780, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWxCloudbaseAccesstoken = exports.getWxCloudToken = exports.CLOUDBASE_ACCESS_TOKEN_PATH = void 0;
// 由定时触发器触发时（TRIGGER_SRC=timer）：优先使用 WX_TRIGGER_API_TOKEN_V0，不存在的话，为了兼容兼容旧的开发者工具，也是使用 WX_API_TOKEN
// 非定时触发器触发时（TRIGGER_SRC!=timer）: 使用 WX_API_TOKEN
const fs = __importStar(require("fs"));
const cloudbase_1 = require("../cloudbase");
const cloudplatform_1 = require("./cloudplatform");
exports.CLOUDBASE_ACCESS_TOKEN_PATH = '/.tencentcloudbase/wx/cloudbase_access_token';
function getWxCloudToken() {
    const { TRIGGER_SRC, WX_TRIGGER_API_TOKEN_V0, WX_API_TOKEN, WX_CLOUDBASE_ACCESSTOKEN = '' } = cloudbase_1.CloudBase.getCloudbaseContext();
    const wxCloudToken = {};
    if (TRIGGER_SRC === 'timer') {
        wxCloudToken.wxCloudApiToken = WX_TRIGGER_API_TOKEN_V0 || WX_API_TOKEN || '';
    }
    else {
        wxCloudToken.wxCloudApiToken = WX_API_TOKEN || '';
    }
    // 只在不存在 wxCloudApiToken 时，才尝试读取 wxCloudbaseAccesstoken
    if (!wxCloudToken.wxCloudApiToken) {
        wxCloudToken.wxCloudbaseAccesstoken = WX_CLOUDBASE_ACCESSTOKEN || loadWxCloudbaseAccesstoken();
    }
    return wxCloudToken;
}
exports.getWxCloudToken = getWxCloudToken;
const maxCacheAge = 10 * 60 * 1000;
const cloudbaseAccessTokenInfo = { token: '', timestamp: 0 };
function loadWxCloudbaseAccesstoken() {
    if (cloudbaseAccessTokenInfo.token && Date.now() - cloudbaseAccessTokenInfo.timestamp < maxCacheAge) {
        return cloudbaseAccessTokenInfo.token;
    }
    try {
        if ((0, cloudplatform_1.checkIsInCBR)() && fs.existsSync(exports.CLOUDBASE_ACCESS_TOKEN_PATH)) {
            cloudbaseAccessTokenInfo.token = fs.readFileSync(exports.CLOUDBASE_ACCESS_TOKEN_PATH).toString();
            cloudbaseAccessTokenInfo.timestamp = Date.now();
            return cloudbaseAccessTokenInfo.token;
        }
    }
    catch (e) {
        console.warn('[TCB][ERROR]: loadWxCloudbaseAccesstoken error: ', e.message);
    }
    return '';
}
exports.loadWxCloudbaseAccesstoken = loadWxCloudbaseAccesstoken;

}, function(modId) { var map = {"../cloudbase":1773651886765,"./cloudplatform":1773651886772}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886781, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
function loadPackage() {
    try {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json')).toString());
    }
    catch (e) {
        // 某些场景下可能无法成功加载到 package.json 文件
    }
    return {
        version: 'unknow'
    };
}
exports.version = loadPackage().version;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886782, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.TcbOpenApiHttpCommonRequester = exports.getEnvIdFromContext = void 0;
/* eslint-disable-next-line */
const url_1 = require("url");
const signature_nodejs_1 = require("@cloudbase/signature-nodejs");
const cloudbase_1 = require("../cloudbase");
const tracing_1 = require("./tracing");
const cloudplatform_1 = require("./cloudplatform");
const tcbapirequester_1 = require("./tcbapirequester");
const symbol_1 = require("../const/symbol");
const request_1 = require("./request");
const version_1 = require("./version");
const utils = __importStar(require("./utils"));
const tcbopenapiendpoint_1 = require("./tcbopenapiendpoint");
const { second } = utils;
function getEnvIdFromContext() {
    const { TCB_ENV, SCF_NAMESPACE } = cloudbase_1.CloudBase.getCloudbaseContext();
    return TCB_ENV || SCF_NAMESPACE || '';
}
exports.getEnvIdFromContext = getEnvIdFromContext;
class TcbOpenApiHttpCommonRequester {
    /* eslint-enable no-undef */
    constructor(args) {
        var _a, _b;
        this.defaultTimeout = 15000;
        this.timestamp = new Date().valueOf();
        /* eslint-disable no-undef */
        this.slowWarnTimer = null;
        this.args = args;
        this.config = args.config;
        this.opts = args.opts || {};
        this.tracingInfo = (0, tracing_1.generateTracingInfo)((_b = (_a = args.config) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.eventID);
    }
    async request() {
        // 如果没有 accessKey，去检查密钥是否存在，有则直接使用
        if (!this.config.accessKey) {
            // 检查密钥是否存在
            await this.prepareCredentials();
        }
        const opts = this.makeReqOpts();
        // console.log('opts', opts)
        const argopts = this.opts;
        const config = this.config;
        // 注意：必须初始化为 null
        let retryOptions = null;
        if (argopts.retryOptions) {
            retryOptions = argopts.retryOptions;
        }
        else if (config.retries && typeof config.retries === 'number') {
            retryOptions = { retries: config.retries };
        }
        return await (0, request_1.extraRequest)(opts, {
            debug: config.debug,
            op: `${opts.method}:${opts.url}`,
            seqId: this.tracingInfo.seqId,
            retryOptions,
            timingsMeasurerOptions: config.timingsMeasurerOptions || {}
        }).then((response) => {
            this.slowWarnTimer && clearTimeout(this.slowWarnTimer);
            return response;
        });
    }
    makeReqOpts() {
        var _a, _b;
        const config = this.config;
        const args = this.args;
        const envId = args.config.envName === symbol_1.SYMBOL_CURRENT_ENV
            ? getEnvIdFromContext()
            : args.config.envName;
        const url = args.url || (0, tcbopenapiendpoint_1.buildCommonOpenApiUrlWithPath)({
            envId,
            path: args.path,
            region: config.region
        });
        const timeout = ((_a = this.args.opts) === null || _a === void 0 ? void 0 : _a.timeout) || this.config.timeout || this.defaultTimeout;
        const opts = {
            url,
            method: args.method,
            timeout,
            headers: this.buildHeaders(args.method, url),
            proxy: config.proxy
        };
        if (typeof config.keepalive === 'undefined' && !(0, cloudplatform_1.checkIsInScf)()) {
            // 非云函数环境下，默认开启 keepalive
            opts.keepalive = true;
        }
        else {
            /** eslint-disable-next-line */
            opts.keepalive = typeof config.keepalive === 'boolean' && config.keepalive;
        }
        if (args.data) {
            if (['post', 'put', 'patch', 'delete'].includes(args.method.toLowerCase())) {
                if (args.isFormData) {
                    opts.formData = args.data;
                    opts.encoding = null;
                }
                else {
                    opts.body = args.data;
                    if (((_b = args.opts) === null || _b === void 0 ? void 0 : _b.stream) !== true) {
                        opts.json = true;
                    }
                    else {
                        // 使用 rawStream 类型返回原始的 Node.js 流，实现真正的流式响应
                        opts.type = 'rawStream';
                    }
                }
            }
            else {
                /* istanbul ignore next */
                opts.qs = args.data;
            }
        }
        else {
            opts.noBody = true;
        }
        return opts;
    }
    async prepareCredentials() {
        tcbapirequester_1.prepareCredentials.bind(this)();
    }
    buildHeaders(method, url) {
        var _a;
        const config = this.config;
        const { context, secretId, secretKey, sessionToken, accessKey } = config;
        const args = this.args;
        const { TCB_SOURCE } = cloudbase_1.CloudBase.getCloudbaseContext();
        // Note: 云函数被调用时可能调用端未传递 SOURCE，TCB_SOURCE 可能为空
        const SOURCE = `${((_a = context === null || context === void 0 ? void 0 : context.extendedContext) === null || _a === void 0 ? void 0 : _a.source) || TCB_SOURCE || ''},${args.opts.runEnvTag}`;
        // 注意：因为 url.parse 和 url.URL 存在差异，因 url.parse 已被废弃，这里可能会需要改动。
        // 因 @cloudbase/signature-nodejs sign 方法目前内部使用 url.parse 解析 url，
        // 如果这里需要改动，需要注意与 @cloudbase/signature-nodejs 的兼容性
        // 否则将导致签名存在问题
        const parsedUrl = (0, url_1.parse)(url);
        // const parsedUrl = new URL(url)
        let requiredHeaders = {
            'User-Agent': `tcb-node-sdk/${version_1.version}`,
            'X-TCB-Source': SOURCE,
            'X-Client-Timestamp': this.timestamp,
            'X-SDK-Version': `tcb-node-sdk/${version_1.version}`,
            Host: parsedUrl.host
        };
        if (config.version) {
            requiredHeaders['X-SDK-Version'] = config.version;
        }
        if (this.tracingInfo.trace) {
            requiredHeaders['X-TCB-Tracelog'] = this.tracingInfo.trace;
        }
        const region = this.config.region || process.env.TENCENTCLOUD_REGION || '';
        if (region) {
            requiredHeaders['X-TCB-Region'] = region;
        }
        requiredHeaders = Object.assign(Object.assign(Object.assign({}, config.headers), args.headers), requiredHeaders);
        // TODO: 升级SDK版本，否则没传 args.data 时会签名失败
        const { authorization, timestamp } = (0, signature_nodejs_1.sign)({
            secretId,
            secretKey,
            method,
            url,
            params: args.data || '',
            headers: requiredHeaders,
            timestamp: second() - 1,
            withSignedParams: false,
            isCloudApi: true
        });
        // console.log('xxxx', authorization)
        let token = '';
        // 如果请求参数里面传了 token，优先使用 token
        if (args.token) {
            token = makeBearerToken(args.token);
        }
        else if (accessKey) {
            // 如果配置了 API_KEY，优先使用 API_KEY
            token = makeBearerToken(accessKey);
        }
        else if (typeof sessionToken === 'string' && sessionToken !== '') {
            // 如果配置了 sessionToken，携带 sessionToken
            token = `${authorization}, Timestamp=${timestamp}, Token=${sessionToken}`;
        }
        else {
            token = `${authorization}, Timestamp=${timestamp}`;
        }
        /* eslint-disable @typescript-eslint/dot-notation */
        requiredHeaders['Authorization'] = token;
        return Object.assign({}, requiredHeaders);
    }
}
exports.TcbOpenApiHttpCommonRequester = TcbOpenApiHttpCommonRequester;
async function request(args) {
    if (typeof args.isInternal === 'undefined') {
        args.isInternal = await (0, cloudplatform_1.checkIsInternalAsync)();
    }
    args.opts = args.opts || {};
    args.opts.runEnvTag = await (0, cloudplatform_1.getCurrRunEnvTag)();
    const requester = new TcbOpenApiHttpCommonRequester(args);
    return await requester.request();
}
exports.request = request;
function makeBearerToken(token) {
    const trimmed = token.trim();
    return trimmed.startsWith('Bearer ') ? trimmed : `Bearer ${trimmed}`;
}

}, function(modId) { var map = {"../cloudbase":1773651886765,"./tracing":1773651886771,"./cloudplatform":1773651886772,"./tcbapirequester":1773651886770,"../const/symbol":1773651886769,"./request":1773651886776,"./version":1773651886781,"./utils":1773651886767,"./tcbopenapiendpoint":1773651886783}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886783, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommonOpenApiUrlWithPath = exports.buildUrl = void 0;
const ZONE_CHINA = ['ap-shanghai', 'ap-guangzhou', 'ap-shenzhen-fsi', 'ap-shanghai-fsi', 'ap-nanjing', 'ap-beijing', 'ap-chengdu', 'ap-chongqing', 'ap-hongkong'];
/* eslint-disable complexity */
function buildUrl(options) {
    const endpoint = `https://${getGatewayUrl(options)}/v1/cloudrun/${options.name}`;
    const path = options.path.startsWith('/') ? options.path : `/${options.path}`;
    return `${endpoint}${path}`;
}
exports.buildUrl = buildUrl;
function buildCommonOpenApiUrlWithPath(options) {
    return `${options.protocol || 'https'}://${options.serviceUrl || getGatewayUrl(options)}${options.path}`;
}
exports.buildCommonOpenApiUrlWithPath = buildCommonOpenApiUrlWithPath;
function getGatewayUrl(options) {
    const region = options.region || 'ap-shanghai';
    let baseUrl = `${options.envId}.api.tcloudbasegateway.com`;
    if (!ZONE_CHINA.includes(region)) {
        baseUrl = `${options.envId}.api.intl.tcloudbasegateway.com`;
    }
    return baseUrl;
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886784, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callApis = exports.callFunction = void 0;
const tcbapicaller = __importStar(require("../utils/tcbapirequester"));
const tcbopenapicommonrequester = __importStar(require("../utils/tcbopenapicommonrequester"));
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const cloudbase_1 = require("../cloudbase");
const cloudrun_1 = require("../cloudrun");
async function callFunction(cloudbase, callFunctionOptions, opts) {
    // cloudrunfunctions
    if (callFunctionOptions.type === 'cloudrun') {
        const resp = await (0, cloudrun_1.callContainer)(cloudbase, callFunctionOptions, opts);
        return {
            requestId: resp.requestId,
            result: resp.data
        };
    }
    // cloudfunctions
    const { name, qualifier, data } = callFunctionOptions;
    const { TCB_ROUTE_KEY } = cloudbase_1.CloudBase.getCloudbaseContext();
    let transformData;
    try {
        transformData = data ? JSON.stringify(data) : '';
    }
    catch (e) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, e), { code: code_1.ERROR.INVALID_PARAM.code, message: '对象出现了循环引用' }));
    }
    if (!name) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '函数名不能为空' }));
    }
    const params = {
        action: 'functions.invokeFunction',
        function_name: name,
        qualifier,
        // async: async,
        request_data: transformData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: Object.assign({ 'content-type': 'application/json' }, (TCB_ROUTE_KEY ? { 'X-TCB-Route-Key': TCB_ROUTE_KEY } : {}))
    }).then(res => {
        if (res.code) {
            return res;
        }
        let result;
        try {
            result = JSON.parse(res.data.response_data);
        }
        catch (e) {
            result = res.data.response_data;
        }
        return {
            result,
            requestId: res.requestId
        };
    });
}
exports.callFunction = callFunction;
/**
 * 直接调用apis接口
 * @param cloudbase
 * @param callApiOptions
 * @param opts
 * @returns
 */
async function callApis(cloudbase, callApiOptions, opts) {
    let { name, body, path = '', method = 'POST', header = {}, token = '' } = callApiOptions;
    if (!name) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'invalid api name' }));
    }
    let data = body;
    method = method || 'POST';
    const contentType = (header === null || header === void 0 ? void 0 : header['Content-Type']) || (header === null || header === void 0 ? void 0 : header['content-type']) || 'application/json; charset=utf-8';
    try {
        if (method.toLocaleLowerCase() === 'post' && contentType.toLocaleLowerCase().includes('application/json')) {
            data = JSON.parse(body);
        }
    }
    catch (error) {
        data = body;
    }
    return await tcbopenapicommonrequester.request({
        config: cloudbase.config,
        path: `/v1/apis/${name}${path.startsWith('/') ? path : `/${path}`}`,
        method,
        headers: Object.assign({ 'Content-Type': contentType }, header),
        data,
        token,
        opts
    });
}
exports.callApis = callApis;

}, function(modId) { var map = {"../utils/tcbapirequester":1773651886770,"../utils/tcbopenapicommonrequester":1773651886782,"../utils/utils":1773651886767,"../const/code":1773651886768,"../cloudbase":1773651886765,"../cloudrun":1773651886785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886785, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.callContainer = void 0;
const tcbopenapirequester = __importStar(require("../utils/tcbopenapirequester"));
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
async function callContainer(cloudbase, callContainerOptions, opts) {
    // 这里先不对齐了，代码先保留
    // if (callContainerOptions.header && callContainerOptions.header['X-WX-SERVICE'] !== '') {
    //   if (!callContainerOptions.name) {
    //     callContainerOptions.name = callContainerOptions.header['X-WX-SERVICE']
    //   }
    //   if (callContainerOptions.header['X-WX-SERVICE'] !== callContainerOptions.name) {
    //     throw E({
    //       ...ERROR.INVALID_PARAM,
    //       message: '服务名冲突'
    //     })
    //   }
    // }
    const { name, data } = callContainerOptions;
    if (!name) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '服务名不能为空' }));
    }
    return await tcbopenapirequester.request({
        cloudrun: { name },
        config: cloudbase.config,
        method: callContainerOptions.method || 'POST',
        path: callContainerOptions.path || '',
        headers: Object.assign({}, {
            'Content-Type': 'application/json; charset=utf-8'
        }, callContainerOptions.header),
        data,
        opts
    }).then(resp => {
        try {
            resp.data = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body;
        }
        catch (e) {
            // ignore
        }
        return {
            requestId: resp.headers['x-request-id'] || resp.headers['x-cloudbase-request-id'],
            statusCode: resp.statusCode,
            header: resp.headers,
            data: resp.data
        };
    });
}
exports.callContainer = callContainer;

}, function(modId) { var map = {"../utils/tcbopenapirequester":1773651886786,"../utils/utils":1773651886767,"../const/code":1773651886768}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886786, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.TcbOpenApiHttpRequester = exports.getEnvIdFromContext = void 0;
/* eslint-disable-next-line */
const url_1 = require("url");
const signature_nodejs_1 = require("@cloudbase/signature-nodejs");
const symbol_1 = require("../const/symbol");
const cloudbase_1 = require("../cloudbase");
const tracing_1 = require("./tracing");
const cloudplatform_1 = require("./cloudplatform");
const tcbopenapiendpoint_1 = require("./tcbopenapiendpoint");
const tcbapirequester_1 = require("./tcbapirequester");
const request_1 = require("./request");
const version_1 = require("./version");
const utils = __importStar(require("./utils"));
const { second } = utils;
function getEnvIdFromContext() {
    const { TCB_ENV, SCF_NAMESPACE } = cloudbase_1.CloudBase.getCloudbaseContext();
    return TCB_ENV || SCF_NAMESPACE || '';
}
exports.getEnvIdFromContext = getEnvIdFromContext;
class TcbOpenApiHttpRequester {
    /* eslint-enable no-undef */
    constructor(args) {
        var _a, _b;
        this.defaultTimeout = 15000;
        this.timestamp = new Date().valueOf();
        /* eslint-disable no-undef */
        this.slowWarnTimer = null;
        this.args = args;
        this.config = args.config;
        this.opts = args.opts || {};
        this.tracingInfo = (0, tracing_1.generateTracingInfo)((_b = (_a = args.config) === null || _a === void 0 ? void 0 : _a.context) === null || _b === void 0 ? void 0 : _b.eventID);
    }
    async request() {
        if (!this.config.accessKey) {
            await this.prepareCredentials();
        }
        const opts = this.makeReqOpts();
        // console.log('opts', opts)
        const argopts = this.opts;
        const config = this.config;
        // 注意：必须初始化为 null
        let retryOptions = null;
        if (argopts.retryOptions) {
            retryOptions = argopts.retryOptions;
        }
        else if (config.retries && typeof config.retries === 'number') {
            retryOptions = { retries: config.retries };
        }
        return await (0, request_1.extraRequest)(opts, {
            debug: config.debug,
            op: `${opts.method}:${opts.url}`,
            seqId: this.tracingInfo.seqId,
            retryOptions,
            timingsMeasurerOptions: config.timingsMeasurerOptions || {}
        }).then((response) => {
            this.slowWarnTimer && clearTimeout(this.slowWarnTimer);
            return response;
        });
    }
    makeReqOpts() {
        var _a;
        const config = this.config;
        const args = this.args;
        const envId = args.config.envName === symbol_1.SYMBOL_CURRENT_ENV
            ? getEnvIdFromContext()
            : args.config.envName;
        const url = (0, tcbopenapiendpoint_1.buildUrl)({
            envId,
            region: this.config.region,
            // protocol: this.config.protocol || 'https',
            // serviceUrl: this.config.serviceUrl,
            // seqId: this.tracingInfo.seqId,
            // isInternal: this.args.isInternal,
            name: args.cloudrun.name,
            path: args.path
        });
        const timeout = ((_a = this.args.opts) === null || _a === void 0 ? void 0 : _a.timeout) || this.config.timeout || this.defaultTimeout;
        const opts = {
            url,
            method: args.method,
            timeout,
            headers: this.buildHeaders(args.method, url),
            proxy: config.proxy
        };
        if (typeof config.keepalive === 'undefined' && !(0, cloudplatform_1.checkIsInScf)()) {
            // 非云函数环境下，默认开启 keepalive
            opts.keepalive = true;
        }
        else {
            /** eslint-disable-next-line */
            opts.keepalive = typeof config.keepalive === 'boolean' && config.keepalive;
        }
        if (args.data) {
            if (args.method.toLowerCase() === 'post') {
                if (args.isFormData) {
                    opts.formData = args.data;
                    opts.encoding = null;
                }
                else {
                    opts.body = args.data;
                    opts.json = true;
                }
            }
            else {
                /* istanbul ignore next */
                // 这里 qs 参数暂时并没使用
                opts.qs = args.data;
            }
        }
        else {
            opts.noBody = true;
        }
        return opts;
    }
    async prepareCredentials() {
        tcbapirequester_1.prepareCredentials.bind(this)();
    }
    buildHeaders(method, url) {
        var _a;
        const config = this.config;
        const { context, secretId, secretKey, sessionToken, accessKey } = config;
        const args = this.args;
        const { TCB_SOURCE } = cloudbase_1.CloudBase.getCloudbaseContext();
        // Note: 云函数被调用时可能调用端未传递 SOURCE，TCB_SOURCE 可能为空
        const SOURCE = `${((_a = context === null || context === void 0 ? void 0 : context.extendedContext) === null || _a === void 0 ? void 0 : _a.source) || TCB_SOURCE || ''},${args.opts.runEnvTag}`;
        // 注意：因为 url.parse 和 url.URL 存在差异，因 url.parse 已被废弃，这里可能会需要改动。
        // 因 @cloudbase/signature-nodejs sign 方法目前内部使用 url.parse 解析 url，
        // 如果这里需要改动，需要注意与 @cloudbase/signature-nodejs 的兼容性
        // 否则将导致签名存在问题
        const parsedUrl = (0, url_1.parse)(url);
        // const parsedUrl = new URL(url)
        let requiredHeaders = {
            'User-Agent': `tcb-node-sdk/${version_1.version}`,
            'X-TCB-Source': SOURCE,
            'X-Client-Timestamp': this.timestamp,
            'X-SDK-Version': `tcb-node-sdk/${version_1.version}`,
            Host: parsedUrl.host
        };
        if (config.version) {
            requiredHeaders['X-SDK-Version'] = config.version;
        }
        if (this.tracingInfo.trace) {
            requiredHeaders['X-TCB-Tracelog'] = this.tracingInfo.trace;
        }
        const region = this.config.region || process.env.TENCENTCLOUD_REGION || '';
        if (region) {
            requiredHeaders['X-TCB-Region'] = region;
        }
        requiredHeaders = Object.assign(Object.assign(Object.assign({}, config.headers), args.headers), requiredHeaders);
        let params = args.data || '';
        // GET 方法不支持传 BODY
        if (method.toLowerCase() === 'get') {
            params = '';
        }
        // TODO: 升级SDK版本，否则没传 args.data 时会签名失败
        const { authorization, timestamp } = (0, signature_nodejs_1.sign)({
            secretId,
            secretKey,
            method,
            url,
            params,
            headers: requiredHeaders,
            timestamp: second() - 1,
            withSignedParams: false,
            isCloudApi: true
        });
        let token = '';
        // 如果请求参数里面传了 token，优先使用 token
        if (args.token) {
            token = makeBearerToken(args.token);
        }
        else if (accessKey) {
            // 如果配置了 API_KEY，优先使用 API_KEY
            token = makeBearerToken(accessKey);
        }
        else if (typeof sessionToken === 'string' && sessionToken !== '') {
            // 如果配置了 sessionToken，使用 sessionToken
            token = `${authorization}, Timestamp=${timestamp}, Token=${sessionToken}`;
        }
        else {
            token = `${authorization}, Timestamp=${timestamp}`;
        }
        /* eslint-disable @typescript-eslint/dot-notation */
        requiredHeaders['Authorization'] = token;
        return Object.assign({}, requiredHeaders);
    }
}
exports.TcbOpenApiHttpRequester = TcbOpenApiHttpRequester;
async function request(args) {
    if (typeof args.isInternal === 'undefined') {
        args.isInternal = await (0, cloudplatform_1.checkIsInternalAsync)();
    }
    args.opts = args.opts || {};
    args.opts.runEnvTag = await (0, cloudplatform_1.getCurrRunEnvTag)();
    const requester = new TcbOpenApiHttpRequester(args);
    return await requester.request();
}
exports.request = request;
function makeBearerToken(token) {
    const trimmed = token.trim();
    return trimmed.startsWith('Bearer ') ? trimmed : `Bearer ${trimmed}`;
}

}, function(modId) { var map = {"../const/symbol":1773651886769,"../cloudbase":1773651886765,"./tracing":1773651886771,"./cloudplatform":1773651886772,"./tcbopenapiendpoint":1773651886783,"./tcbapirequester":1773651886770,"./request":1773651886776,"./version":1773651886781,"./utils":1773651886767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886787, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.newDb = void 0;
const database_1 = require("@cloudbase/database");
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const tcbdbapirequester_1 = require("../utils/tcbdbapirequester");
function newDb(cloudbase, dbConfig = {}) {
    database_1.Db.reqClass = tcbdbapirequester_1.TcbDBApiHttpRequester;
    // 兼容方法预处理
    if (Object.prototype.toString.call(dbConfig).slice(8, -1) !== 'Object') {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'dbConfig must be an object' }));
    }
    if (dbConfig === null || dbConfig === void 0 ? void 0 : dbConfig.env) {
        // env变量名转换
        dbConfig.envName = dbConfig.env;
        delete dbConfig.env;
    }
    return new database_1.Db(Object.assign(Object.assign({}, cloudbase.config), dbConfig));
}
exports.newDb = newDb;

}, function(modId) { var map = {"../utils/utils":1773651886767,"../const/code":1773651886768,"../utils/tcbdbapirequester":1773651886788}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886788, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TcbDBApiHttpRequester = void 0;
const tcbapicaller = __importStar(require("./tcbapirequester"));
class TcbDBApiHttpRequester {
    constructor(config) {
        this.config = config;
    }
    /**
       * 发送请求
       *
       * @param dbParams   - 数据库请求参数
       * @param opts  - 可选配置项
       */
    async send(api, data, opts) {
        const _a = this.config, { instance, database } = _a, config = __rest(_a, ["instance", "database"]);
        const params = Object.assign(Object.assign({}, data), { action: api, instance, database });
        return await tcbapicaller.request({
            config,
            params,
            method: 'post',
            opts,
            headers: {
                'content-type': 'application/json'
            }
        });
    }
}
exports.TcbDBApiHttpRequester = TcbDBApiHttpRequester;

}, function(modId) { var map = {"./tcbapirequester":1773651886770}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886789, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.getFileAuthority = exports.getUploadMetadata = exports.downloadFile = exports.getFileInfo = exports.getTempFileURL = exports.deleteFile = exports.uploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const xml2js_1 = require("xml2js");
const tcbapicaller = __importStar(require("../utils/tcbapirequester"));
const request_core_1 = require("../utils/request-core");
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const cloudbase_1 = require("../cloudbase");
async function parseXML(str) {
    return await new Promise((resolve, reject) => {
        (0, xml2js_1.parseString)(str, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
/**
 * 上传文件
 * @param {string} cloudPath 上传后的文件路径
 * @param {fs.ReadStream | Buffer} fileContent  上传文件的二进制流
 */
async function uploadFile(cloudbase, { cloudPath, fileContent }, opts) {
    if (!(fileContent instanceof fs_1.default.ReadStream) && !(fileContent instanceof Buffer)) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '[node-sdk] fileContent should be instance of fs.ReadStream or Buffer' }));
    }
    const { requestId, data: { url, token, authorization, fileId, cosFileId } } = await getUploadMetadata(cloudbase, { cloudPath }, opts);
    const headers = {
        Signature: authorization,
        'x-cos-security-token': token,
        'x-cos-meta-fileid': cosFileId,
        authorization,
        key: encodeURIComponent(cloudPath)
    };
    const fileStream = stream_1.Readable.from(fileContent);
    let body = await new Promise((resolve, reject) => {
        const req = (0, request_core_1.request)({ method: 'put', url, headers, type: 'raw' }, (err, _, body) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(body);
            }
        });
        req.on('error', (err) => {
            reject(err);
        });
        // automatically close, no need to call req.end
        fileStream.pipe(req);
    });
    // 成功返回空字符串，失败返回如下格式 XML：
    // <?xml version='1.0' encoding='utf-8' ?>
    // <Error>
    //     <Code>InvalidAccessKeyId</Code>
    //     <Message>The Access Key Id you provided does not exist in our records</Message>
    //     <Resource>/path/to/file/key.xyz</Resource>
    //     <RequestId>NjQzZTMyYzBfODkxNGJlMDlfZjU4NF9hMjk4YTUy</RequestId>
    //     <TraceId>OGVmYzZiMmQzYjA2OWNhODk0NTRkMTBiOWVmMDAxODc0OWRkZjk0ZDM1NmI1M2E2MTRlY2MzZDhmNmI5MWI1OTQyYWVlY2QwZTk2MDVmZDQ3MmI2Y2I4ZmI5ZmM4ODFjYmRkMmZmNzk1YjUxODZhZmZlNmNhYWUyZTQzYjdiZWY=</TraceId>
    // </Error>
    body = await parseXML(body);
    if (body === null || body === void 0 ? void 0 : body.Error) {
        const { Code: [code], Message: [message], RequestId: [cosRequestId], TraceId: [cosTraceId] } = body.Error;
        if (code === 'SignatureDoesNotMatch') {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.SYS_ERR), { message: `[${code}]: ${message}`, requestId: `${requestId}|${cosRequestId}|${cosTraceId}` }));
        }
        return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.STORAGE_REQUEST_FAIL), { message: `[${code}]: ${message}`, requestId: `${requestId}|${cosRequestId}|${cosTraceId}` }));
    }
    return {
        fileID: fileId
    };
}
exports.uploadFile = uploadFile;
/**
 * 删除文件
 * @param {Array.<string>} fileList 文件id数组
 */
async function deleteFile(cloudbase, { fileList }, opts) {
    if (!fileList || !Array.isArray(fileList)) {
        return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList必须是非空的数组' }));
    }
    for (const file of fileList) {
        if (!file || typeof file !== 'string') {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList的元素必须是非空的字符串' }));
        }
    }
    const params = {
        action: 'storage.batchDeleteFile',
        fileid_list: fileList
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.code) {
            return res;
        }
        //     throw E({ ...res })
        // } else {
        return {
            fileList: res.data.delete_list,
            requestId: res.requestId
        };
        // }
    });
}
exports.deleteFile = deleteFile;
/**
 * 获取文件下载链接
 * @param {Array.<Object>} fileList
 */
async function getTempFileURL(cloudbase, { fileList }, opts) {
    if (!fileList || !Array.isArray(fileList)) {
        return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList必须是非空的数组' }));
    }
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const file_list = [];
    for (const file of fileList) {
        if (typeof file === 'object') {
            if (!Object.prototype.hasOwnProperty.call(file, 'fileID')
                || !Object.prototype.hasOwnProperty.call(file, 'maxAge')) {
                return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList 的元素如果是对象，必须是包含 fileID 和 maxAge 的对象' }));
            }
            file_list.push({
                fileid: file.fileID,
                max_age: file.maxAge,
                url_type: file.urlType
            });
        }
        else if (typeof file === 'string') {
            file_list.push({
                fileid: file
            });
        }
        else {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList的元素如果不是对象，则必须是字符串' }));
        }
    }
    const params = {
        action: 'storage.batchGetDownloadUrl',
        file_list
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.code) {
            return res;
        }
        return {
            fileList: res.data.download_list,
            requestId: res.requestId
        };
    });
}
exports.getTempFileURL = getTempFileURL;
async function getFileInfo(cloudbase, { fileList }, opts) {
    var _a;
    const fileInfo = await getTempFileURL(cloudbase, { fileList }, opts);
    if ((fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.fileList) && ((_a = fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.fileList) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        const fileList = await Promise.all(fileInfo.fileList.map(async (item) => {
            if (item.code !== 'SUCCESS') {
                return {
                    code: item.code,
                    fileID: item.fileID,
                    tempFileURL: item.tempFileURL
                };
            }
            try {
                const res = await fetch(encodeURI(item.tempFileURL), { method: 'HEAD' });
                const fileSize = parseInt(res.headers.get('content-length')) || 0;
                const contentType = res.headers.get('content-type') || '';
                const fileInfo = {
                    code: item.code,
                    fileID: item.fileID,
                    tempFileURL: item.tempFileURL,
                    cloudId: item.fileID,
                    fileName: item.fileID.split('/').pop(),
                    contentType,
                    mime: contentType.split(';')[0].trim(),
                    size: fileSize
                };
                return fileInfo;
            }
            catch (e) {
                return {
                    code: 'FETCH_FILE_INFO_ERROR',
                    fileID: item.fileID,
                    tempFileURL: item.tempFileURL
                };
            }
        }));
        return {
            fileList,
            requestId: fileInfo.requestId
        };
    }
    return {
        fileList: [],
        requestId: fileInfo.requestId
    };
}
exports.getFileInfo = getFileInfo;
async function downloadFile(cloudbase, { fileID, urlType, tempFilePath }, opts) {
    const tmpUrlRes = await getTempFileURL(cloudbase, {
        fileList: [
            {
                fileID,
                urlType,
                maxAge: 600
            }
        ]
    }, opts);
    const res = tmpUrlRes.fileList[0];
    if (res.code !== 'SUCCESS') {
        return (0, utils_1.processReturn)(Object.assign({}, res));
    }
    // COS_URL 场景下，不需要再进行 Encode URL
    const tmpUrl = urlType === 'COS_URL' ? res.tempFileURL : encodeURI(res.tempFileURL);
    return await new Promise((resolve, reject) => {
        const reqOpts = {
            method: 'get',
            url: tmpUrl,
            type: tempFilePath ? 'stream' : 'raw'
        };
        const req = (0, request_core_1.request)(reqOpts, (err, res, body) => {
            if (err) {
                reject(err);
            }
            else {
                if (tempFilePath) {
                    res.pipe(fs_1.default.createWriteStream(tempFilePath, { autoClose: true }));
                }
                if (res.statusCode === 200) {
                    resolve({
                        fileContent: tempFilePath ? undefined : body,
                        message: '文件下载完成'
                    });
                }
                else {
                    reject((0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.STORAGE_REQUEST_FAIL), { message: `下载文件失败: Status:${res.statusCode} Url:${tmpUrl}`, requestId: res.headers['x-cos-request-id'] })));
                }
            }
        });
        req.on('error', (err) => {
            if (tempFilePath) {
                fs_1.default.unlinkSync(tempFilePath);
            }
            reject(err);
        });
    });
}
exports.downloadFile = downloadFile;
async function getUploadMetadata(cloudbase, { cloudPath }, opts) {
    const params = {
        action: 'storage.getUploadMetadata',
        path: cloudPath,
        method: 'put' // 使用 put 方式上传
    };
    const res = await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    });
    return res;
}
exports.getUploadMetadata = getUploadMetadata;
async function getFileAuthority(cloudbase, { fileList }, opts) {
    const { LOGINTYPE } = cloudbase_1.CloudBase.getCloudbaseContext();
    if (!Array.isArray(fileList)) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '[node-sdk] getCosFileAuthority fileList must be a array' }));
    }
    if (fileList.some(file => {
        if (!(file === null || file === void 0 ? void 0 : file.path)) {
            return true;
        }
        if (!['READ', 'WRITE', 'READWRITE'].includes(file.type)) {
            return true;
        }
        return false;
    })) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '[node-sdk] getCosFileAuthority fileList param error' }));
    }
    const userInfo = cloudbase.auth().getUserInfo();
    const { openId, uid } = userInfo;
    if (!openId && !uid) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '[node-sdk] admin do not need getCosFileAuthority.' }));
    }
    const params = {
        action: 'storage.getFileAuthority',
        openId,
        uid,
        loginType: LOGINTYPE,
        fileList
    };
    const res = await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    });
    if (res.code) {
        /* istanbul ignore next  */
        throw (0, utils_1.E)(Object.assign(Object.assign({}, res), { message: '[node-sdk] getCosFileAuthority failed: ' + res.code }));
    }
    else {
        return res;
    }
}
exports.getFileAuthority = getFileAuthority;
async function copyFile(cloudbase, { fileList }, opts) {
    // 参数校验
    if (!fileList || !Array.isArray(fileList) || fileList.length === 0) {
        return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'fileList必须是非空的数组' }));
    }
    const list = [];
    for (const file of fileList) {
        const { srcPath, dstPath } = file;
        if (!srcPath || !dstPath || typeof srcPath !== 'string' || typeof dstPath !== 'string') {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'srcPath和dstPath必须是非空的字符串' }));
        }
        if (srcPath === dstPath) {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'srcPath和dstPath不能相同' }));
        }
        if (path_1.default.basename(srcPath) !== path_1.default.basename(dstPath)) {
            return (0, utils_1.processReturn)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'srcPath和dstPath的文件名必须相同' }));
        }
        list.push({
            src_path: srcPath,
            dst_path: dstPath,
            overwrite: file.overwrite,
            remove_original: file.removeOriginal
        });
    }
    const params = {
        action: 'storage.batchCopyFile',
        file_list: list
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.code) {
            return res;
        }
        return {
            fileList: res.data.copy_list,
            requestId: res.requestId
        };
    });
}
exports.copyFile = copyFile;

}, function(modId) { var map = {"../utils/tcbapirequester":1773651886770,"../utils/request-core":1773651886779,"../utils/utils":1773651886767,"../const/code":1773651886768,"../cloudbase":1773651886765}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886790, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wxCallContainerApi = exports.callWxPayApi = exports.callCompatibleWxOpenApi = exports.callWxOpenApi = void 0;
const tcbapicaller = __importStar(require("../utils/tcbapirequester"));
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
function validateCrossAccount(config, opts = {}) {
    const getCrossAccountInfo = opts.getCrossAccountInfo || config.getCrossAccountInfo;
    if (getCrossAccountInfo) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'invalid config: getCrossAccountInfo' }));
    }
}
async function callWxOpenApi(cloudbase, { apiName, apiOptions, cgiName, requestData }, opts) {
    let transformRequestData;
    try {
        transformRequestData = requestData ? JSON.stringify(requestData) : '';
    }
    catch (e) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, e), { code: code_1.ERROR.INVALID_PARAM.code, message: '对象出现了循环引用' }));
    }
    validateCrossAccount(cloudbase.config, opts);
    const params = {
        action: 'wx.api',
        apiName,
        apiOptions,
        cgiName,
        requestData: transformRequestData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        opts,
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => {
        if (res.code) {
            return res;
        }
        let result;
        try {
            result = JSON.parse(res.data.responseData);
        }
        catch (e) {
            result = res.data.responseData;
        }
        return {
            result,
            requestId: res.requestId
        };
    });
}
exports.callWxOpenApi = callWxOpenApi;
/**
 * 调用wxopenAPi
 * @param {String} apiName  接口名
 * @param {Buffer} requestData
 * @return {Promise} 正常内容为buffer，报错为json {code:'', message:'', resquestId:''}
 */
async function callCompatibleWxOpenApi(cloudbase, { apiName, apiOptions, cgiName, requestData }, opts) {
    validateCrossAccount(cloudbase.config, opts);
    const params = {
        action: 'wx.openApi',
        apiName,
        apiOptions,
        cgiName,
        requestData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        params,
        isFormData: true,
        opts: Object.assign({ type: 'raw' }, opts)
    }).then(res => res);
}
exports.callCompatibleWxOpenApi = callCompatibleWxOpenApi;
/**
 * wx.wxPayApi 微信支付用
 * @param {String} apiName  接口名
 * @param {Buffer} requestData
 * @return {Promise} 正常内容为buffer，报错为json {code:'', message:'', resquestId:''}
 */
async function callWxPayApi(cloudbase, { apiName, apiOptions, cgiName, requestData }, opts) {
    validateCrossAccount(cloudbase.config, opts);
    const params = {
        action: 'wx.wxPayApi',
        apiName,
        apiOptions,
        cgiName,
        requestData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        params,
        isFormData: true,
        opts: Object.assign({ type: 'raw' }, opts)
    });
}
exports.callWxPayApi = callWxPayApi;
/**
 * wx.wxCallContainerApi
 * @param {String} apiName  接口名
 * @param {Buffer} requestData
 * @return {Promise} 正常内容为buffer，报错为json {code:'', message:'', resquestId:''}
 */
async function wxCallContainerApi(cloudbase, { apiName, apiOptions, cgiName, requestData }, opts) {
    validateCrossAccount(cloudbase.config, opts);
    const params = {
        action: 'wx.wxCallContainerApi',
        apiName,
        apiOptions,
        cgiName,
        requestData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        method: 'post',
        headers: { 'content-type': 'multipart/form-data' },
        params,
        isFormData: true,
        opts: Object.assign({ type: 'raw' }, opts)
    });
}
exports.wxCallContainerApi = wxCallContainerApi;

}, function(modId) { var map = {"../utils/tcbapirequester":1773651886770,"../utils/utils":1773651886767,"../const/code":1773651886768}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886791, function(require, module, exports) {

/* eslint-disable @typescript-eslint/naming-convention */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = void 0;
const tcbapicaller = __importStar(require("../utils/tcbapirequester"));
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const cloudbase_1 = require("../cloudbase");
const reportTypes = ['mall'];
function validateAnalyticsData(data) {
    if (Object.prototype.toString.call(data).slice(8, -1) !== 'Object') {
        return false;
    }
    const { report_data, report_type } = data;
    if (!reportTypes.includes(report_type)) {
        return false;
    }
    if (Object.prototype.toString.call(report_data).slice(8, -1) !== 'Object') {
        return false;
    }
    if (report_data.action_time !== undefined && !Number.isInteger(report_data.action_time)) {
        return false;
    }
    if (typeof report_data.action_type !== 'string') {
        return false;
    }
    return true;
}
async function analytics(cloudbase, requestData) {
    // 获取openid, wxappid
    const { WX_OPENID, WX_APPID } = cloudbase_1.CloudBase.getCloudbaseContext();
    if (!validateAnalyticsData(requestData)) {
        throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: '当前的上报数据结构不符合规范' }));
    }
    const action_time = requestData.report_data.action_time === undefined ? Math.floor(Date.now() / 1000) : requestData.report_data.action_time;
    const transformRequestData = {
        analytics_scene: requestData.report_type,
        analytics_data: Object.assign(Object.assign({ openid: WX_OPENID, wechat_mini_program_appid: WX_APPID }, requestData.report_data), { action_time })
    };
    const params = {
        action: 'analytics.report',
        requestData: transformRequestData
    };
    return await tcbapicaller.request({
        config: cloudbase.config,
        params,
        method: 'post',
        headers: {
            'content-type': 'application/json'
        }
    });
}
exports.analytics = analytics;

}, function(modId) { var map = {"../utils/tcbapirequester":1773651886770,"../utils/utils":1773651886767,"../const/code":1773651886768,"../cloudbase":1773651886765}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886792, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAI = void 0;
const ai_1 = require("@cloudbase/ai");
const request_adapter_1 = require("./request-adapter");
const tcbopenapiendpoint_1 = require("../utils/tcbopenapiendpoint");
const symbol_1 = require("../const/symbol");
const openapicommonrequester = __importStar(require("../utils/tcbopenapicommonrequester"));
const app_1 = require("@cloudbase/app");
/**
 * 创建 AI 实例
 * @param cloudbase CloudBase 实例
 * @returns AI 实例
 */
function createAI(cloudbase) {
    const config = cloudbase.config;
    // 获取环境 ID
    const envId = config.envName === symbol_1.SYMBOL_CURRENT_ENV ? openapicommonrequester.getEnvIdFromContext() : config.envName;
    // 构建 AI 基础 URL
    const baseUrl = (0, tcbopenapiendpoint_1.buildCommonOpenApiUrlWithPath)({
        serviceUrl: config.serviceUrl,
        envId,
        path: '/v1',
        region: config.region
    });
    // 创建请求适配器
    const requestAdapter = new request_adapter_1.AIRequestAdapter(config, async () => {
        const credential = await cloudbase.auth().getClientCredential();
        return credential.access_token;
    });
    // 创建 AI 实例
    const ai = new ai_1.AI(requestAdapter, baseUrl, { t: (s) => s, lang: app_1.LANGS.ZH, LANG_HEADER_KEY: 'Accept-Language' });
    return ai;
}
exports.createAI = createAI;

}, function(modId) { var map = {"./request-adapter":1773651886793,"../utils/tcbopenapiendpoint":1773651886783,"../const/symbol":1773651886769,"../utils/tcbopenapicommonrequester":1773651886782}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886793, function(require, module, exports) {

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIRequestAdapter = void 0;
const openapicommonrequester = __importStar(require("../utils/tcbopenapicommonrequester"));
const web_streams_polyfill_1 = require("web-streams-polyfill");
const utils_1 = require("../utils/utils");
class AIRequestAdapter {
    constructor(config, getAccessToken) {
        this.config = config;
        this.getAccessToken = getAccessToken;
    }
    async fetch(options) {
        var _a, _b;
        const { url, stream = false, timeout, method = 'POST', headers, body } = options;
        const headersObj = {};
        if (isHeaders(headers)) {
            headers.forEach((value, key) => {
                headersObj[key] = value;
            });
        }
        else if (Array.isArray(headers)) {
            headers.forEach(([k, v]) => (headersObj[k] = v));
        }
        else {
            Object.assign(headersObj, headers);
        }
        let parsedBody;
        if (typeof body === 'string') {
            try {
                parsedBody = JSON.parse(body);
            }
            catch (_c) {
                parsedBody = body;
            }
        }
        else {
            parsedBody = body;
        }
        const token = await this.getAccessToken();
        const result = await openapicommonrequester.request({
            config: this.config,
            data: parsedBody,
            method: (method === null || method === void 0 ? void 0 : method.toUpperCase()) || 'POST',
            url,
            headers: Object.assign({ 'Content-Type': 'application/json' }, headersObj),
            token,
            opts: {
                timeout: timeout || this.config.timeout,
                stream
            }
        });
        const { body: bodyData, headers: responseHeaders, statusCode } = result;
        if (statusCode < 200 || statusCode >= 300) {
            let errorMessage = `Request failed with status code ${statusCode}`;
            let errorCode = `${statusCode}`;
            let requestId = '';
            let errorBody = null;
            if (typeof bodyData === 'string') {
                errorBody = bodyData;
            }
            else if (Buffer.isBuffer(bodyData)) {
                errorBody = bodyData.toString('utf-8');
            }
            else if (bodyData && typeof bodyData === 'object' && typeof bodyData.on === 'function') {
                errorBody = await readStreamToString(bodyData);
            }
            if (errorBody) {
                try {
                    const errorData = JSON.parse(errorBody);
                    if ((_a = errorData.error) === null || _a === void 0 ? void 0 : _a.message) {
                        errorMessage = errorData.error.message;
                    }
                    else if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                    if ((_b = errorData.error) === null || _b === void 0 ? void 0 : _b.code) {
                        errorCode = errorData.error.code;
                    }
                    else if (errorData.code) {
                        errorCode = errorData.code;
                    }
                    if (errorData.requestId) {
                        requestId = errorData.requestId;
                    }
                }
                catch (_d) {
                    errorMessage = errorBody || errorMessage;
                }
            }
            // 从响应头中获取 requestId
            if (!requestId && responseHeaders) {
                const headerRequestId = responseHeaders['x-cloudbase-request-id'] || responseHeaders['x-request-id'] || '';
                requestId = Array.isArray(headerRequestId) ? headerRequestId[0] : headerRequestId;
            }
            throw (0, utils_1.E)({
                code: errorCode,
                message: errorMessage,
                requestId
            });
        }
        if (stream) {
            // 对于流式响应,将 Node.js 原生流转换为 Web ReadableStream
            let readableStream;
            if (bodyData && typeof bodyData === 'object' && 'on' in bodyData && typeof bodyData.on === 'function') {
                const nodeStream = bodyData;
                // Node 12 兼容: 使用标志位追踪 stream 状态,避免重复 close 导致异常
                let streamClosed = false;
                readableStream = new web_streams_polyfill_1.ReadableStream({
                    start(controller) {
                        nodeStream.on('data', (chunk) => {
                            if (streamClosed)
                                return;
                            controller.enqueue(new Uint8Array(chunk));
                        });
                        nodeStream.on('end', () => {
                            if (streamClosed)
                                return;
                            streamClosed = true;
                            controller.close();
                        });
                        nodeStream.on('error', (err) => {
                            if (streamClosed)
                                return;
                            streamClosed = true;
                            controller.error(err);
                        });
                    },
                    cancel() {
                        streamClosed = true;
                        nodeStream.destroy();
                    }
                });
            }
            else if (bodyData instanceof Buffer) {
                readableStream = new web_streams_polyfill_1.ReadableStream({
                    start(controller) {
                        controller.enqueue(new Uint8Array(bodyData));
                        controller.close();
                    }
                });
            }
            else if (typeof bodyData === 'string') {
                const encoder = new TextEncoder();
                readableStream = new web_streams_polyfill_1.ReadableStream({
                    start(controller) {
                        controller.enqueue(encoder.encode(bodyData));
                        controller.close();
                    }
                });
            }
            else {
                readableStream = new web_streams_polyfill_1.ReadableStream({
                    start(controller) {
                        controller.close();
                    }
                });
            }
            return {
                data: readableStream,
                statusCode,
                header: responseHeaders
            };
        }
        let responseData;
        if (typeof bodyData === 'string') {
            try {
                responseData = JSON.parse(bodyData);
            }
            catch (_e) {
                responseData = bodyData;
            }
        }
        else if (bodyData instanceof Buffer) {
            const bodyString = bodyData.toString('utf-8');
            try {
                responseData = JSON.parse(bodyString);
            }
            catch (_f) {
                responseData = bodyString;
            }
        }
        else {
            responseData = bodyData;
        }
        return {
            data: Promise.resolve(responseData),
            statusCode,
            header: responseHeaders
        };
    }
    /**
     * post 方法 - AI 模块可能不使用,但需要实现接口
     */
    async post() {
        throw new Error('post method is not supported in AI module');
    }
    /**
     * upload 方法 - AI 模块可能不使用,但需要实现接口
     */
    async upload() {
        throw new Error('upload method is not supported in AI module');
    }
    /**
     * download 方法 - AI 模块可能不使用,但需要实现接口
     */
    async download() {
        throw new Error('download method is not supported in AI module');
    }
}
exports.AIRequestAdapter = AIRequestAdapter;
function isHeaders(h) {
    try {
        // Node.js 低版本可能没有 Headers
        return h instanceof Headers;
    }
    catch (_) {
        return false;
    }
}
/**
 * 从 Node.js 流中读取完整内容为字符串
 */
async function readStreamToString(stream) {
    return await new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => {
            chunks.push(chunk);
        });
        stream.on('end', () => {
            resolve(Buffer.concat(chunks).toString('utf-8'));
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
}

}, function(modId) { var map = {"../utils/tcbopenapicommonrequester":1773651886782,"../utils/utils":1773651886767}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886794, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const utils_1 = require("../utils/utils");
const code_1 = require("../const/code");
const cloudbase_1 = require("../cloudbase");
class Logger {
    constructor() {
        const { _SCF_TCB_LOG } = cloudbase_1.CloudBase.getCloudbaseContext();
        this.src = 'app';
        this.isSupportClsReport = true;
        if (`${_SCF_TCB_LOG}` !== '1') {
            this.isSupportClsReport = false;
        }
        else if (!console.__baseLog__) {
            this.isSupportClsReport = false;
        }
        if (!this.isSupportClsReport) {
            console.warn('[TCB][WARN] 请检查您是否在本地环境 或者 未开通高级日志功能，当前环境下无法上报cls日志，默认使用 console');
        }
    }
    transformMsg(logMsg) {
        // 目前 logMsg 只支持字符串 value 且不支持多级, 加一层转换处理
        let realMsg = {};
        realMsg = Object.assign(Object.assign({}, realMsg), logMsg);
        return realMsg;
    }
    baseLog(logMsg, logLevel) {
        if (Object.prototype.toString.call(logMsg).slice(8, -1) !== 'Object') {
            throw (0, utils_1.E)(Object.assign(Object.assign({}, code_1.ERROR.INVALID_PARAM), { message: 'log msg must be an object' }));
        }
        const msgContent = this.transformMsg(logMsg);
        if (this.isSupportClsReport) {
            ;
            console.__baseLog__(msgContent, logLevel);
        }
        else {
            if (console[logLevel]) {
                console[logLevel](msgContent);
            }
        }
    }
    log(logMsg) {
        this.baseLog(logMsg, 'log');
    }
    info(logMsg) {
        this.baseLog(logMsg, 'info');
    }
    warn(logMsg) {
        this.baseLog(logMsg, 'warn');
    }
    error(logMsg) {
        this.baseLog(logMsg, 'error');
    }
}
exports.Logger = Logger;
function logger() {
    return new Logger();
}
exports.logger = logger;

}, function(modId) { var map = {"../utils/utils":1773651886767,"../const/code":1773651886768,"../cloudbase":1773651886765}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1773651886795, function(require, module, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const functions_1 = require("../functions");
/**
   * SDK推送消息接口
   * @param params
   * notifyId: 通知策略Id
   * data: 通知策略下的模板变量对应值
   * receivers: 待通知的用户名
   * url: 点击消息卡片打开的链接
   * @returns
   */
async function sendNotification(cloudbase, params, opts) {
    return await (0, functions_1.callFunction)(cloudbase, {
        name: 'lowcode-datasource',
        data: {
            methodName: 'callWedaApi',
            params: {
                action: 'PushNotifyMsg',
                data: {
                    NotifyId: params.notifyId,
                    Data: JSON.stringify(params.data),
                    NotifyUsers: undefined,
                    Url: params.url
                }
            },
            mode: 'c'
        }
    }, opts);
}
exports.sendNotification = sendNotification;

}, function(modId) { var map = {"../functions":1773651886784}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1773651886764);
})()
//miniprogram-npm-outsideDeps=["axios","@cloudbase/wx-cloud-client-sdk","jsonwebtoken","http","url","@cloudbase/signature-nodejs","retry/lib/retry_operation","events","https","agentkeepalive","https-proxy-agent","http-proxy-agent","form-data","fs","path","@cloudbase/database","stream","xml2js","@cloudbase/ai","@cloudbase/app","web-streams-polyfill"]
//# sourceMappingURL=index.js.map