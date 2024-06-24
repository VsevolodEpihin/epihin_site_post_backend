import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';

import { JwtStrategy } from '../jwt/jwt.strategy';
import { User } from '../users/user.model';
import { LocalStrategy } from '../jwt/jwt.local.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  imports: [
    PassportModule.register({}),
    SequelizeModule.forFeature([User])
  ],
  exports:[AuthService]
})
export class AuthModule {}
