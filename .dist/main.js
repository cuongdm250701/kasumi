/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const koa_1 = __importDefault(__webpack_require__(/*! koa */ "koa"));
const cors_1 = __importDefault(__webpack_require__(/*! @koa/cors */ "@koa/cors"));
const koa_body_1 = __importDefault(__webpack_require__(/*! koa-body */ "koa-body"));
const auth_controller_1 = __webpack_require__(/*! @controllers/auth.controller */ "./src/controllers/auth.controller.ts");
const router_1 = __importDefault(__webpack_require__(/*! @koa/router */ "@koa/router"));
const error_handler_middleware_1 = __webpack_require__(/*! @middleware/error-handler.middleware */ "./src/middleware/error-handler.middleware.ts");
const logger_middleware_1 = __webpack_require__(/*! @middleware/logger.middleware */ "./src/middleware/logger.middleware.ts");
const app_1 = __webpack_require__(/*! @config/app */ "./src/config/app.ts");
// import { Authorized } from '@middleware/auth.middleware';
const port = 3000;
const routers = [
    auth_controller_1.authRouter
];
const app = new koa_1.default();
app.use((0, cors_1.default)());
app.use((0, koa_body_1.default)({
    jsonLimit: '4mb',
    multipart: true,
}));
const rootRouter = new router_1.default();
routers.forEach((router) => {
    // url /workschedule/...
    rootRouter.use(app_1.config.api_prefix, router.routes());
});
app.use(error_handler_middleware_1.errorHandlerMiddleware);
app.use(logger_middleware_1.loggerMiddleware);
// app.use(Authorized());
app.use(rootRouter.routes());
app.listen(port, () => {
    console.log(`🚀 Server is running on port http://localhost:${port}/`);
});


/***/ }),

/***/ "./src/config/app.ts":
/*!***************************!*\
  !*** ./src/config/app.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.config = void 0;
exports.config = {
    environment: process.env.NODE_ENV || 'development',
    jwt_secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : '',
    databaseUrl: process.env.DATABASE_URL,
    hasLog: process.env.HAS_LOG == 'true',
    api_prefix: '/workschedule',
    app: {
        jsonLimit: '1mb',
        api_prefix: '/api',
    },
};


/***/ }),

/***/ "./src/config/logger.ts":
/*!******************************!*\
  !*** ./src/config/logger.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logger = void 0;
const winston_1 = __webpack_require__(/*! winston */ "winston");
const { combine, colorize, align, simple } = winston_1.format;
// const myFormat = printf(({ level, message, timestamp }) => {
//     return `${timestamp} ${level}: ${message}`;
// });
const logger = (0, winston_1.createLogger)({
    format: combine(process.env.NODE_ENV == 'development' ? colorize() : align(), simple()),
    transports: [new winston_1.transports.Console()],
});
exports.logger = logger;


/***/ }),

/***/ "./src/controllers/auth.controller.ts":
/*!********************************************!*\
  !*** ./src/controllers/auth.controller.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.authRouter = exports.router = void 0;
const router_1 = __importDefault(__webpack_require__(/*! @koa/router */ "@koa/router"));
exports.router = new router_1.default();
const authRouter = new router_1.default({ prefix: '/auth' });
exports.authRouter = authRouter;
authRouter.get("/product", (ctx, next) => {
    ctx.body = "Hello World!";
    next();
});


/***/ }),

