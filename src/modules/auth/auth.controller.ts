import { Body, Controller, Get, Post, Headers } from "@nestjs/common";

import { CreateUserDto } from "../users/dto/create-user.dto";

import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register (@Body() dto: CreateUserDto) {
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
