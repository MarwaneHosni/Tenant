import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LeasesService } from './leases.service';
import { CreateLeaseDto } from './dtos/create-lease.dto';
import { UpdateLeaseDto } from './dtos/update-lease.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Post()
  create(@Body() dto: CreateLeaseDto, @Req() req) {
    return this.leasesService.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.leasesService.findAll(req.user);
  }

  @Get(':id')
  findById(@Param('id') id: string, @Req() req) {
    return this.leasesService.findById(id, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLeaseDto, @Req() req) {
    return this.leasesService.update(id, dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.leasesService.delete(id, req.user);
  }
}
