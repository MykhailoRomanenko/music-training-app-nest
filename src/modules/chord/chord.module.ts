import { Module } from '@nestjs/common';
import { ChordService } from './chord.service';
import { ChordController } from './chord.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Chord } from './entities/chord.entity';
import { GuitarChordModule } from '../guitar-chord/guitar-chord.module';
import { GuitarChordService } from '../guitar-chord/guitar-chord.service';
import { GuitarChord } from '../guitar-chord/entities/guitar-chord.entity';

@Module({
  imports: [
    TypegooseModule.forFeature([Chord, GuitarChord]),
    GuitarChordModule,
  ],
  controllers: [ChordController],
  providers: [ChordService, GuitarChordService],
  exports: [ChordService],
})
export class ChordModule {}
