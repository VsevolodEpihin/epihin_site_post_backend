import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.model';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { JwtAuthLocalGuard } from '../jwt/jwt-local.guard';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register (@Body() dto: CreateUserDto) {
    return this.authService.registerUsers(dto);
  }

  @UseGuards(JwtAuthLocalGuard)
  @Post('login')
  login(@Req() req: Request & { user: User }) {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('who-am-i')
  whoAmI(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
