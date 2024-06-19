import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { CustomJwtModule } from '../jwt/jwt.module'
import { UserModule } from '../users/user.module';
import { JwtStrategy } from '../jwt/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    CustomJwtModule,
    PassportModule,
  ],
  exports:[AuthService]
})
export class AuthModule {}
