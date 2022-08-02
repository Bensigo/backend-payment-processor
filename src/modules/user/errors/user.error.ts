import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  public readonly name = 'USER.NOT_FOUND';
  constructor() {
    super('User not found', HttpStatus.NOT_FOUND);
  }
}
