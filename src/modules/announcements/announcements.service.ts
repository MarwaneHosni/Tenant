import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { AcknowledgeDto } from './dtos/acknowledge.dto';

@Injectable()
export class AnnouncementsService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CREATE ANNOUNCEMENT
  // -----------------------------
  async create(dto: CreateAnnouncementDto, user: any) {
    if (!['MANAGER', 'OWNER', 'ADMIN'].includes(user.userType)) {
      throw new ForbiddenException('Only MANAGER/OWNER/ADMIN can create announcements');
    }

    return this.prisma.announcement.create({
      data: {
        title: dto.title,
        content: dto.content,
        type: dto.type,
        requiresAcknowledgement: dto.requiresAcknowledgement ?? false,
        organizationId: user.organizationId,
        propertyId: dto.propertyId,
        createdBy: user.id,
        expiresAt: dto.expiresAt,
      },
    });
  }

  // -----------------------------
  // LIST ANNOUNCEMENTS
  // -----------------------------
  async getAll(user: any) {
    return this.prisma.announcement.findMany({
      where: {
        organizationId: user.organizationId,
        OR: [{ propertyId: null }, { propertyId: { not: null } }],
      },
      include: { acknowledgements: true },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async getById(id: string, user: any) {
    const ann = await this.prisma.announcement.findFirst({
      where: { id, organizationId: user.organizationId },
      include: { acknowledgements: true },
    });
    if (!ann) throw new NotFoundException('Announcement not found');
    return ann;
  }

  // -----------------------------
  // ACKNOWLEDGEMENTS
  // -----------------------------
  async acknowledge(dto: AcknowledgeDto, user: any) {
    const announcement = await this.prisma.announcement.findFirst({
      where: { id: dto.announcementId, organizationId: user.organizationId },
    });
    if (!announcement) throw new NotFoundException('Announcement not found');

    return this.prisma.acknowledgement.upsert({
      where: { announcementId_userId: { announcementId: dto.announcementId, userId: user.id } },
      update: { acknowledgedAt: new Date() },
      create: { announcementId: dto.announcementId, userId: user.id },
    });
  }
}
