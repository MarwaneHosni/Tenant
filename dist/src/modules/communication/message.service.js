"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let MessagingService = class MessagingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createConversation(dto, user) {
        if (!dto.relatedEntityType) {
            throw new common_1.BadRequestException('relatedEntityType is required');
        }
        return this.prisma.conversation.create({
            data: {
                subject: dto.subject,
                relatedEntityId: dto.relatedEntityId,
                relatedEntityType: dto.relatedEntityType,
            },
        });
    }
    async getConversations(user) {
        return this.prisma.conversation.findMany({
            where: {
                messages: { some: { senderId: user.id } },
            },
            include: { messages: true },
        });
    }
    async getConversation(id, user) {
        const conv = await this.prisma.conversation.findFirst({
            where: { id, messages: { some: { senderId: user.id } } },
            include: { messages: true },
        });
        if (!conv)
            throw new common_1.NotFoundException('Conversation not found');
        return conv;
    }
    async sendMessage(dto, user) {
        const conv = await this.prisma.conversation.findFirst({
            where: { id: dto.conversationId, messages: { some: { senderId: user.id } } },
        });
        if (!conv)
            throw new common_1.NotFoundException('Conversation not found');
        return this.prisma.message.create({
            data: {
                conversationId: dto.conversationId,
                senderId: user.id,
                messageText: dto.messageText,
                attachmentUrls: dto.attachmentUrls,
            },
        });
    }
    async getMessages(conversationId, user) {
        const conv = await this.prisma.conversation.findFirst({
            where: { id: conversationId, messages: { some: { senderId: user.id } } },
        });
        if (!conv)
            throw new common_1.NotFoundException('Conversation not found');
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { sentAt: 'asc' },
        });
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagingService);
//# sourceMappingURL=message.service.js.map