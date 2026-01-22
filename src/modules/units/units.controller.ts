import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('properties/:propertyId/units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  create(@Param('propertyId') propertyId: string, @Body() dto: CreateUnitDto, @Req() req) {
    return this.unitsService.create(propertyId, dto, req.user);
  }

  @Get()
  findAll(@Param('propertyId') propertyId: string, @Req() req) {
    return this.unitsService.findAll(propertyId, req.user);
  }

  @Get('/:id')
  findById(@Param('id') id: string, @Req() req) {
    return this.unitsService.findById(id, req.user);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() dto: UpdateUnitDto, @Req() req) {
    return this.unitsService.update(id, dto, req.user);
  }

  @Delete('/:id')
  delete(@Param('id') id: string, @Req() req) {
    return this.unitsService.delete(id, req.user);
  }
}
