import { InjectModel } from '@nestjs/sequelize';

import { User } from '../users/user.model';

import { Post } from './models/post.model';
import { Tag } from './models/tag.model';

export class PostsService {
  constructor(@InjectModel(Post) private postsRepository: typeof Post) {}
  getAllPosts() {
    return this.postsRepository.findAll({
      order: [['id', 'ASC']],
      attributes: ['id', 'title', 'text', 'imageUrl'],
      include: [
        {
          model: User,
          attributes: ['id', 'login', 'email', 'imageUrl'],
        },
        { model: Tag, through: { attributes: [] }, attributes: ['text', 'id'] },
      ],
    });
  }
}
