"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertiesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PropertiesService = class PropertiesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
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
    async findAll(user) {
        return this.prisma.property.findMany({
            where: { organizationId: user.organizationId },
            include: { units: true, announcements: true },
        });
    }
    async findById(id, user) {
        const property = await this.prisma.property.findFirst({
            where: { id, organizationId: user.organizationId },
            include: { units: true, announcements: true },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        return property;
    }
    async update(id, dto, user) {
        const property = await this.prisma.property.findFirst({
            where: { id, organizationId: user.organizationId },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
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
    async delete(id, user) {
        const property = await this.prisma.property.findFirst({
            where: { id, organizationId: user.organizationId },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        if (!user.roles.includes('OWNER')) {
            throw new common_1.ForbiddenException('Only OWNER can delete property');
        }
        return this.prisma.property.delete({ where: { id } });
    }
};
exports.PropertiesService = PropertiesService;
exports.PropertiesService = PropertiesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PropertiesService);
//# sourceMappingURL=properties.service.js.map