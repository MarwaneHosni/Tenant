import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceRequestDto } from './dtos/create-maintenance-request.dto';
import { UpdateMaintenanceRequestDto } from './dtos/update-maintenance-request.dto';
import { AssignMaintenanceDto } from './dtos/assign-maintenance.dto';
import { AddMaintenanceUpdateDto } from './dtos/add-maintenance-update.dto';
import { UpdateSlaDto } from './dtos/update-sla.dto';
export declare class MaintenanceController {
    private readonly service;
    constructor(service: MaintenanceService);
    createRequest(dto: CreateMaintenanceRequestDto, req: any): Promise<{
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
    findAll(req: any): Promise<({
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
    findById(id: string, req: any): Promise<{
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
    updateRequest(id: string, dto: UpdateMaintenanceRequestDto, req: any): Promise<{
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
    deleteRequest(id: string, req: any): Promise<{
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
    assignRequest(dto: AssignMaintenanceDto, req: any): Promise<{
        id: string;
        requestId: string;
        technicianId: string;
        notes: string | null;
        assignedAt: Date;
        acceptedAt: Date | null;
        assignedBy: string;
    }>;
    addUpdate(dto: AddMaintenanceUpdateDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        requestId: string;
        updateText: string;
        updatedBy: string;
    }>;
    updateSla(id: string, dto: UpdateSlaDto, req: any): Promise<{
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
