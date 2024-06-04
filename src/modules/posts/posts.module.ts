import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { Post } from './models/post.model';

@Module({
  providers: [PostsService],
  controllers: [PostController],
  imports: [SequelizeModule.forFeature([Post])],
})
export class PostsModule {}
