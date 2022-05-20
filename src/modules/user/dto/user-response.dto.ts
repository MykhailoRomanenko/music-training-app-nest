import { Types } from 'mongoose';

export class UserResponseDto {
  login: string;
  name: string;
  role: string;
  _id: Types.ObjectId;
}
