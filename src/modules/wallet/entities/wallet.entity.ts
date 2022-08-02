import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '@modules/shared/base.entity';

@Entity('wallet')
export class WalletEntity extends BaseEntity {
  @Column('varchar', {})
  address: string;

  @Column('varchar', {})
  network: string;

  @Column('varchar', {  nullable: true })
  name: string;

  @Column('varchar', { nullable: true })
  explorerUrl: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column('varchar')
  userId: string;
}
