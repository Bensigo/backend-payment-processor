"use strict";
exports.__esModule = true;
exports.swaggerOptions = void 0;
var swagger_1 = require("@nestjs/swagger");
exports.swaggerOptions = new swagger_1.DocumentBuilder()
    .setTitle('spacemate')
    .setDescription('APIS')
    .setVersion('0.0.2')
    .addServer('http://localhost:3047/v1', 'localhost')
    .addServer('https://spacemates-dev.herokuapp.com/v1', 'dev_server')
    .addServer('https://stage.spacemate.com/v1', 'stage_server')
    .addServer('https://api.spacemate.com/v1', 'prod_server')
    .build();
