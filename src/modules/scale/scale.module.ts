import { Module } from '@nestjs/common';
import { ScaleService } from './scale.service';
import { ScaleController } from './scale.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Scale } from './entities/scale.entity';

@Module({
  imports: [TypegooseModule.forFeature([Scale])],
  controllers: [ScaleController],
  providers: [ScaleService],
})
export class ScaleModule {}
