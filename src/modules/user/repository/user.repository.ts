import { Inject, Injectable } from '@nestjs/common';
import { USER_PROVIDER } from '@modules/user/user.provider';
import { Repository } from 'typeorm';
import { UserEntity } from '@modules/user/entities/user.entity';
import { UserNotFoundError } from '@modules/user/errors/user.error';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_PROVIDER)
    private userEntity: Repository<UserEntity>,
  ) {}

  createUser(address: string) {
    const user = this.userEntity.create({
      address,
      isVerified: false,
    });
    return this.userEntity.save(user);
  }
  findUserByAddress(address: string) {
    return this.userEntity.findOne({ where: { address } });
  }
  async updateUserProfile(payload: any, id: string) {
    const user = await this.userEntity.findOne({ id });
    if (!user) {
      throw new UserNotFoundError();
    }

    if (payload.username) {
      user.username = payload.username;
    }
    if (payload.industry){
      user.industry = payload.industry;
    }
    if (payload.country) {
      user.country = payload.country;
    }
    if (payload.description) {
      user.description = payload.description;
    }

    return this.userEntity.save(user);
  }
  async verifyUser(id: string) {
    const user = await this.userEntity.findOne({ id });
    if (!user) {
      throw new UserNotFoundError();
    }
    user.isVerified = true;
    return this.userEntity.save(user);
  }
}
