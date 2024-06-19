import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthError } from '../../common/constants/errors';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async registerUsers(dto: CreateUserDto) {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if (existUser) throw new BadRequestException(AuthError.USER_EXIST);
    const payload = { email: dto.email};
    const token = this.jwtService.sign(payload);
    const result = await this.userService.createUser(dto, token);
    return result;
  }

  async loginUser(dto: UserLoginDto) {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if(!existUser) throw new BadRequestException(AuthError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(dto.password,existUser.password);
    if(!validatePassword) throw new BadRequestException(AuthError.WRONG_DATA);
    const payload = { email: dto.email};
    const token = this.jwtService.sign(payload);
    const userWithoutPassword = await this.userService.removePassword(existUser);
    return {
      user: userWithoutPassword,
      token: token,
    };
  }

  async getUserFromToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      const user = await this.userService.findUserByEmail(decoded.email);
      if(!user) throw new BadRequestException(AuthError.USER_NOT_EXIST);
      const userWithoutPassword = await this.userService.removePassword(user);
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException(AuthError.INVALID_TOKEN);
    }
  }
}
