import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth/auth.service';
import { JwtToken } from '../../type/index';
import { AuthError } from '../../common/constants/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly authService: AuthService,
      configService: ConfigService
    ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtToken) {
    const user = await this.authService.findUserById(payload.id);
    if (user === null) {
      throw new BadRequestException(AuthError.INVALID_TOKEN);
    }
    return user;
  }
}
