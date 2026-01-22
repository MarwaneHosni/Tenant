import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePaymentScheduleDto } from './dtos/create-payment-schedule.dto';
import { UpdatePaymentScheduleDto } from './dtos/update-payment-schedule.dto';
import { CreatePaymentRecordDto } from './dtos/create-payment-record.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // PAYMENT SCHEDULE
  // -----------------------------

  async createSchedule(dto: CreatePaymentScheduleDto, user: any) {
    const lease = await this.prisma.lease.findFirst({
      where: { id: dto.leaseId, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!lease) throw new NotFoundException('Lease not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.paymentSchedule.create({ data: dto });
  }

  async findSchedules(leaseId: string, user: any) {
    const lease = await this.prisma.lease.findFirst({
      where: { id: leaseId, unit: { property: { organizationId: user.organizationId } } },
    });
    if (!lease) throw new NotFoundException('Lease not found');

    return this.prisma.paymentSchedule.findMany({
      where: { leaseId },
      include: { paymentRecords: true },
    });
  }

  async updateSchedule(id: string, dto: UpdatePaymentScheduleDto, user: any) {
    const schedule = await this.prisma.paymentSchedule.findFirst({
      where: { id, lease: { unit: { property: { organizationId: user.organizationId } } } },
    });
    if (!schedule) throw new NotFoundException('Payment schedule not found');

    if (!['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.paymentSchedule.update({ where: { id }, data: dto });
  }

  async deleteSchedule(id: string, user: any) {
    const schedule = await this.prisma.paymentSchedule.findFirst({
      where: { id, lease: { unit: { property: { organizationId: user.organizationId } } } },
    });
    if (!schedule) throw new NotFoundException('Payment schedule not found');

    if (!user.roles.includes('OWNER')) {
      throw new ForbiddenException('Only OWNER can delete payment schedule');
    }

    return this.prisma.paymentSchedule.delete({ where: { id } });
  }

  // -----------------------------
  // PAYMENT RECORD
  // -----------------------------

  async createRecord(dto: CreatePaymentRecordDto, user: any) {
    const schedule = await this.prisma.paymentSchedule.findFirst({
      where: { id: dto.paymentScheduleId, lease: { unit: { property: { organizationId: user.organizationId } } } },
    });
    if (!schedule) throw new NotFoundException('Payment schedule not found');

    // Tenant themselves can record payments
    if (user.userType !== 'TENANT' && !['OWNER', 'MANAGER'].includes(user.roles[0])) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return this.prisma.paymentRecord.create({ data: dto });
  }

  async findRecords(scheduleId: string, user: any) {
    const schedule = await this.prisma.paymentSchedule.findFirst({
      where: { id: scheduleId, lease: { unit: { property: { organizationId: user.organizationId } } } },
    });
    if (!schedule) throw new NotFoundException('Payment schedule not found');

    return this.prisma.paymentRecord.findMany({ where: { paymentScheduleId: scheduleId } });
  }
}
