import { Body, Controller, Get, Post, Headers, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';

import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user-login.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { LocalStrategy } from '../jwt/jwt.local.strategy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register (@Body() dto: CreateUserDto) {
    console.log(1)
    return this.authService.registerUsers(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginDto) {
    return this.authService.loginUser(dto);
  }

  @Get('whoAmI')
  whoAmI(@Headers('Authorization') token: string) {
    token = token.replace('Bearer ', '');
    return this.authService.getUserFromToken(token);
  }
}
