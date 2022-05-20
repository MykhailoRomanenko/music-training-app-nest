import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  login: string;

  @IsString()
  @MinLength(1)
  @MaxLength(50)
  password: string;
}
