import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@modules/user/services/user.service';
import { UserNotFoundError } from '@modules/user/errors/user.error';
import { Injectable } from '@nestjs/common';

export const AUTH_SECRET = process.env.secret || 'gdvhgjkslkcjhsjgfjhkjslf';

// @Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_SECRET,
    });
  }
  async validate(payload: any) {
    // const user = await this.userService.getUserByAddress(payload?.address);
    // console.log({ user });
    // if (!user) {
    //   throw new UserNotFoundError();
    // }
    return payload;
  }
}
