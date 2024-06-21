import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

import { createTransformParams } from '../../../utils/util.dto';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @Transform(createTransformParams)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Transform(createTransformParams)
  password: string;
}
