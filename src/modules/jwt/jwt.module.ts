import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';


import { JwtStrategy } from './jwt.strategy';
import { AuthModule } from '../auth/auth.module';


@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<number>('JWT_EXPIRE') },
      }),
      inject: [ConfigService]
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy]
})
export class CustomJwtModule {}
