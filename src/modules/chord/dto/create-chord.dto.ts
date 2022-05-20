import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsValidChordDegreeList } from '../../../common/constraints/degrees.constraint';

export class ChordDegreeDto {
  @IsString()
  d: string;

  @IsOptional()
  @IsBoolean()
  omit?: boolean;
}

export class CreateChordDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayMinSize(2)
  @ArrayMaxSize(11)
  @ValidateNested({ each: true })
  @Type(() => ChordDegreeDto)
  @Validate(IsValidChordDegreeList)
  degrees: ChordDegreeDto[];
}
