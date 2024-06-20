import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../users/user.model';
import { AuthError } from '../../common/constants/errors';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService
  ) {}

  async findUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      attributes: ['id','email','login','imageUrl'],
    });
  }

  async removePassword(user: User) {
    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: user.id },
      attributes: ['id','email','login','imageUrl'],
    });
    return userWithoutPassword.dataValues;
  }

  async hashPassword(password: string) {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(dto: CreateUserDto, token: string) {
    dto.password = await this.hashPassword(dto.password);
    const user = await this.userRepository.create(dto);
    const userWithoutPassword = await this.removePassword(user.dataValues);
    return {
      user: userWithoutPassword,
      token,
    }
  }
  async registerUsers(dto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { email: dto.email } })
    if (existUser) throw new BadRequestException(AuthError.USER_EXIST);
    const payload = { email: dto.email};
    const token = await this.jwtService.signAsync(payload);
    const result = await this.createUser(dto, token);

    return result;
  }

  async loginUser(dto: UserLoginDto) {
    const existUser = await this.userRepository.findOne({ where: { email: dto.email } })
    if(!existUser) throw new BadRequestException(AuthError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(dto.password,existUser.password);
    if(!validatePassword) throw new BadRequestException(AuthError.WRONG_DATA);
    const payload = { email: dto.email};
    const token = this.jwtService.sign(payload);
    const userWithoutPassword = await this.removePassword(existUser);
    return {
      user: userWithoutPassword,
      token: token,
    };
  }

  async getUserFromToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      const existUser = await this.userRepository.findOne({ where: { email: decoded.email } })
      if(!existUser) throw new BadRequestException(AuthError.USER_NOT_EXIST);
      const userWithoutPassword = await this.removePassword(existUser);
      return userWithoutPassword;
    } catch (error) {
      throw new BadRequestException(AuthError.INVALID_TOKEN);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } })
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
