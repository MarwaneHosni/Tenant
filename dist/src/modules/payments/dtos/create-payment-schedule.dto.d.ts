import { PaymentType, RecurrencePattern } from '@prisma/client';
export declare class CreatePaymentScheduleDto {
    leaseId: string;
    dueDate: Date;
    amount: number;
    type: PaymentType;
    recurrence: RecurrencePattern;
}
