import {
  PaymentMethod,
  PaymentType,
} from '@modules/payment/entities/payment-link.entity';
import { UserEntity } from '@modules/user/entities/user.entity';

export interface IPaymentLink {
  description: string;
  title: string;
  amount?: number;
  paymentType: PaymentType;
  user: UserEntity; // todo: create user interface (Note interface should not interact with entity)
  paymentMethod: PaymentMethod[];
}