/***/ "./src/middleware/error-handler.middleware.ts":
/*!****************************************************!*\
  !*** ./src/middleware/error-handler.middleware.ts ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.errorHandlerMiddleware = void 0;
const logger_1 = __webpack_require__(/*! @config/logger */ "./src/config/logger.ts");
const api_error_1 = __webpack_require__(/*! @models/api.error */ "./src/models/api.error.ts");
const bad_request_error_1 = __webpack_require__(/*! @models/bad-request.error */ "./src/models/bad-request.error.ts");
const response_code_enum_1 = __webpack_require__(/*! @models/enum/response-code.enum */ "./src/models/enum/response-code.enum.ts");
const errorHandlerMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (error) {
        if (error instanceof bad_request_error_1.BadRequestError) {
            logger_1.logger.info(error.message);
            ctx.body = error.toResponse();
        }
        else if (error instanceof api_error_1.ApiError) {
            if (error.errorCode != response_code_enum_1.ResponseCodeEnum.UNAUTHORIZED)
                logger_1.logger.error(error.stack);
            ctx.body = error.toResponse();
        }
        else {
            ctx.body = new api_error_1.ApiError(response_code_enum_1.ResponseCodeEnum.INTERNAL_SERVER_ERROR).toResponse();
            logger_1.logger.error('Unhandled error: ', error, ctx);
        }
    }
});
exports.errorHandlerMiddleware = errorHandlerMiddleware;


/***/ }),

/***/ "./src/middleware/logger.middleware.ts":
/*!*********************************************!*\
  !*** ./src/middleware/logger.middleware.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loggerMiddleware = void 0;
const logger_1 = __webpack_require__(/*! @config/logger */ "./src/config/logger.ts");
const loggerMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(`Start: ${ctx.method} ${ctx.url}`);
    if (Object.keys(ctx.request.body || {}).length > 0) {
        // TODO: Make it configurable
        const body = JSON.stringify(ctx.request.body).replace(/"password":".*?"/g, '"password":"[MASKED]"');
        logger_1.logger.info(`Params: ${body}`);
    }
    yield next();
    logger_1.logger.info(`End: ${ctx.method} ${ctx.url}`);
});
exports.loggerMiddleware = loggerMiddleware;


/***/ }),

/***/ "./src/models/api.error.ts":
/*!*********************************!*\
  !*** ./src/models/api.error.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiError = void 0;
const app_1 = __webpack_require__(/*! @config/app */ "./src/config/app.ts");
const response_code_enum_1 = __webpack_require__(/*! @models/enum/response-code.enum */ "./src/models/enum/response-code.enum.ts");
const response_builder_1 = __webpack_require__(/*! @src/ultis/response-builder */ "./src/ultis/response-builder.ts");
class ApiError extends Error {
    constructor(errorCode, message) {
        super(message);
        this._errorCode = errorCode;
        this._message = message;
    }
    get errorCode() {
        return this._errorCode;
    }
    get message() {
        return this._message || (0, response_code_enum_1.getMessage)(this._errorCode);
    }
    debug(data) {
        if (app_1.config.environment == 'development') {
            this._debug = data;
        }
        return this;
    }
    toResponse() {
        return new response_builder_1.ResponseBuilder()
            .error()
            .withCode(this._errorCode)
            .withMessage(this.message)
            .withDebug(this._debug)
            .build();
    }
}
exports.ApiError = ApiError;


/***/ }),

/***/ "./src/models/bad-request.error.ts":
/*!*****************************************!*\
  !*** ./src/models/bad-request.error.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BadRequestError = void 0;
const app_1 = __webpack_require__(/*! @config/app */ "./src/config/app.ts");
const response_code_enum_1 = __webpack_require__(/*! @models/enum/response-code.enum */ "./src/models/enum/response-code.enum.ts");
const response_builder_1 = __webpack_require__(/*! @src/ultis/response-builder */ "./src/ultis/response-builder.ts");
class BadRequestError extends Error {
    constructor(errorCode, message) {
        super(message);
        this._errorCode = errorCode;
        this._message = message;
    }
    get errorCode() {
        return this._errorCode;
    }
    get message() {
        return this._message || (0, response_code_enum_1.getMessage)(this._errorCode);
    }
    debug(data) {
        if (app_1.config.environment == 'development') {
            this._debug = data;
        }
        return this;
    }
    toResponse() {
        return new response_builder_1.ResponseBuilder()
            .error()
            .withCode(this._errorCode)
            .withMessage(this.message)
            .withDebug(this._debug)
            .build();
    }
}
exports.BadRequestError = BadRequestError;


