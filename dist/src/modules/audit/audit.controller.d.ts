import { AuditService } from './audit.service';
import { CreateAuditDto } from './dtos/create-audit.dto';
export declare class AuditController {
    private readonly service;
    constructor(service: AuditService);
    create(dto: CreateAuditDto, req: any): Promise<{
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
    getAll(req: any): Promise<{
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
    getByEntity(entityType: string, entityId: string, req: any): Promise<{
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
