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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let MaintenanceService = class MaintenanceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRequest(dto, user) {
        if (user.userType !== 'TENANT') {
            throw new common_1.ForbiddenException('Only tenants can create maintenance requests');
        }
        const unit = await this.prisma.unit.findFirst({
            where: { id: dto.unitId, property: { organizationId: user.organizationId } },
        });
        if (!unit)
            throw new common_1.NotFoundException('Unit not found');
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
    async findAll(user) {
        return this.prisma.maintenanceRequest.findMany({
            where: { unit: { property: { organizationId: user.organizationId } } },
            include: { assignment: true, updates: true, slaRecord: true },
        });
    }
    async findById(id, user) {
        const req = await this.prisma.maintenanceRequest.findFirst({
            where: { id, unit: { property: { organizationId: user.organizationId } } },
            include: { assignment: true, updates: true, slaRecord: true },
        });
        if (!req)
            throw new common_1.NotFoundException('Maintenance request not found');
        return req;
    }
    async updateRequest(id, dto, user) {
        const req = await this.prisma.maintenanceRequest.findFirst({
            where: { id, tenantId: user.id },
        });
        if (!req)
            throw new common_1.NotFoundException('Request not found');
        return this.prisma.maintenanceRequest.update({ where: { id }, data: dto });
    }
    async deleteRequest(id, user) {
        const req = await this.prisma.maintenanceRequest.findFirst({
            where: { id, tenantId: user.id },
        });
        if (!req)
            throw new common_1.NotFoundException('Request not found');
        return this.prisma.maintenanceRequest.delete({ where: { id } });
    }
    async assignRequest(dto, user) {
        const request = await this.prisma.maintenanceRequest.findFirst({
            where: { id: dto.requestId, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Only OWNER/MANAGER can assign');
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
    async addUpdate(dto, user) {
        const request = await this.prisma.maintenanceRequest.findFirst({
            where: { id: dto.requestId, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        return this.prisma.maintenanceUpdate.create({
            data: {
                requestId: dto.requestId,
                updatedBy: user.id,
                updateText: dto.updateText,
                attachmentUrls: dto.attachmentUrls,
            },
        });
    }
    async updateSla(id, dto, user) {
        const request = await this.prisma.maintenanceRequest.findFirst({
            where: { id, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!request)
            throw new common_1.NotFoundException('Request not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Only OWNER/MANAGER can update SLA');
        }
        return this.prisma.sLARecord.upsert({
            where: { maintenanceRequestId: id },
            update: dto,
            create: { maintenanceRequestId: id, ...dto },
        });
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map