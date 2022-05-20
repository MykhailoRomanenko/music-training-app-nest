import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsValidScaleDegreeList } from '../../../common/constraints/degrees.constraint';

export class CreateScaleDto {
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(11)
  @Validate(IsValidScaleDegreeList)
  degrees: string[];

  @IsString()
  @IsNotEmpty()
  name: string;
}
