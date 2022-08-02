import { Module } from '@nestjs/common';
import { walletProvider } from '@modules/wallet/wallet.provider';
import { WalletRepository } from '@modules/wallet/repository/wallet.repository';
import { WalletService } from '@modules/wallet/services/wallet.service';
import { DatabaseModule } from '@core/database/db.module';
import { ConfigModule } from '@nestjs/config';
import {WalletController} from "@modules/wallet/controllers/wallet.controller";

@Module({
  providers: [...walletProvider, WalletRepository, WalletService],
  controllers: [WalletController],
  imports: [DatabaseModule, ConfigModule],
  exports: [],
})
export class WalletModule {}
