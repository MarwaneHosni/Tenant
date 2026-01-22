import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { CreateAuditDto } from './dtos/create-audit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('audit')
export class AuditController {
  constructor(private readonly service: AuditService) {}

  @Post()
  create(@Body() dto: CreateAuditDto, @Req() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  getAll(@Req() req) {
    return this.service.getAll(req.user);
  }

  @Get(':entityType/:entityId')
  getByEntity(@Param('entityType') entityType: string, @Param('entityId') entityId: string, @Req() req) {
    return this.service.getByEntity(entityType, entityId, req.user);
  }
}
