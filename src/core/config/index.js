"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var constants_1 = require("./constants");
var appNamePortSum = function (appName) {
    return (Math.ceil(__spreadArray(__spreadArray([], appName, true), appName.split('-').pop(), true).reduce(function (sum, char) { return sum + char.charCodeAt(0); }, 0) / 30) + 3000);
};
var storageDisk = process.env.DISK || 'local';
var tempMediaPath = process.env.TEMP_MEDIA_PATH || '.tmp';
var diskStoragePath = process.env.DISK_STORAGE_PATH || '/tmp/backend-rmg';
var tempMulterPath = process.env.TEMP_MULTER_PATH || '/tmp/backend-rmg/.mutler';
var isTesting = constants_1.nodeEnv === 'test';
var appConfig = {
    name: constants_1.appName,
    port: typeof process.env.PORT == 'undefined'
        ? appNamePortSum(constants_1.appName)
        : parseInt(process.env.PORT || '0'),
    isLocal: constants_1.nodeEnv === 'local',
    isTesting: isTesting,
    isDevelopment: constants_1.nodeEnv === 'development',
    isProduction: constants_1.nodeEnv === 'production',
    jwtSecret: process.env.JWT_SECRET || 'gfuhjlklkjhghjkjhghjk',
    postgres: {
        url: '',
        logger: constants_1.nodeEnv !== 'production'
    },
    s3: {
        bucket: process.env.S3_BUCKET,
        region: process.env.S3_REGION,
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
    },
    storage: {
        disk: storageDisk,
        diskPath: diskStoragePath,
        tempMulterPath: tempMulterPath,
        tempMediaPath: tempMediaPath
    }
};
exports["default"] = appConfig;
