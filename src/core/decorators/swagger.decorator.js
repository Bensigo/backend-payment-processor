"use strict";
exports.__esModule = true;
exports.ApiSwagger = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
function ApiSwagger(options) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiOkResponse)(options.response), (0, swagger_1.ApiOperation)(options.operation));
}
exports.ApiSwagger = ApiSwagger;
