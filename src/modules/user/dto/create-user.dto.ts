import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../types';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  login: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  password: string;

  @IsString()
  @IsEnum(Role)
  role: Role;

  @IsString()
  @IsNotEmpty()
  name: string;
}
