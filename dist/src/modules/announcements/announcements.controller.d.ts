import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { AcknowledgeDto } from './dtos/acknowledge.dto';
export declare class AnnouncementsController {
    private readonly service;
    constructor(service: AnnouncementsService);
    create(dto: CreateAnnouncementDto, req: any): Promise<{
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
    }>;
    getAll(req: any): Promise<({
        acknowledgements: {
            id: string;
            userId: string;
            announcementId: string;
            acknowledgedAt: Date;
        }[];
    } & {
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
    })[]>;
    getById(id: string, req: any): Promise<{
        acknowledgements: {
            id: string;
            userId: string;
            announcementId: string;
            acknowledgedAt: Date;
        }[];
    } & {
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
    }>;
    acknowledge(dto: AcknowledgeDto, req: any): Promise<{
        id: string;
        userId: string;
        announcementId: string;
        acknowledgedAt: Date;
    }>;
}
