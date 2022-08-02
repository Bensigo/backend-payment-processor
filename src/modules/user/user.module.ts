import { Module } from '@nestjs/common';
import { DatabaseModule } from '@core/database/db.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserProvider } from '@modules/user/user.provider';
import { UserController } from '@modules/user/controllers/user.controller';
import { UserService } from '@modules/user/services/user.service';
import { UserRepository } from '@modules/user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import {
  AUTH_SECRET,
  JwtStrategy,
} from '@modules/user/strategies/jwt.strategy';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    JwtModule.register({
      secret: AUTH_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [...UserProvider, UserRepository, UserService, JwtStrategy],
  controllers: [UserController],
  exports: [],
})
export class UserModule {}
