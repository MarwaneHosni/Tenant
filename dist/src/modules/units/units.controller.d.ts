import { UnitsService } from './units.service';
import { CreateUnitDto } from './dtos/create-unit.dto';
import { UpdateUnitDto } from './dtos/update-unit.dto';
export declare class UnitsController {
    private readonly unitsService;
    constructor(unitsService: UnitsService);
    create(propertyId: string, dto: CreateUnitDto, req: any): Promise<{
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
    findAll(propertyId: string, req: any): Promise<{
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
    findById(id: string, req: any): Promise<{
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
    update(id: string, dto: UpdateUnitDto, req: any): Promise<{
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
    delete(id: string, req: any): Promise<{
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
