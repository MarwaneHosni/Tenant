import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateLeaseDto } from './dtos/create-lease.dto';
import { UpdateLeaseDto } from './dtos/update-lease.dto';

@Injectable()
export class LeasesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLeaseDto, user: any) {
    // Only MANAGER or OWNER can create leases
    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    // Verify Unit exists and belongs to user's organization
    const unit = await this.prisma.unit.findFirst({
      where: { id: dto.unitId, property: { organizationId: user.organizationId } },
    });
    if (!unit) throw new NotFoundException('Unit not found');

    // Verify tenant exists and belongs to organization
    const tenant = await this.prisma.user.findFirst({
      where: { id: dto.tenantId, userType: 'TENANT' },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');

    return this.prisma.lease.create({
      data: {
        unitId: dto.unitId,
        tenantId: dto.tenantId,
        startDate: dto.startDate,
        endDate: dto.endDate,
        rentAmount: dto.rentAmount,
        securityDeposit: dto.securityDeposit,
        status: dto.status ?? 'DRAFT',
      },
    });
  }

  async findAll(user: any) {
    return this.prisma.lease.findMany({
      where: { unit: { property: { organizationId: user.organizationId } } },
      include: { unit: true, tenant: true, documents: true, paymentSchedules: true },
    });
  }

  async findById(id: string, user: any) {
    const lease = await this.prisma.lease.findFirst({
      where: { id, unit: { property: { organizationId: user.organizationId } } },
      include: { unit: true, tenant: true, documents: true, paymentSchedules: true },
    });
    if (!lease) throw new NotFoundException('Lease not found');
    return lease;
  }

  async update(id: string, dto: UpdateLeaseDto, user: any) {
    const lease = await this.prisma.lease.findFirst({
      where: { id, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!lease) throw new NotFoundException('Lease not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.lease.update({
      where: { id },
      data: {
        startDate: dto.startDate ?? lease.startDate,
        endDate: dto.endDate ?? lease.endDate,
        rentAmount: dto.rentAmount ?? lease.rentAmount,
        securityDeposit: dto.securityDeposit ?? lease.securityDeposit,
        status: dto.status ?? lease.status,
      },
    });
  }

  async delete(id: string, user: any) {
    const lease = await this.prisma.lease.findFirst({
      where: { id, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!lease) throw new NotFoundException('Lease not found');

    if (!user.roles.includes('OWNER')) {
      throw new ForbiddenException('Only OWNER can delete lease');
    }

    return this.prisma.lease.delete({ where: { id } });
  }
}
