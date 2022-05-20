import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreateGuitarChordDto,
  FingeringDto,
} from './dto/create-guitar-chord.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Chord, ChordDegree } from '../chord/entities/chord.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { Fingering, GuitarChord } from './entities/guitar-chord.entity';
import { EntityNotFoundError } from '../../common/errors';
import { ChordService } from '../chord/chord.service';
import { DefaultGuitarFretboard } from '../../common/models/guitar-fretboard';
import FingeringMismatchError from '../../common/errors/fingering-mismatch.error';
import { degreeToSemitones } from '../../common/utils/degree-utils';
import EntityAlreadyExistsError from '../../common/errors/entity-already-exists.error';

@Injectable()
export class GuitarChordService {
  constructor(
    @InjectModel(GuitarChord)
    private readonly guitarChordModel: ReturnModelType<typeof GuitarChord>,
    @Inject(forwardRef(() => ChordService))
    private readonly chordService: ChordService,
  ) {}

  async create(createGuitarChordDto: CreateGuitarChordDto) {
    const semitonesFromFrets: number[] = this.getSemitonesFromFingerings(
      createGuitarChordDto.fingerings,
    );
    // find chord by provided id
    const providedChord: Chord = await this.chordService.findOneById(
      createGuitarChordDto.chord,
    );
    const fingeringsWithDegrees: Fingering[] = [];
    // check if chord structure matches fingerings (chord fingerings are in C)
    providedChord.degrees.forEach((degree: ChordDegree) => {
      const degreeSemitones = degreeToSemitones(degree.d);
      // if a degree is required and is absent -> error
      if (!degree.omit && !semitonesFromFrets.includes(degreeSemitones)) {
        throw new FingeringMismatchError('Invalid fingerings.');
      }
      createGuitarChordDto.fingerings.forEach((f) => {
        if (
          degreeSemitones == DefaultGuitarFretboard.getNote(f.string, f.fret)
        ) {
          fingeringsWithDegrees.push({ ...f, degree: degree.d });
        }
      });
    });
    if (
      fingeringsWithDegrees.length !== createGuitarChordDto.fingerings.length
    ) {
      throw new FingeringMismatchError('Invalid fingerings.');
    }
    fingeringsWithDegrees.sort((f1, f2) => f1.string - f2.string);

    const existingGuitarChord = await this.guitarChordModel.findOne({
      fingerings: fingeringsWithDegrees,
    });

    if (
      existingGuitarChord &&
      existingGuitarChord.chord._id.equals(providedChord._id)
    ) {
      throw new EntityAlreadyExistsError(`This fingering already exists`);
    }

    return this.guitarChordModel.create({
      ...createGuitarChordDto,
      fingerings: fingeringsWithDegrees,
    });
  }

  async findAll(chord?: string) {
    const filter: any = {};
    if (chord) {
      filter.chord = chord;
    }
    return this.guitarChordModel.find(filter);
  }

  async findOne(id: string) {
    const res = await this.guitarChordModel.find({ _id: id });
    if (!res) {
      throw new EntityNotFoundError(
        `GuitarChord with id ${id} does not exist.`,
      );
    }
    return res;
  }

  remove(id: string) {
    return this.guitarChordModel.deleteOne({ _id: id });
  }

  removeByChordId(chord: string) {
    return this.guitarChordModel.deleteMany({ chord });
  }

  private getSemitonesFromFingerings(fingerings: FingeringDto[]): number[] {
    return fingerings.map((f: FingeringDto) =>
      DefaultGuitarFretboard.getNote(f.string, f.fret),
    );
  }
}
