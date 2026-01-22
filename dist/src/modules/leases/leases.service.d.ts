import { PrismaService } from '../../database/prisma.service';
import { CreateLeaseDto } from './dtos/create-lease.dto';
import { UpdateLeaseDto } from './dtos/update-lease.dto';
export declare class LeasesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateLeaseDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.LeaseStatus;
        unitId: string;
        tenantId: string;
        startDate: Date;
        endDate: Date;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        signedAt: Date | null;
    }>;
    findAll(user: any): Promise<({
        unit: {
            id: string;
            createdAt: Date;
            propertyId: string;
            unitNumber: string;
            sqft: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: import("@prisma/client/runtime/library").Decimal | null;
            rentAmount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.UnitStatus;
        };
        tenant: {
            id: string;
            phone: string | null;
            email: string;
            createdAt: Date;
            isActive: boolean;
            passwordHash: string;
            firstName: string;
            lastName: string;
            userType: import("@prisma/client").$Enums.UserType;
            lastLogin: Date | null;
        };
        documents: {
            id: string;
            leaseId: string;
            fileName: string;
            fileUrl: string;
            fileType: string;
            fileSize: bigint;
            documentType: import("@prisma/client").$Enums.DocumentType;
            requiresSignature: boolean;
            uploadedAt: Date;
        }[];
        paymentSchedules: {
            id: string;
            createdAt: Date;
            type: import("@prisma/client").$Enums.PaymentType;
            leaseId: string;
            dueDate: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            recurrence: import("@prisma/client").$Enums.RecurrencePattern;
        }[];
    } & {
        id: string;
        createdAt: Date;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.LeaseStatus;
        unitId: string;
        tenantId: string;
        startDate: Date;
        endDate: Date;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        signedAt: Date | null;
    })[]>;
    findById(id: string, user: any): Promise<{
        unit: {
            id: string;
            createdAt: Date;
            propertyId: string;
            unitNumber: string;
            sqft: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: import("@prisma/client/runtime/library").Decimal | null;
            rentAmount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.UnitStatus;
        };
        tenant: {
            id: string;
            phone: string | null;
            email: string;
            createdAt: Date;
            isActive: boolean;
            passwordHash: string;
            firstName: string;
            lastName: string;
            userType: import("@prisma/client").$Enums.UserType;
            lastLogin: Date | null;
        };
        documents: {
            id: string;
            leaseId: string;
            fileName: string;
            fileUrl: string;
            fileType: string;
            fileSize: bigint;
            documentType: import("@prisma/client").$Enums.DocumentType;
            requiresSignature: boolean;
            uploadedAt: Date;
        }[];
        paymentSchedules: {
            id: string;
            createdAt: Date;
            type: import("@prisma/client").$Enums.PaymentType;
            leaseId: string;
            dueDate: Date;
            amount: import("@prisma/client/runtime/library").Decimal;
            recurrence: import("@prisma/client").$Enums.RecurrencePattern;
        }[];
    } & {
        id: string;
        createdAt: Date;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.LeaseStatus;
        unitId: string;
        tenantId: string;
        startDate: Date;
        endDate: Date;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        signedAt: Date | null;
    }>;
    update(id: string, dto: UpdateLeaseDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.LeaseStatus;
        unitId: string;
        tenantId: string;
        startDate: Date;
        endDate: Date;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        signedAt: Date | null;
    }>;
    delete(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.LeaseStatus;
        unitId: string;
        tenantId: string;
        startDate: Date;
        endDate: Date;
        securityDeposit: import("@prisma/client/runtime/library").Decimal;
        signedAt: Date | null;
    }>;
}
