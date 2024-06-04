import { Controller, Get } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getAll() {
    return this.postsService.getAllPosts();
  }
}
