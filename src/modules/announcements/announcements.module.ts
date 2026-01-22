import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, PrismaService, JwtAuthGuard, RolesGuard],
})
export class AnnouncementsModule {}
