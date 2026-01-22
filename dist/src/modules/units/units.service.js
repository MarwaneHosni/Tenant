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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let UnitsService = class UnitsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(propertyId, dto, user) {
        const property = await this.prisma.property.findFirst({
            where: { id: propertyId, organizationId: user.organizationId },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
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
    async findAll(propertyId, user) {
        const property = await this.prisma.property.findFirst({
            where: { id: propertyId, organizationId: user.organizationId },
        });
        if (!property)
            throw new common_1.NotFoundException('Property not found');
        return this.prisma.unit.findMany({
            where: { propertyId },
        });
    }
    async findById(id, user) {
        const unit = await this.prisma.unit.findFirst({
            where: {
                id,
                property: { organizationId: user.organizationId },
            },
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        return unit;
    }
    async update(id, dto, user) {
        const unit = await this.prisma.unit.findFirst({
            where: {
                id,
                property: { organizationId: user.organizationId },
            },
            include: { property: true },
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
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
    async delete(id, user) {
        const unit = await this.prisma.unit.findFirst({
            where: {
                id,
                property: { organizationId: user.organizationId },
            },
            include: { property: true },
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        if (!user.roles.includes('OWNER')) {
            throw new common_1.ForbiddenException('Only OWNER can delete unit');
        }
        return this.prisma.unit.delete({ where: { id } });
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitsService);
//# sourceMappingURL=units.service.js.map