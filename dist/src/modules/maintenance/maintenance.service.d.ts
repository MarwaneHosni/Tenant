import { PrismaService } from '../../database/prisma.service';
import { CreateMaintenanceRequestDto } from './dtos/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dtos/update-maintenance-request.dto';
import { AssignMaintenanceDto } from './dtos/assign-maintenance.dto';
import { AddMaintenanceUpdateDto } from './dtos/add-maintenance-update.dto';
import { UpdateSlaDto } from './dtos/update-sla.dto';
export declare class MaintenanceService {
    private prisma;
    constructor(prisma: PrismaService);
    createRequest(dto: CreateMaintenanceRequestDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        unitId: string;
        tenantId: string;
        title: string;
        priority: import("@prisma/client").$Enums.Priority;
        resolvedAt: Date | null;
    }>;
    findAll(user: any): Promise<({
        assignment: {
            id: string;
            requestId: string;
            technicianId: string;
            notes: string | null;
            assignedAt: Date;
            acceptedAt: Date | null;
            assignedBy: string;
        } | null;
        updates: {
            id: string;
            createdAt: Date;
            attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
            requestId: string;
            updateText: string;
            updatedBy: string;
        }[];
        slaRecord: {
            id: string;
            createdAt: Date;
            responseTimeMinutes: number;
            resolutionTimeMinutes: number | null;
            slaResponseTarget: number;
            slaResolutionTarget: number;
            responseMetSLA: boolean;
            resolutionMetSLA: boolean | null;
            maintenanceRequestId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        description: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        unitId: string;
        tenantId: string;
        title: string;
        priority: import("@prisma/client").$Enums.Priority;
        resolvedAt: Date | null;
    })[]>;
    findById(id: string, user: any): Promise<{
        assignment: {
            id: string;
            requestId: string;
            technicianId: string;
            notes: string | null;
            assignedAt: Date;
            acceptedAt: Date | null;
            assignedBy: string;
        } | null;
        updates: {
            id: string;
            createdAt: Date;
            attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
            requestId: string;
            updateText: string;
            updatedBy: string;
        }[];
        slaRecord: {
            id: string;
            createdAt: Date;
            responseTimeMinutes: number;
            resolutionTimeMinutes: number | null;
            slaResponseTarget: number;
            slaResolutionTarget: number;
            responseMetSLA: boolean;
            resolutionMetSLA: boolean | null;
            maintenanceRequestId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        description: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        unitId: string;
        tenantId: string;
        title: string;
        priority: import("@prisma/client").$Enums.Priority;
        resolvedAt: Date | null;
    }>;
    updateRequest(id: string, dto: UpdateMaintenanceRequestDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        unitId: string;
        tenantId: string;
        title: string;
        priority: import("@prisma/client").$Enums.Priority;
        resolvedAt: Date | null;
    }>;
    deleteRequest(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        description: string;
        status: import("@prisma/client").$Enums.RequestStatus;
        unitId: string;
        tenantId: string;
        title: string;
        priority: import("@prisma/client").$Enums.Priority;
        resolvedAt: Date | null;
    }>;
    assignRequest(dto: AssignMaintenanceDto, user: any): Promise<{
        id: string;
        requestId: string;
        technicianId: string;
        notes: string | null;
        assignedAt: Date;
        acceptedAt: Date | null;
        assignedBy: string;
    }>;
    addUpdate(dto: AddMaintenanceUpdateDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        requestId: string;
        updateText: string;
        updatedBy: string;
    }>;
    updateSla(id: string, dto: UpdateSlaDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        responseTimeMinutes: number;
        resolutionTimeMinutes: number | null;
        slaResponseTarget: number;
        slaResolutionTarget: number;
        responseMetSLA: boolean;
        resolutionMetSLA: boolean | null;
        maintenanceRequestId: string;
    }>;
}
