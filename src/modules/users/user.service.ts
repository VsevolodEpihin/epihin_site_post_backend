import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';

import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async removePassword(user: User) {
    const userWithoutPassword = await this.userRepository.findOne({
      where: { id: user.id },
      attributes: ["id","email","login","imageUrl"],
    });
    return userWithoutPassword.dataValues;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async hasPassword(password: string) {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    return await bcrypt.hash(password, saltRounds);
  }

  async createUser(dto: CreateUserDto, token: string) {
    dto.password = await this.hasPassword(dto.password);
    const user = await this.userRepository.create(dto);
    const userWithoutPassword = await this.removePassword(user.dataValues);
    return {
      user: userWithoutPassword,
      token,
    }
  }
}
