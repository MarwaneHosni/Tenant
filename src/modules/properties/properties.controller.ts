import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  create(@Body() dto: CreatePropertyDto, @Req() req) {
    return this.propertiesService.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.propertiesService.findAll(req.user);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Req() req) {
    return this.propertiesService.findById(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePropertyDto, @Req() req) {
    return this.propertiesService.update(id, dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.propertiesService.delete(id, req.user);
  }
}
