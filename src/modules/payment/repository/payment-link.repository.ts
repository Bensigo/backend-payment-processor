import { Inject, Injectable } from '@nestjs/common';
import { PAYMENT_LINK_PROVIDER } from '@modules/payment/providers/payment-link.provider';
import { Repository } from 'typeorm';
import { PaymentLinkEntity } from '@modules/payment/entities/payment-link.entity';
import { IPaymentLink } from '@modules/payment/interfaces/payment-link.interface';

@Injectable()
export class PaymentLinkRepository {
  constructor(
    @Inject(PAYMENT_LINK_PROVIDER)
    readonly paymentLinkEntity: Repository<PaymentLinkEntity>,
  ) {}

  async create(input: IPaymentLink) {
    const { amount, paymentType, user, description, paymentMethod, title } =
      input;
    const paymentLink = this.paymentLinkEntity.create({
      paymentType,
      user,
      paymentMethod,
      description,
      title,
      ...(amount ? { amount } : {}),
    });
    return this.paymentLinkEntity.save(paymentLink);
  }
  async update(walletId: string, userId: string) {
    const wallet = await this.getWallet(walletId);
    return this.paymentLinkEntity.update(
      { id: walletId, userId },
      {
        isActive: !wallet.isActive,
      },
    );
  }
  async getWallet(id: string) {
    return this.paymentLinkEntity.findOne({
      id,
    });
  }
  async listPaymentLink(
    userId: string,
    page: number,
    size: number,
    isActive = true,
  ) {
    const query = this.paymentLinkEntity.createQueryBuilder('payment_link');
    query.where('payment_link.userId = :userId', { userId });
    query.andWhere('payment_link.isActive = :isActive', { isActive });
    query.orderBy('payment_link.createdAt', 'DESC');
    return query
      .take(size)
      .skip((page - 1) * size)
      .getMany();
  }
}
