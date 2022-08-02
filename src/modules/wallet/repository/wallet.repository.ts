import { Inject, Injectable } from '@nestjs/common';
import { WalletEntity } from '@modules/wallet/entities/wallet.entity';
import { WALLET_PROVIDER } from '@modules/wallet/wallet.provider';
import { Repository } from 'typeorm';

@Injectable()
export class WalletRepository {
  constructor(
    @Inject(WALLET_PROVIDER)
    private readonly walletEntity: Repository<WalletEntity>,
  ) {}

  async createWallet(
    address: string,
    network: string,
    userId: string,
    url?: string,
  ) {
    const wallet = this.walletEntity.create({
      address,
      userId,
      network,
      name: network,
      explorerUrl: url,
    });
    return this.walletEntity.save(wallet);
  }
  async findById(id: string) {
    return this.walletEntity.findOne({
      where: { id },
    });
  }
  async findOne(payload: Partial<WalletEntity>) {
    return this.walletEntity.findOne({ ...payload });
  }
  async find(payload: Partial<WalletEntity>) {
    return this.walletEntity.find({ ...payload });
  }
  async deleteOne(id: string) {
    return this.walletEntity.softDelete({ id });
  }
}
