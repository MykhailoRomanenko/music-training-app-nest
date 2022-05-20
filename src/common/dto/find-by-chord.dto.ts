import { IsOptional, IsString, Matches } from 'class-validator';
import { ObjectIdPattern } from '../regex';

export class FindByChordParams {
  @IsOptional()
  @IsString()
  @Matches(ObjectIdPattern, '', {
    message: 'chord must be a MongoDB ObjectID string.',
  })
  chord?: string;
}
