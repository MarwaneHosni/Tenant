import { UnitStatus } from '@prisma/client';
export declare class CreateUnitDto {
    unitNumber: string;
    sqft?: number;
    bedrooms?: number;
    bathrooms?: number;
    rentAmount: number;
    status?: UnitStatus;
}
