import { PrismaService } from '../../database/prisma.service';
import { CreateAnnouncementDto } from './dtos/create-announcement.dto';
import { AcknowledgeDto } from './dtos/acknowledge.dto';
export declare class AnnouncementsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAnnouncementDto, user: any): Promise<{
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
    getAll(user: any): Promise<({
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
    getById(id: string, user: any): Promise<{
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
    acknowledge(dto: AcknowledgeDto, user: any): Promise<{
        id: string;
        userId: string;
        announcementId: string;
        acknowledgedAt: Date;
    }>;
}
