import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/user/repository/user.repository';
import { AUTH_SECRET } from '@modules/user/strategies/jwt.strategy';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async createUser(address: string): Promise<{ token: string }> {
    // check if user address exist
    const existingUser = await this.userRepository.findUserByAddress(address);
    if (existingUser) {
      const token = await this.setUserToken(existingUser);
      return { token };
    }
    // else create new user and return user token
    const user = await this.userRepository.createUser(address);
    const token = await this.setUserToken(user);
    return { token };
  }
  async getUserByAddress(address: string) {
    return this.userRepository.findUserByAddress(address);
  }
  // type user to interface
  async setUserToken(user: any) {
    return this.jwtService.sign({ ...user });
  }
  async decodeToken(token: string) {
    return this.jwtService.verify(token, { secret: AUTH_SECRET });
  }

  async updateUserProfile(payload: any, id: string) {
    return this.userRepository.updateUserProfile(payload, id);
  }
}
