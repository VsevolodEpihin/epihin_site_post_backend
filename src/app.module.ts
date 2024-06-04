import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Post } from './modules/posts/models/post.model';
import { PostsModule } from './modules/posts/posts.module';
import { User } from './modules/users/user.model';
import { TagPost } from './modules/posts/models/tagPost.model';
import { Tag } from './modules/posts/models/tag.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: config.get('DB_DIALECT'),
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        models: [Post, User, TagPost, Tag],
      }),
    }),
    PostsModule,
  ],
})
export class AppModule {}
