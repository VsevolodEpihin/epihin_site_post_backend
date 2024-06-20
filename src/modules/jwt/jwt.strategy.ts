import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthError } from '../../common/constants/errors';
import { AuthService } from '../auth/auth.service';
import { JwtToken } from '../../type/index';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService:AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_EXPIRE,
    });
  }

  async validate({ id }: JwtToken) {
    const user = await this.authService.findUserById(id);
    console.log(user+'1')
    if (!user) throw new BadRequestException(AuthError.WRONG_DATA);
    return user;
  }
}
