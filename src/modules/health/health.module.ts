import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health.controller';
import { DatabaseModule } from '../../core/database/db.module';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    TerminusModule,
    ConfigService,
    HttpModule,
  ],
  providers: [],
  controllers: [HealthController],
})
export default class HealthModule {}
