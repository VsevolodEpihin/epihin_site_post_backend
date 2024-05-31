import { Column, HasMany, Model, Table } from 'sequelize-typescript';

import { Post } from '../posts/models/post.model';

@Table({ tableName: 'Users', timestamps: true, underscored: true })
export class User extends Model<User> {
  @Column({ allowNull: false })
  login: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column
  imageUrl: string;

  @HasMany(() => Post)
  posts: Post[];
}
