import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserService } from './user.service';
import { User } from './user.model';
import { UserController } from './users.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [SequelizeModule.forFeature([User])],
})
export class UserModule {}
