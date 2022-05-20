import { prop, Ref } from '@typegoose/typegoose';
import { Max, Min, MinLength } from 'class-validator';
import { Chord } from '../../chord/entities/chord.entity';

export class Fingering {
  @prop({ required: true })
  @Min(1)
  @Max(6)
  string: number;

  @prop({ required: true })
  @Min(0)
  @Max(22)
  fret: number;

  @prop({ required: true })
  degree: string;
}

export class GuitarChord {
  @prop({ required: true, type: () => Fingering, _id: false, unique: true })
  @MinLength(3)
  fingerings: Fingering[];

  @prop({ required: true, ref: () => Chord })
  chord: Ref<Chord>;
}
