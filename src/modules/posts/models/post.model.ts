import {
  Table,
  Column,
  Model,
  BelongsToMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

import { User } from '../../users/user.model';

import { Tag } from './tag.model';
import { TagPost } from './tagPost.model';

@Table({ tableName: 'Posts', timestamps: true, underscored: true })
export class Post extends Model<Post> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({ allowNull: false })
  title: string;

  @Column({ allowNull: false })
  text: string;

  @Column
  imageUrl: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Tag, () => TagPost)
  tags: Tag[];
}
