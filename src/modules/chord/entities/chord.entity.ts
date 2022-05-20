import { prop } from '@typegoose/typegoose';
import { Types } from 'mongoose';

export class ChordDegree {
  @prop({ required: true })
  d: string;
  @prop()
  omit?: boolean;
}

export class Chord {
  _id: Types.ObjectId;

  @prop({ required: true, unique: true })
  name: string;

  @prop({ required: true, type: () => [Number] })
  semitones: number[];

  @prop({ required: true, type: () => ChordDegree, _id: false })
  degrees: ChordDegree[];
}
