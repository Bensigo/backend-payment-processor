import { HttpException, HttpStatus } from '@nestjs/common';

export class NoActiveOrWalletError extends HttpException {
  name = 'NO_ACTIVE_OR_WALLET_FOUND';
  constructor() {
    super('No active or wallet found', HttpStatus.BAD_REQUEST);
  }
}
