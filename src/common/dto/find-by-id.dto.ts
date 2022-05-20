import { IsString, Matches } from 'class-validator';
import { ObjectIdPattern } from '../regex';

export class FindByIdParams {
  @IsString()
  @Matches(ObjectIdPattern, '', {
    message: 'id must be a MongoDB ObjectID string.',
  })
  id: string;
}
