import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { v4 as uuidV4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import compression = require('compression');
import bodyParser = require('body-parser');
import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './core/config/swagger.options';
import * as fs from 'fs';
import { NextFunction, Request, Response } from 'express';
import express = require('express');

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  generateSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  if (process.env.NODE_ENV !== 'production') {
    app.use(express.static(`/tmp/we-are-creators`));
  }

  // http request logger middleware with trace id
  app.use((req: Request, res: Response, next: NextFunction) => {
    const store: Map<string, any> = new Map();
    req.headers['x-trace-id'] = req.headers['x-trace-id'] || uuidV4();
    res.setHeader('x-trace-id', req.headers['x-trace-id']);
    store.set('xTraceId', req.headers['x-trace-id']);
    next();
  });

  app.use(
    bodyParser.urlencoded({
      extended: false,
    }),
  );

  app.enableCors({
    origin: '*'
  });
  app.use(
    bodyParser.json({
      limit: process.env.JSON_MAX_LIMIT ?? '100kb',
    }),
  );

  app.use(compression());

  // @ts-ignore
  const port: number = app.get(ConfigService).get('port');
  await app.listen(port);
  Logger.log('running on http://localhost:' + port, 'Boostrap');
}
function generateSwagger(app: INestApplication) {
  const document: OpenAPIObject = SwaggerModule.createDocument(
    app,
    swaggerOptions,
  );
  if (!fs.existsSync('./swagger/swagger.json')) {
    fs.mkdirSync('./swagger');
  }
  fs.writeFileSync('./swagger/swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('docs', app, document);
}

bootstrap().then();
