import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from '../auth/auth.service';
import { JwtToken } from '../../type/index';
import { authError } from '../../common/constants/errors';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private readonly authService: AuthService,
      private readonly configService: ConfigService
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
      throw new ForbiddenException(authError.INVALID_TOKEN);
    }
    
    return user;
  }
}
