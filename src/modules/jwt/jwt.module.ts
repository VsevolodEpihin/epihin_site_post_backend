import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { UserModule } from "../users/user.module";

import { JwtStrategy } from "./jwt.strategy";

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>('JWT_EXPIRE')
        }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule]
})
export class CustomJwtModule {}
