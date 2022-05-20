import { Module } from '@nestjs/common';
import { GuitarChordService } from './guitar-chord.service';
import { GuitarChordController } from './guitar-chord.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { GuitarChord } from './entities/guitar-chord.entity';
import { ChordService } from '../chord/chord.service';
import { Chord } from '../chord/entities/chord.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([GuitarChord]),
    TypegooseModule.forFeature([Chord]),
  ],
  controllers: [GuitarChordController],
  providers: [GuitarChordService, ChordService],
  exports: [GuitarChordService],
})
export class GuitarChordModule {}
