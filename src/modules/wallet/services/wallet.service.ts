import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WalletRepository } from '@modules/wallet/repository/wallet.repository';

@Injectable()
export class WalletService {
  constructor(private readonly walletRepository: WalletRepository) {}

  async addWallet(
    address: string,
    network: string,
    userId: string,
    url?: string,
  ) {
    const existingNetwork = await this.walletRepository.findOne({ network });
    if (existingNetwork) {
      throw new HttpException(
        'Network already existing',
        HttpStatus.BAD_REQUEST,
      );
    }
    // todo: handle validation for address and network
    const wallet = await this.walletRepository.createWallet(
      address,
      network,
      userId,
      url,
    );
    return wallet;
  }
  async listWallet(userId: string) {
    const wallets = await this.walletRepository.find({ userId });
    return wallets;
  }
  async deleteAddress(id: string) {
    const deleted = await this.walletRepository.deleteOne(id);
    return { isDeleted: deleted.affected === 1 };
  }
}
