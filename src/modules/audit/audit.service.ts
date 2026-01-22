import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateAuditDto } from './dtos/create-audit.dto';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CREATE LOG
  // -----------------------------
  async create(dto: CreateAuditDto, user: any) {
    return this.prisma.auditLog.create({
      data: {
        userId: user.id,
        organizationId: user.organizationId,
        entityType: dto.entityType,
        entityId: dto.entityId,
        action: dto.action,
        oldValues: dto.oldValues ?? null,
        newValues: dto.newValues ?? null,
        ipAddress: dto.ipAddress ?? '',
      },
    });
  }

  // -----------------------------
  // FETCH LOGS
  // -----------------------------
  async getAll(user: any) {
    return this.prisma.auditLog.findMany({
      where: { organizationId: user.organizationId },
      orderBy: { timestamp: 'desc' },
    });
  }

  async getByEntity(entityType: string, entityId: string, user: any) {
    return this.prisma.auditLog.findMany({
      where: { organizationId: user.organizationId, entityType, entityId },
      orderBy: { timestamp: 'desc' },
    });
  }
}
