import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { WalletEntity } from '@modules/wallet/entities/wallet.entity';
import { DATABASE_CONNECTION } from '@core/config/constants';

export const WALLET_PROVIDER = 'WALLET_PROVIDER';

export const walletProvider: Provider[] = [
  {
    provide: WALLET_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.getRepository(WalletEntity),
    inject: [DATABASE_CONNECTION],
  },
];
