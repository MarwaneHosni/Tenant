import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateMaintenanceRequestDto } from './dtos/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dtos/update-maintenance-request.dto';
import { AssignMaintenanceDto } from './dtos/assign-maintenance.dto';
import { AddMaintenanceUpdateDto } from './dtos/add-maintenance-update.dto';
import { UpdateSlaDto } from './dtos/update-sla.dto';

@Injectable()
export class MaintenanceService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // REQUEST
  // -----------------------------
  async createRequest(dto: CreateMaintenanceRequestDto, user: any) {
    if (user.userType !== 'TENANT') {
      throw new ForbiddenException('Only tenants can create maintenance requests');
    }

    const unit = await this.prisma.unit.findFirst({
      where: { id: dto.unitId, property: { organizationId: user.organizationId } },
    });
    if (!unit) throw new NotFoundException('Unit not found');

    return this.prisma.maintenanceRequest.create({
      data: {
        unitId: dto.unitId,
        tenantId: user.id,
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
      },
    });
  }

  async findAll(user: any) {
    return this.prisma.maintenanceRequest.findMany({
      where: { unit: { property: { organizationId: user.organizationId } } },
      include: { assignment: true, updates: true, slaRecord: true },
    });
  }

  async findById(id: string, user: any) {
    const req = await this.prisma.maintenanceRequest.findFirst({
      where: { id, unit: { property: { organizationId: user.organizationId } } },
      include: { assignment: true, updates: true, slaRecord: true },
    });
    if (!req) throw new NotFoundException('Maintenance request not found');
    return req;
  }

  async updateRequest(id: string, dto: UpdateMaintenanceRequestDto, user: any) {
    const req = await this.prisma.maintenanceRequest.findFirst({
      where: { id, tenantId: user.id },
    });
    if (!req) throw new NotFoundException('Request not found');

    return this.prisma.maintenanceRequest.update({ where: { id }, data: dto });
  }

  async deleteRequest(id: string, user: any) {
    const req = await this.prisma.maintenanceRequest.findFirst({
      where: { id, tenantId: user.id },
    });
    if (!req) throw new NotFoundException('Request not found');

    return this.prisma.maintenanceRequest.delete({ where: { id } });
  }

  // -----------------------------
  // ASSIGNMENT
  // -----------------------------
  async assignRequest(dto: AssignMaintenanceDto, user: any) {
    const request = await this.prisma.maintenanceRequest.findFirst({
      where: { id: dto.requestId, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!request) throw new NotFoundException('Request not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Only OWNER/MANAGER can assign');
    }

    return this.prisma.maintenanceAssignment.create({
      data: {
        requestId: dto.requestId,
        technicianId: dto.technicianId,
        assignedBy: user.id,
        notes: dto.notes,
      },
    });
  }

  // -----------------------------
  // UPDATES
  // -----------------------------
  async addUpdate(dto: AddMaintenanceUpdateDto, user: any) {
    const request = await this.prisma.maintenanceRequest.findFirst({
      where: { id: dto.requestId, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!request) throw new NotFoundException('Request not found');

    return this.prisma.maintenanceUpdate.create({
      data: {
        requestId: dto.requestId,
        updatedBy: user.id,
        updateText: dto.updateText,
        attachmentUrls: dto.attachmentUrls,
      },
    });
  }

  // -----------------------------
  // SLA
  // -----------------------------
  async updateSla(id: string, dto: UpdateSlaDto, user: any) {
    const request = await this.prisma.maintenanceRequest.findFirst({
      where: { id, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!request) throw new NotFoundException('Request not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Only OWNER/MANAGER can update SLA');
    }

    return this.prisma.sLARecord.upsert({
      where: { maintenanceRequestId: id },
      update: dto,
      create: { maintenanceRequestId: id, ...dto },
    });
  }
}
