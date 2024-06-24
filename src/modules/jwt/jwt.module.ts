import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: configService.get<number>('JWT_EXPIRE') },
      }),
      inject: [ConfigService],
    })
  ],
  providers: [JwtService],
  exports: [JwtModule]
})
export class CustomJwtModule {}
