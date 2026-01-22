import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(private prisma: PrismaService) {}

  async create(propertyId: string, dto: CreateUnitDto, user: any) {
    // Check property ownership
    const property = await this.prisma.property.findFirst({
      where: { id: propertyId, organizationId: user.organizationId },
    });
    if (!property) throw new NotFoundException('Property not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.unit.create({
      data: {
        propertyId,
        unitNumber: dto.unitNumber,
        sqft: dto.sqft,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        rentAmount: dto.rentAmount,
        status: dto.status,
      },
    });
  }

  async findAll(propertyId: string, user: any) {
    const property = await this.prisma.property.findFirst({
      where: { id: propertyId, organizationId: user.organizationId },
    });
    if (!property) throw new NotFoundException('Property not found');

    return this.prisma.unit.findMany({
      where: { propertyId },
    });
  }

  async findById(id: string, user: any) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id,
        property: { organizationId: user.organizationId },
      },
    });
    if (!unit) throw new NotFoundException('Unit not found');
    return unit;
  }

  async update(id: string, dto: UpdateUnitDto, user: any) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id,
        property: { organizationId: user.organizationId },
      },
      include: { property: true },
    });
    if (!unit) throw new NotFoundException('Unit not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.unit.update({
      where: { id },
      data: {
        unitNumber: dto.unitNumber ?? unit.unitNumber,
        sqft: dto.sqft ?? unit.sqft,
        bedrooms: dto.bedrooms ?? unit.bedrooms,
        bathrooms: dto.bathrooms ?? unit.bathrooms,
        rentAmount: dto.rentAmount ?? unit.rentAmount,
        status: dto.status ?? unit.status,
      },
    });
  }

  async delete(id: string, user: any) {
    const unit = await this.prisma.unit.findFirst({
      where: {
        id,
        property: { organizationId: user.organizationId },
      },
      include: { property: true },
    });
    if (!unit) throw new NotFoundException('Unit not found');

    if (!user.roles.includes('OWNER')) {
      throw new ForbiddenException('Only OWNER can delete unit');
    }

    return this.prisma.unit.delete({ where: { id } });
  }
}
