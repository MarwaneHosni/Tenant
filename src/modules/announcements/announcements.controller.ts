import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { AcknowledgeDto } from './dtos/acknowledge.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Post()
  create(@Body() dto: CreateAnnouncementDto, @Req() req) {
    return this.service.create(dto, req.user);
  }

  @Get()
  getAll(@Req() req) {
    return this.service.getAll(req.user);
  }

  @Get(':id')
  getById(@Param('id') id: string, @Req() req) {
    return this.service.getById(id, req.user);
  }

  @Post('acknowledge')
  acknowledge(@Body() dto: AcknowledgeDto, @Req() req) {
    return this.service.acknowledge(dto, req.user);
  }
}
