import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        address: dto.address,
        phone: dto.phone,
        email: dto.email,
        tier: dto.tier || 'FREE',
        isActive: true,
      },
    });
  }

  async getAll() {
    return this.prisma.organization.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getById(id: string) {
    const org = await this.prisma.organization.findUnique({ where: { id } });
    if (!org) throw new NotFoundException('Organization not found');
    return org;
  }

  async update(id: string, dto: UpdateOrganizationDto) {
    return this.prisma.organization.update({
      where: { id },
      data: {
        name: dto.name,
        slug: dto.slug,
        address: dto.address,
        phone: dto.phone,
        email: dto.email,
        tier: dto.tier,
        isActive: dto.isActive,
      },
    });
  }

  async deactivate(id: string) {
    return this.prisma.organization.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
