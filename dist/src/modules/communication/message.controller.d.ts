import { MessagingService } from './message.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
export declare class MessagingController {
    private readonly service;
    constructor(service: MessagingService);
    createConversation(dto: CreateConversationDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        subject: string;
        relatedEntityId: string | null;
        relatedEntityType: import("@prisma/client").$Enums.EntityType;
        lastMessageAt: Date | null;
    }>;
    getConversations(req: any): Promise<({
        messages: {
            id: string;
            conversationId: string;
            messageText: string;
            attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
            senderId: string;
            sentAt: Date;
            isRead: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        subject: string;
        relatedEntityId: string | null;
        relatedEntityType: import("@prisma/client").$Enums.EntityType;
        lastMessageAt: Date | null;
    })[]>;
    getConversation(id: string, req: any): Promise<{
        messages: {
            id: string;
            conversationId: string;
            messageText: string;
            attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
            senderId: string;
            sentAt: Date;
            isRead: boolean;
        }[];
    } & {
        id: string;
        createdAt: Date;
        subject: string;
        relatedEntityId: string | null;
        relatedEntityType: import("@prisma/client").$Enums.EntityType;
        lastMessageAt: Date | null;
    }>;
    sendMessage(dto: SendMessageDto, req: any): Promise<{
        id: string;
        conversationId: string;
        messageText: string;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        senderId: string;
        sentAt: Date;
        isRead: boolean;
    }>;
    getMessages(conversationId: string, req: any): Promise<{
        id: string;
        conversationId: string;
        messageText: string;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        senderId: string;
        sentAt: Date;
        isRead: boolean;
    }[]>;
}
