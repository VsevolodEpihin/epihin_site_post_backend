import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Post } from './post.model';
import { Tag } from './tag.model';

@Table({ tableName: 'TagPosts', timestamps: true, underscored: true })
export class TagPost extends Model<TagPost> {
  @ForeignKey(() => Post)
  @Column({
    unique: true,
  })
  postId: string;

  @ForeignKey(() => Tag)
  @Column({
    unique: true,
  })
  tagId: string;
}
