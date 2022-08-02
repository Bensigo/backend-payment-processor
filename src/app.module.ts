import { Module } from '@nestjs/common';
import HealthModule from '@modules/health/health.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@core/config';
import dbConfig from '@core/database/db.config';
import { UserModule } from '@modules/user/user.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { PaymentModule } from '@modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => appConfig, dbConfig],
    }),
    HealthModule,
    UserModule,
    WalletModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
