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
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceRequestDto } from './dtos/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dtos/update-maintenance-request.dto';
import { AssignMaintenanceDto } from './dtos/assign-maintenance.dto';
import { AddMaintenanceUpdateDto } from './dtos/add-maintenance-update.dto';
import { UpdateSlaDto } from './dtos/update-sla.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly service: MaintenanceService) {}

  // -----------------------------
  // REQUEST
  // -----------------------------
  @Post('request')
  createRequest(@Body() dto: CreateMaintenanceRequestDto, @Req() req) {
    return this.service.createRequest(dto, req.user);
  }

  @Get('request')
  findAll(@Req() req) {
    return this.service.findAll(req.user);
  }

  @Get('request/:id')
  findById(@Param('id') id: string, @Req() req) {
    return this.service.findById(id, req.user);
  }

  @Patch('request/:id')
  updateRequest(@Param('id') id: string, @Body() dto: UpdateMaintenanceRequestDto, @Req() req) {
    return this.service.updateRequest(id, dto, req.user);
  }

  @Delete('request/:id')
  deleteRequest(@Param('id') id: string, @Req() req) {
    return this.service.deleteRequest(id, req.user);
  }

  // -----------------------------
  // ASSIGNMENT
  // -----------------------------
  @Post('assign')
  assignRequest(@Body() dto: AssignMaintenanceDto, @Req() req) {
    return this.service.assignRequest(dto, req.user);
  }

  // -----------------------------
  // UPDATES
  // -----------------------------
  @Post('update')
  addUpdate(@Body() dto: AddMaintenanceUpdateDto, @Req() req) {
    return this.service.addUpdate(dto, req.user);
  }

  // -----------------------------
  // SLA
  // -----------------------------
  @Patch('sla/:id')
  updateSla(@Param('id') id: string, @Body() dto: UpdateSlaDto, @Req() req) {
    return this.service.updateSla(id, dto, req.user);
  }
}
