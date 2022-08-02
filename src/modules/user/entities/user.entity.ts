import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@modules/shared/base.entity';
import { PaymentLinkEntity } from '@modules/payment/entities/payment-link.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column('varchar', { nullable: false })
  address: string;

  @Column('varchar', { length: 255, nullable: true })
  username: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true })
  country: string;

  @Column('varchar', { nullable: true })
  industry: string;

  @Column('boolean', { default: false })
  isVerified: boolean;

  @OneToMany(() => PaymentLinkEntity, (payment) => payment.user)
  payments: PaymentLinkEntity[];
}
