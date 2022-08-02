import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '@modules/shared/base.entity';
import { UserEntity } from '@modules/user/entities/user.entity';
import { TransactionEntity } from '@modules/payment/entities/transaction.entity';

export enum PaymentType {
  standard = 'standard',
  donation = 'donation',
  monthly = 'monthly',
  yearly = 'yearly',
}

export type PaymentMethod = {
  name: string;
  network: string;
  explorerUrl: string;
};

@Entity('payment_link')
export class PaymentLinkEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  amount: number;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: 'simple-array' })
  paymentMethod: PaymentMethod[];

  @JoinColumn({ name: 'userId' })
  @ManyToOne(() => UserEntity, (user) => user.payments)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (tnx) => tnx.paymentLink)
  transactions: TransactionEntity[];

  @Column('varchar')
  userId: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
