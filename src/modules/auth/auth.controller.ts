import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/user.model';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register (@Body() dto: CreateUserDto) {
    return this.authService.registerUsers(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request & { user: User }) {
    return this.authService.loginUser(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('who-am-i')
  whoAmI(@Req() req: Request & { user: User }) {
    return req.user;
  }
}
