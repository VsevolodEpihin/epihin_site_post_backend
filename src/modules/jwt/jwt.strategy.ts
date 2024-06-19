import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthError } from '../../common/constants/errors';
import { UserLoginDto } from '../auth/dto/user-login.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserLoginDto) {
    const user = await this.usersService.findUserByEmail(payload.email);
    if (!user) throw new BadRequestException(AuthError.WRONG_DATA);
    return user;
  }
}
