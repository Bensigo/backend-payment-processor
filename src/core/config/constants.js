"use strict";
var _a, _b;
exports.__esModule = true;
exports.DATABASE_CONNECTION = exports.tempMulterPath = exports.maxFileSizeBytes = exports.nodeEnv = exports.appName = void 0;
exports.appName = (_a = process.env.APP_NAME) !== null && _a !== void 0 ? _a : 'backend-rmg';
exports.nodeEnv = (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development';
exports.maxFileSizeBytes = 10 * 1024 * 1024;
exports.tempMulterPath = process.env.TEMP_MULTER_PATH || '/tmp/rmg/.multer';
exports.DATABASE_CONNECTION = 'DATABASE_CONNECTION';
