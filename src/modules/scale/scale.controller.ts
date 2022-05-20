import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScaleService } from './scale.service';
import { CreateScaleDto } from './dto/create-scale.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/admin.guard';
import { FindByIdParams } from '../../common/dto/find-by-id.dto';

@Controller('scales')
export class ScaleController {
  constructor(private readonly scaleService: ScaleService) {}

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Post()
  create(@Body() createScaleDto: CreateScaleDto) {
    return this.scaleService.create(createScaleDto);
  }

  @Get()
  findAll() {
    return this.scaleService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindByIdParams) {
    return this.scaleService.findOne(params.id);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Delete(':id')
  remove(@Param() params: FindByIdParams) {
    return this.scaleService.remove(params.id);
  }
}
