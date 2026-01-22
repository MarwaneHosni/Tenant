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
exports.LeasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let LeasesService = class LeasesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        const unit = await this.prisma.unit.findFirst({
            where: { id: dto.unitId, property: { organizationId: user.organizationId } },
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
        const tenant = await this.prisma.user.findFirst({
            where: { id: dto.tenantId, userType: 'TENANT' },
        });
        if (!tenant)
            throw new common_1.NotFoundException('Tenant not found');
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
    async findAll(user) {
        return this.prisma.lease.findMany({
            where: { unit: { property: { organizationId: user.organizationId } } },
            include: { unit: true, tenant: true, documents: true, paymentSchedules: true },
        });
    }
    async findById(id, user) {
        const lease = await this.prisma.lease.findFirst({
            where: { id, unit: { property: { organizationId: user.organizationId } } },
            include: { unit: true, tenant: true, documents: true, paymentSchedules: true },
        });
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        return lease;
    }
    async update(id, dto, user) {
        const lease = await this.prisma.lease.findFirst({
            where: { id, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
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
    async delete(id, user) {
        const lease = await this.prisma.lease.findFirst({
            where: { id, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        if (!user.roles.includes('OWNER')) {
            throw new common_1.ForbiddenException('Only OWNER can delete lease');
        }
        return this.prisma.lease.delete({ where: { id } });
    }
};
exports.LeasesService = LeasesService;
exports.LeasesService = LeasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeasesService);
//# sourceMappingURL=leases.service.js.map