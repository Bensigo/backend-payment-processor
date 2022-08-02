import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { PaymentLinkEntity } from '@modules/payment/entities/payment-link.entity';
import { DATABASE_CONNECTION } from '@core/config/constants';

export const PAYMENT_LINK_PROVIDER = 'PAYMENT_LINK_PROVIDER';
export const PaymentLinkProvider: Provider[] = [
  {
    provide: PAYMENT_LINK_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.getRepository(PaymentLinkEntity),
    inject: [DATABASE_CONNECTION],
  },
];
