import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GuitarChordService } from './guitar-chord.service';
import { CreateGuitarChordDto } from './dto/create-guitar-chord.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/admin.guard';
import { FindByIdParams } from '../../common/dto/find-by-id.dto';
import { FindByChordParams } from '../../common/dto/find-by-chord.dto';

@Controller('guitar-chords')
export class GuitarChordController {
  constructor(private readonly guitarChordService: GuitarChordService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  create(@Body() createGuitarChordDto: CreateGuitarChordDto) {
    return this.guitarChordService.create(createGuitarChordDto);
  }

  @Get()
  findAll(@Query() chordParams: FindByChordParams) {
    return this.guitarChordService.findAll(chordParams.chord);
  }

  @Get(':id')
  findOne(@Param() params: FindByIdParams) {
    return this.guitarChordService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param() params: FindByIdParams) {
    return this.guitarChordService.remove(params.id);
  }
}
