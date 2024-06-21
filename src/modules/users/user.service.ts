import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}
}
