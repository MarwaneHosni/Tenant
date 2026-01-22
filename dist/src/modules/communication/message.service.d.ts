import { PrismaService } from '../../database/prisma.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
export declare class MessagingService {
    private prisma;
    constructor(prisma: PrismaService);
    createConversation(dto: CreateConversationDto, user: any): Promise<{
        id: string;
        createdAt: Date;
        subject: string;
        relatedEntityId: string | null;
        relatedEntityType: import("@prisma/client").$Enums.EntityType;
        lastMessageAt: Date | null;
    }>;
    getConversations(user: any): Promise<({
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
    getConversation(id: string, user: any): Promise<{
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
    sendMessage(dto: SendMessageDto, user: any): Promise<{
        id: string;
        conversationId: string;
        messageText: string;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        senderId: string;
        sentAt: Date;
        isRead: boolean;
    }>;
    getMessages(conversationId: string, user: any): Promise<{
        id: string;
        conversationId: string;
        messageText: string;
        attachmentUrls: import("@prisma/client/runtime/library").JsonValue | null;
        senderId: string;
        sentAt: Date;
        isRead: boolean;
    }[]>;
}
