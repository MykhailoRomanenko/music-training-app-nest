import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { Role } from '../types';

export class User {
  _id: Types.ObjectId;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  login: string;

  @prop({ required: true })
  hash: string;

  @prop({ required: true })
  role: Role;
}
