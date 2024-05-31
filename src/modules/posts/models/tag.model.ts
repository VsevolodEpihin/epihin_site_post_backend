import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';

import { TagPost } from './tagPost.model';
import { Post } from './post.model';

@Table({ tableName: 'Tags', timestamps: true, underscored: true })
export class Tag extends Model<Tag> {
  @Column({
    allowNull: false,
    unique: true,
  })
  text: string;

  @BelongsToMany(() => Post, () => TagPost)
  posts: Post[];
}
