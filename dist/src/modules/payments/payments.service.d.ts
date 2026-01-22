import { PrismaService } from '../../database/prisma.service';
import { CreatePaymentScheduleDto } from './dtos/create-payment-schedule.dto';
import { UpdatePaymentScheduleDto } from './dtos/update-payment-schedule.dto';
import { CreatePaymentRecordDto } from './dtos/create-payment-record.dto';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSchedule(dto: CreatePaymentScheduleDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.PaymentType;
        leaseId: string;
        dueDate: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        recurrence: import("@prisma/client").$Enums.RecurrencePattern;
    }>;
    findSchedules(leaseId: string, user: any): Promise<({
        paymentRecords: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            tenantId: string;
            paymentScheduleId: string;
            amountPaid: import("@prisma/client/runtime/library").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            paidDate: Date | null;
            transactionId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.PaymentType;
        leaseId: string;
        dueDate: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        recurrence: import("@prisma/client").$Enums.RecurrencePattern;
    })[]>;
    updateSchedule(id: string, dto: UpdatePaymentScheduleDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.PaymentType;
        leaseId: string;
        dueDate: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        recurrence: import("@prisma/client").$Enums.RecurrencePattern;
    }>;
    deleteSchedule(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        type: import("@prisma/client").$Enums.PaymentType;
        leaseId: string;
        dueDate: Date;
        amount: import("@prisma/client/runtime/library").Decimal;
        recurrence: import("@prisma/client").$Enums.RecurrencePattern;
    }>;
    createRecord(dto: CreatePaymentRecordDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        tenantId: string;
        paymentScheduleId: string;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        paidDate: Date | null;
        transactionId: string | null;
    }>;
    findRecords(scheduleId: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        tenantId: string;
        paymentScheduleId: string;
        amountPaid: import("@prisma/client/runtime/library").Decimal;
        method: import("@prisma/client").$Enums.PaymentMethod;
        paidDate: Date | null;
        transactionId: string | null;
    }[]>;
}
