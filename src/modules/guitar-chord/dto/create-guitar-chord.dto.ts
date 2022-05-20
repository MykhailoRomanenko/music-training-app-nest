import {
  ArrayMaxSize,
  ArrayMinSize,
  IsInt,
  IsString,
  Matches,
  Max,
  Min,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ObjectIdPattern } from '../../../common/regex';
import { IsValidFingering } from '../../../common/constraints/fingerings.contraint';
import { Type } from 'class-transformer';

export class FingeringDto {
  @IsInt()
  @Min(1)
  @Max(6)
  string: number;

  @IsInt()
  @Min(0) // 0 for open
  @Max(22)
  fret: number;
}

export class CreateGuitarChordDto {
  @ValidateNested({ each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(6)
  @Validate(IsValidFingering)
  @Type(() => FingeringDto)
  fingerings: FingeringDto[];

  @IsString()
  @Matches(ObjectIdPattern, '', { message: 'chord must be a valid ObjectID' })
  chord: string;
}
