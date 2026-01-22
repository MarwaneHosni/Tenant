import { AnnouncementType } from '@prisma/client';
export declare class CreateAnnouncementDto {
    title: string;
    content: string;
    type: AnnouncementType;
    requiresAcknowledgement?: boolean;
    propertyId?: string;
    expiresAt?: string;
}
