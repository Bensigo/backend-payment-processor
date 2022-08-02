import { Module } from '@nestjs/common';
import { databaseProviders } from './db.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService, ConfigModule],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
