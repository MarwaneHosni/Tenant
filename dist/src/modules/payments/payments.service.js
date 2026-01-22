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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let PaymentsService = class PaymentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSchedule(dto, user) {
        const lease = await this.prisma.lease.findFirst({
            where: { id: dto.leaseId, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return this.prisma.paymentSchedule.create({ data: dto });
    }
    async findSchedules(leaseId, user) {
        const lease = await this.prisma.lease.findFirst({
            where: { id: leaseId, unit: { property: { organizationId: user.organizationId } } },
        });
        if (!lease)
            throw new common_1.NotFoundException('Lease not found');
        return this.prisma.paymentSchedule.findMany({
            where: { leaseId },
            include: { paymentRecords: true },
        });
    }
    async updateSchedule(id, dto, user) {
        const schedule = await this.prisma.paymentSchedule.findFirst({
            where: { id, lease: { unit: { property: { organizationId: user.organizationId } } } },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Payment schedule not found');
        if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return this.prisma.paymentSchedule.update({ where: { id }, data: dto });
    }
    async deleteSchedule(id, user) {
        const schedule = await this.prisma.paymentSchedule.findFirst({
            where: { id, lease: { unit: { property: { organizationId: user.organizationId } } } },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Payment schedule not found');
        if (!user.roles.includes('OWNER')) {
            throw new common_1.ForbiddenException('Only OWNER can delete payment schedule');
        }
        return this.prisma.paymentSchedule.delete({ where: { id } });
    }
    async createRecord(dto, user) {
        const schedule = await this.prisma.paymentSchedule.findFirst({
            where: { id: dto.paymentScheduleId, lease: { unit: { property: { organizationId: user.organizationId } } } },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Payment schedule not found');
        if (user.userType !== 'TENANT' && !['OWNER', 'MANAGER'].includes(user.roles[0])) {
            throw new common_1.ForbiddenException('Insufficient permissions');
        }
        return this.prisma.paymentRecord.create({ data: dto });
    }
    async findRecords(scheduleId, user) {
        const schedule = await this.prisma.paymentSchedule.findFirst({
            where: { id: scheduleId, lease: { unit: { property: { organizationId: user.organizationId } } } },
        });
        if (!schedule)
            throw new common_1.NotFoundException('Payment schedule not found');
        return this.prisma.paymentRecord.findMany({ where: { paymentScheduleId: scheduleId } });
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map