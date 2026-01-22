import { PaymentMethod, PaymentStatus } from '@prisma/client';
export declare class CreatePaymentRecordDto {
    paymentScheduleId: string;
    tenantId: string;
    amountPaid: number;
    method: PaymentMethod;
    status?: PaymentStatus;
    paidDate?: Date;
    transactionId?: string;
}
