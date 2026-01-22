import { PrismaService } from '../../database/prisma.service';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
export declare class PropertiesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePropertyDto, user: any): Promise<{
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        organizationId: string;
        city: string;
        state: string;
        zipCode: string;
        type: import("@prisma/client").$Enums.PropertyType;
        totalUnits: number;
    }>;
    findAll(user: any): Promise<({
        announcements: {
            id: string;
            organizationId: string;
            type: import("@prisma/client").$Enums.AnnouncementType;
            propertyId: string | null;
            title: string;
            content: string;
            requiresAcknowledgement: boolean;
            publishedAt: Date;
            expiresAt: Date | null;
            createdBy: string;
        }[];
        units: {
            id: string;
            createdAt: Date;
            propertyId: string;
            unitNumber: string;
            sqft: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: import("@prisma/client/runtime/library").Decimal | null;
            rentAmount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.UnitStatus;
        }[];
    } & {
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        organizationId: string;
        city: string;
        state: string;
        zipCode: string;
        type: import("@prisma/client").$Enums.PropertyType;
        totalUnits: number;
    })[]>;
    findById(id: string, user: any): Promise<{
        announcements: {
            id: string;
            organizationId: string;
            type: import("@prisma/client").$Enums.AnnouncementType;
            propertyId: string | null;
            title: string;
            content: string;
            requiresAcknowledgement: boolean;
            publishedAt: Date;
            expiresAt: Date | null;
            createdBy: string;
        }[];
        units: {
            id: string;
            createdAt: Date;
            propertyId: string;
            unitNumber: string;
            sqft: import("@prisma/client/runtime/library").Decimal | null;
            bedrooms: number | null;
            bathrooms: import("@prisma/client/runtime/library").Decimal | null;
            rentAmount: import("@prisma/client/runtime/library").Decimal;
            status: import("@prisma/client").$Enums.UnitStatus;
        }[];
    } & {
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        organizationId: string;
        city: string;
        state: string;
        zipCode: string;
        type: import("@prisma/client").$Enums.PropertyType;
        totalUnits: number;
    }>;
    update(id: string, dto: UpdatePropertyDto, user: any): Promise<{
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        organizationId: string;
        city: string;
        state: string;
        zipCode: string;
        type: import("@prisma/client").$Enums.PropertyType;
        totalUnits: number;
    }>;
    delete(id: string, user: any): Promise<{
        id: string;
        name: string;
        address: string;
        createdAt: Date;
        organizationId: string;
        city: string;
        state: string;
        zipCode: string;
        type: import("@prisma/client").$Enums.PropertyType;
        totalUnits: number;
    }>;
}