/***/ }),

/***/ "./src/models/enum/response-code.enum.ts":
/*!***********************************************!*\
  !*** ./src/models/enum/response-code.enum.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getMessage = exports.ResponseCodeEnum = void 0;
var ResponseCodeEnum;
(function (ResponseCodeEnum) {
    ResponseCodeEnum["NOT_FOUND"] = "NOT_FOUND";
    ResponseCodeEnum["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ResponseCodeEnum["UNAUTHORIZED"] = "UNAUTHORIZED";
    ResponseCodeEnum["FORBIDDEN"] = "FORBIDDEN";
    ResponseCodeEnum["BAD_REQUEST"] = "BAD_REQUEST";
    ResponseCodeEnum["CODE_AUTH_FAILED"] = "AUTH_FAILED";
    ResponseCodeEnum["OLD_PASSWORD_IS_CORRECT"] = "OLD_PASSWORD_IS_CORRECT";
    ResponseCodeEnum["WRONG_DATA"] = "WRONG_DATA";
})(ResponseCodeEnum = exports.ResponseCodeEnum || (exports.ResponseCodeEnum = {}));
const CODE_MESSAGES = {
    NOT_FOUND: '該当のデータが見つかりません。',
    INTERNAL_SERVER_ERROR: '内部サーバーエラー',
    UNAUTHORIZED: 'アクセスが許可されていません',
    FORBIDDEN: 'アクセスは禁止されています。',
    BAD_REQUEST: '不正なリクエストメッセージです。',
    AUTH_FAILED: 'ユーザー名なたはパスワードが正しくありません。',
    OLD_PASSWORD_IS_CORRECT: '旧パスワードが正しくありません。',
    WRONG_DATA: 'ファイルの全データが不正です。',
};
const getMessage = (code) => {
    return CODE_MESSAGES[code];
};
exports.getMessage = getMessage;


/***/ }),

/***/ "./src/models/enum/response-type.enum.ts":
/*!***********************************************!*\
  !*** ./src/models/enum/response-type.enum.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseTypeEnum = void 0;
var ResponseTypeEnum;
(function (ResponseTypeEnum) {
    ResponseTypeEnum["Success"] = "success";
    ResponseTypeEnum["Error"] = "error";
})(ResponseTypeEnum = exports.ResponseTypeEnum || (exports.ResponseTypeEnum = {}));


/***/ }),

/***/ "./src/ultis/response-builder.ts":
/*!***************************************!*\
  !*** ./src/ultis/response-builder.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResponseBuilder = void 0;
const response_code_enum_1 = __webpack_require__(/*! @models/enum/response-code.enum */ "./src/models/enum/response-code.enum.ts");
const response_type_enum_1 = __webpack_require__(/*! @models/enum/response-type.enum */ "./src/models/enum/response-type.enum.ts");
class ResponseBuilder {
    constructor(data) {
        this.payload = {
            type: response_type_enum_1.ResponseTypeEnum.Success,
        };
        this.payload.data = data;
    }
    success() {
        this.payload.type = response_type_enum_1.ResponseTypeEnum.Success;
        return this;
    }
    error() {
        this.payload.type = response_type_enum_1.ResponseTypeEnum.Error;
        return this;
    }
    withCode(code) {
        this.payload.code = code;
        this.payload.message = (0, response_code_enum_1.getMessage)(code);
        return this;
    }
    withMessage(message) {
        this.payload.message = message;
        return this;
    }
    withData(data) {
        this.payload.data = data;
        return this;
    }
    withMeta(meta) {
        this.payload.meta = meta;
        return this;
    }
    withDebug(debug) {
        this.payload.__debug__ = debug;
        return this;
    }
    build() {
        return this.payload;
    }
}
exports.ResponseBuilder = ResponseBuilder;


/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("@koa/cors");

/***/ }),

/***/ "@koa/router":
/*!******************************!*\
  !*** external "@koa/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@koa/router");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("koa-body");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map