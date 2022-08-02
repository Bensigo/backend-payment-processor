import { Module } from '@nestjs/common';
import { PaymentLinkProvider } from '@modules/payment/providers/payment-link.provider';
import { PaymentLinkController } from '@modules/payment/controllers/payment-link.controller';
import { PaymentLinkRepository } from '@modules/payment/repository/payment-link.repository';
import { PaymentLinkService } from '@modules/payment/services/payment-link.service';
import { DatabaseModule } from '@core/database/db.module';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from '@modules/wallet/wallet.module';
import { WalletService } from '@modules/wallet/services/wallet.service';
import { WalletRepository } from '@modules/wallet/repository/wallet.repository';
import { walletProvider } from '@modules/wallet/wallet.provider';

@Module({
  controllers: [PaymentLinkController],
  imports: [DatabaseModule, ConfigModule],
  providers: [
    ...PaymentLinkProvider,
    ...walletProvider,
    PaymentLinkRepository,
    PaymentLinkService,
    WalletService,
    WalletRepository,
  ],
  exports: [],
})
export class PaymentModule {}
