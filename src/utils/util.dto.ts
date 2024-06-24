import { TransformFnParams } from 'class-transformer';

export const createTransformParams = ({ value }: TransformFnParams) =>
  value.trim();
