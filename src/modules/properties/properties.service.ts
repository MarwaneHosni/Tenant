import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePropertyDto, user: any) {
    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.property.create({
      data: {
        name: dto.name,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        zipCode: dto.zipCode,
        type: dto.type,
        organizationId: user.organizationId,
      },
    });
  }

  async findAll(user: any) {
    return this.prisma.property.findMany({
      where: { organizationId: user.organizationId },
      include: { units: true, announcements: true },
    });
  }

  async findById(id: string, user: any) {
    const property = await this.prisma.property.findFirst({
      where: { id, organizationId: user.organizationId },
      include: { units: true, announcements: true },
    });
    if (!property) throw new NotFoundException('Property not found');
    return property;
  }

  async update(id: string, dto: UpdatePropertyDto, user: any) {
    const property = await this.prisma.property.findFirst({
      where: { id, organizationId: user.organizationId },
    });
    if (!property) throw new NotFoundException('Property not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.property.update({
      where: { id },
      data: {
        name: dto.name ?? property.name,
        address: dto.address ?? property.address,
        city: dto.city ?? property.city,
        state: dto.state ?? property.state,
        zipCode: dto.zipCode ?? property.zipCode,
        type: dto.type ?? property.type,
      },
    });
  }

  async delete(id: string, user: any) {
    const property = await this.prisma.property.findFirst({
      where: { id, organizationId: user.organizationId },
    });
    if (!property) throw new NotFoundException('Property not found');

    if (!user.roles.includes('OWNER')) {
      throw new ForbiddenException('Only OWNER can delete property');
    }

    return this.prisma.property.delete({ where: { id } });
  }
}
