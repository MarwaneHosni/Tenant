import { PrismaService } from '../../database/prisma.service';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
export declare class OrganizationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrganizationDto): Promise<{
        id: string;
        name: string;
        slug: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        createdAt: Date;
        isActive: boolean;
    }>;
    getAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        createdAt: Date;
        isActive: boolean;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        createdAt: Date;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateOrganizationDto): Promise<{
        id: string;
        name: string;
        slug: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        createdAt: Date;
        isActive: boolean;
    }>;
    deactivate(id: string): Promise<{
        id: string;
        name: string;
        slug: string;
        address: string | null;
        phone: string | null;
        email: string | null;
        tier: import("@prisma/client").$Enums.SubscriptionTier;
        createdAt: Date;
        isActive: boolean;
    }>;
}
