import { Transform } from 'class-transformer';
import {IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { createTransformParams } from '../../../utils/util.dto';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Transform(createTransformParams)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(createTransformParams)
  login: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Transform(createTransformParams)
  password: string;
}
