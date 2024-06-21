import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';

import { User } from '../users/user.model';
import { authError } from '../../common/constants/errors';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async findUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: ['id','email','login','imageUrl'],
    });
    return user;
  }

  removePassword(user: User) {
    return {
      id: user.id,
      email: user.email,
      login: user.login,
      imageUrl: user.imageUrl,
    };
  }

  async hashPassword(password: string) {
    const saltRounds = Number(this.configService.get('SALT_ROUNDS'));
    return await bcrypt.hash(password, saltRounds);
  }

  async generateToken(id: number) {
    return await this.jwtService.signAsync({ id });
  }

  async registerUsers(dto: CreateUserDto) {
    const existUser = await this.userRepository.findOne({ where: { email: dto.email } });
    if (existUser !== null) throw new BadRequestException(authError.USER_EXIST);
    dto.password = await this.hashPassword(dto.password);
    const user = await this.userRepository.create(dto);
    const userWithoutPassword = this.removePassword(user);
    const token = await this.generateToken(user.id);
    return {
      user: userWithoutPassword,
      token,
    }
  }

  async loginUser(user: User) {
    return {
      user,
      token: await this.generateToken(user.id),
    };
  }

  async validateUser(email: string, password: string) {
    const existUser = await this.userRepository.findOne({ where: { email } });
    if (existUser === null) throw new BadRequestException(authError.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(password, existUser.password);
    if (!validatePassword) throw new BadRequestException(authError.WRONG_DATA);
    const userWithoutPassword = this.removePassword(existUser); 
    return userWithoutPassword;
  }
}
