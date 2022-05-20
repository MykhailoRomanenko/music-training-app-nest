import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ChordService } from './chord.service';
import { CreateChordDto } from './dto/create-chord.dto';
import { FindByIdParams } from '../../common/dto/find-by-id.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/admin.guard';

@Controller('chords')
export class ChordController {
  constructor(private readonly chordService: ChordService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  create(@Body() createChordDto: CreateChordDto) {
    return this.chordService.create(createChordDto);
  }

  @Get()
  findAll() {
    return this.chordService.findAll();
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.chordService.findOneByName(name);
  }

  @Get(':id')
  findOneById(@Param() params: FindByIdParams) {
    return this.chordService.findOneById(params.id);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param() params: FindByIdParams) {
    return this.chordService.remove(params.id);
  }
}
