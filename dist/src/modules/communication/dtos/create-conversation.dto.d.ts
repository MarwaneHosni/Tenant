import { EntityType } from '@prisma/client';
export declare class CreateConversationDto {
    subject: string;
    relatedEntityId?: string;
    relatedEntityType?: EntityType | undefined;
}
