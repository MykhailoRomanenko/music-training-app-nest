import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateChordDto } from './dto/create-chord.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Chord, ChordDegree } from './entities/chord.entity';
import { EntityNotFoundError } from '../../common/errors';
import {
  compareDegreeStrings,
  degreeToSemitones,
} from '../../common/utils/degree-utils';
import { GuitarChordService } from '../guitar-chord/guitar-chord.service';
import EntityAlreadyExistsError from '../../common/errors/entity-already-exists.error';

@Injectable()
export class ChordService {
  constructor(
    @InjectModel(Chord)
    private readonly chordModel: ReturnModelType<typeof Chord>,
    @Inject(forwardRef(() => GuitarChordService))
    private readonly guitarChordService: GuitarChordService,
  ) {}

  async create(createChordDto: CreateChordDto) {
    if (!createChordDto.degrees.find((d) => d.d === '1')) {
      createChordDto.degrees.unshift({ d: '1' }); // add 1st degree if it's absent, as 1 degree must always be present
    }
    // find if same chord exists
    const existingChord = await this.findOneByDegrees(createChordDto.degrees);
    if (existingChord) {
      throw new EntityAlreadyExistsError(
        `Chord already exists. It's name is: ${existingChord.name}`,
      );
    }
    // sort the array for uniform look
    createChordDto.degrees.sort((dto1, dto2) =>
      compareDegreeStrings(dto1.d, dto2.d),
    );
    // add array of semitones for more efficient search
    const semitones: number[] = createChordDto.degrees.map((d) =>
      degreeToSemitones(d.d),
    );
    semitones.sort((s1, s2) => s1 - s2); // sort it, as degrees aren't necessarily ordered by semitones

    return this.chordModel.create({
      ...createChordDto,
      semitones,
    });
  }

  findOneByDegrees(degrees: ChordDegree[]) {
    const andInput: any[] = [];

    degrees.forEach((d: ChordDegree) => {
      andInput.push({ degrees: { $elemMatch: { d: d.d } } });
    });
    andInput.push({ degrees: { $size: degrees.length } });

    return this.chordModel.findOne().and(andInput);
  }

  findAll() {
    return this.chordModel.find().sort({ name: 'asc' });
  }

  async findOneById(id: string) {
    const res = await this.chordModel.findOne({ _id: id });
    if (!res) {
      throw new EntityNotFoundError(`Chord with id ${id} not found.`);
    }
    return res;
  }

  async remove(id: string) {
    const chordDeletionRes = await this.chordModel.deleteOne({ _id: id });
    await this.guitarChordService.removeByChordId(id);
    return chordDeletionRes;
  }

  async findOneByName(name: string) {
    const res = await this.chordModel.findOne({ name: name });
    if (!res) {
      throw new EntityNotFoundError(`Chord with name "${name}" not found.`);
    }
    return res;
  }
}
