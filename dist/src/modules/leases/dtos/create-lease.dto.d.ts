import { LeaseStatus } from '@prisma/client';
export declare class CreateLeaseDto {
    unitId: string;
    tenantId: string;
    startDate: Date;
    endDate: Date;
    rentAmount: number;
    securityDeposit: number;
    status?: LeaseStatus;
}
