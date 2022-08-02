import { BaseEntity } from '@modules/shared/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PaymentLinkEntity } from '@modules/payment/entities/payment-link.entity';

export enum TransactionStatus {
  pending = 100,
  failed = 101,
  success = 102,
}

@Entity('transaction')
export class TransactionEntity extends BaseEntity {
  @Column({ type: 'enum', enum: TransactionStatus })
  transactionStatus: TransactionStatus;

  @Column('varchar')
  blockExplorerUrl: string;

  @Column('varchar')
  transactionId: string;

  @Column('varchar')
  network: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  amount: number;

  @Column('varchar')
  address: string;

  @ManyToOne(() => PaymentLinkEntity, (paymentLink) => paymentLink.transactions)
  paymentLink: PaymentLinkEntity;
}
