import { prop } from '@typegoose/typegoose';

export class Scale {
  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true })
  degrees: string[];

  @prop({ required: true, type: () => [Number] })
  semitones: number[];
}
