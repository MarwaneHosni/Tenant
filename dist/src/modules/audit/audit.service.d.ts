import { PrismaService } from '../../database/prisma.service';
import { CreateAuditDto } from './dtos/create-audit.dto';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAuditDto, user: any): Promise<{
        id: string;
        action: string;
        organizationId: string;
        userId: string;
        entityType: string;
        entityId: string;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string;
        timestamp: Date;
    }>;
    getAll(user: any): Promise<{
        id: string;
        action: string;
        organizationId: string;
        userId: string;
        entityType: string;
        entityId: string;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string;
        timestamp: Date;
    }[]>;
    getByEntity(entityType: string, entityId: string, user: any): Promise<{
        id: string;
        action: string;
        organizationId: string;
        userId: string;
        entityType: string;
        entityId: string;
        oldValues: import("@prisma/client/runtime/library").JsonValue | null;
        newValues: import("@prisma/client/runtime/library").JsonValue | null;
        ipAddress: string;
        timestamp: Date;
    }[]>;
}
