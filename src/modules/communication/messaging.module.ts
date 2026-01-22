import { Module } from '@nestjs/common';
import { MessagingService } from './message.service';
import { MessagingController } from './message.controller';
import { PrismaService } from '../../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
  controllers: [MessagingController],
  providers: [MessagingService, PrismaService, JwtAuthGuard, RolesGuard],
})
export class MessagingModule {}
