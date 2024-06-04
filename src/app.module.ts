import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Post } from './modules/posts/models/post.model';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [],
  providers: [],
})
export class AppModule {}
