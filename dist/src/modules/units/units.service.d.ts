import { PrismaService } from '../../database/prisma.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
export declare class UnitsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(propertyId: string, dto: CreateUnitDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        propertyId: string;
        unitNumber: string;
        sqft: import("@prisma/client/runtime/library").Decimal | null;
        bedrooms: number | null;
        bathrooms: import("@prisma/client/runtime/library").Decimal | null;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.UnitStatus;
    }>;
    findAll(propertyId: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        propertyId: string;
        unitNumber: string;
        sqft: import("@prisma/client/runtime/library").Decimal | null;
        bedrooms: number | null;
        bathrooms: import("@prisma/client/runtime/library").Decimal | null;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.UnitStatus;
    }[]>;
    findById(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        propertyId: string;
        unitNumber: string;
        sqft: import("@prisma/client/runtime/library").Decimal | null;
        bedrooms: number | null;
        bathrooms: import("@prisma/client/runtime/library").Decimal | null;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.UnitStatus;
    }>;
    update(id: string, dto: UpdateUnitDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        propertyId: string;
        unitNumber: string;
        sqft: import("@prisma/client/runtime/library").Decimal | null;
        bedrooms: number | null;
        bathrooms: import("@prisma/client/runtime/library").Decimal | null;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.UnitStatus;
    }>;
    delete(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        propertyId: string;
        unitNumber: string;
        sqft: import("@prisma/client/runtime/library").Decimal | null;
        bedrooms: number | null;
        bathrooms: import("@prisma/client/runtime/library").Decimal | null;
        rentAmount: import("@prisma/client/runtime/library").Decimal;
        status: import("@prisma/client").$Enums.UnitStatus;
    }>;
}
