import { Module } from '@nestjs/common';
import { Post } from './modules/posts/models/post.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Post])],
  controllers: [],
  providers: [],
})
export class AppModule {}
