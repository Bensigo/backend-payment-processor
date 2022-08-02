"use strict";
var _a;
exports.__esModule = true;
exports.dbConfig = void 0;
var config_1 = require("@nestjs/config");
var config_2 = require("../config");
var constants_1 = require("../config/constants");
exports.dbConfig = {
    url: (_a = process.env.PG_URL) !== null && _a !== void 0 ? _a : "postgresql://postgres:postgres@127.0.0.1:5432/wearecreators".concat(config_2["default"].isTesting ? '_test' : ''),
    synchronize: true,
    migrationsTableName: "".concat(constants_1.appName, "_schema_migrations"),
    type: 'postgres',
    logging: true,
    entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
    migrationsRun: false,
    migrations: [__dirname + '/../../../migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: __dirname + '/../../../migrations'
    },
    ssl: {
        rejectUnauthorized: false
    }
};
exports["default"] = (0, config_1.registerAs)('database', function () {
    return exports.dbConfig;
});
