import { Injectable } from '@nestjs/common';
import { PaymentLinkRepository } from '@modules/payment/repository/payment-link.repository';
import { createPaymentDto } from '@modules/payment/dtos/create-payment.dto';
import { UserEntity } from '@modules/user/entities/user.entity';
import { WalletService } from '@modules/wallet/services/wallet.service';
import { NoActiveOrWalletError } from '@modules/wallet/errors/wallet.error';
import { PaymentMethod } from '@modules/payment/entities/payment-link.entity';
import { ListPaymentLinkDto } from '@modules/payment/dtos/list-payment-link.dto';
import { UpdatePaymentLinkStatusDto } from '@modules/payment/dtos/update-payment-link-status.dto';

@Injectable()
export class PaymentLinkService {
  constructor(
    private readonly paymentLinkRepository: PaymentLinkRepository,
    private readonly walletService: WalletService,
  ) {}

  async createPaymentLink(input: createPaymentDto, user: UserEntity) {
    const { description, paymentType, amount, title } = input;
    console.log({ user })
    const wallets = await this.walletService.listWallet(user.id);
    console.log({ wallets });
    const activePaymentMethods: PaymentMethod[] = wallets.filter((wallet) => {
      console.log({ wallet });
      if (wallet.isActive) {
        return { name: '', network: wallet.network, explorerUrl: '' };
      }
    });
    if (!wallets.length || !activePaymentMethods.length) {
      throw new NoActiveOrWalletError();
    }
    return this.paymentLinkRepository.create({
      description,
      title,
      paymentType,
      amount,
      user,
      paymentMethod: activePaymentMethods,
    });
  }
  async updatePaymentLinkStatus(
    payload: UpdatePaymentLinkStatusDto,
    userId: string,
  ) {
    return this.paymentLinkRepository.update(payload.id, userId);
  }

  async listPaymentLink(userId: string, payload: ListPaymentLinkDto) {
    const { page = 1, size = 50, isActive = true } = payload;
    return this.paymentLinkRepository.listPaymentLink(
      userId,
      page,
      size,
      isActive,
    );
  }
}
