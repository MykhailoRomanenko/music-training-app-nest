import { Injectable } from '@nestjs/common';
import { CreateScaleDto } from './dto/create-scale.dto';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Scale } from './entities/scale.entity';
import {
  compareDegreeStrings,
  degreeToSemitones,
} from '../../common/utils/degree-utils';
import EntityAlreadyExistsError from '../../common/errors/entity-already-exists.error';

@Injectable()
export class ScaleService {
  constructor(
    @InjectModel(Scale)
    private readonly scaleModel: ReturnModelType<typeof Scale>,
  ) {}

  async create(createScaleDto: CreateScaleDto) {
    if (!createScaleDto.degrees.includes('1')) {
      createScaleDto.degrees.unshift('1');
    }
    createScaleDto.degrees.sort(compareDegreeStrings);

    const existingScale = await this.scaleModel.findOne({
      degrees: createScaleDto.degrees,
    });
    if (existingScale) {
      throw new EntityAlreadyExistsError(
        `Such scale already exists. It's name is: ${existingScale.name}`,
      );
    }
    return this.scaleModel.create({
      ...createScaleDto,
      semitones: createScaleDto.degrees.map(degreeToSemitones),
    });
  }

  async findAll(): Promise<Scale[]> {
    return this.scaleModel.find().sort({ name: 'asc' }).lean();
  }

  findOne(id: string) {
    return this.scaleModel.findById(id);
  }

  remove(id: string) {
    return this.scaleModel.deleteOne({ _id: id });
  }
}
