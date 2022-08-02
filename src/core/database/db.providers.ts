import { createConnection } from 'typeorm';
import { DATABASE_CONNECTION } from '../config/constants';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (configService: ConfigService) =>
      await createConnection(configService.get('database')),
    inject: [ConfigService],
  },
];
