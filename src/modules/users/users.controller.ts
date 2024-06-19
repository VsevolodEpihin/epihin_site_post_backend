import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @Post('create-user')
  createUser(@Body() dto: CreateUserDto, token: string) {
    return this.userService.createUser(dto, token);
  }
}
