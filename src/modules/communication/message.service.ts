import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';

@Injectable()
export class MessagingService {
  constructor(private prisma: PrismaService) {}

  // -----------------------------
  // CONVERSATIONS
  // -----------------------------
  async createConversation(dto: CreateConversationDto, user: any) {
    if (!dto.relatedEntityType) {
      throw new BadRequestException('relatedEntityType is required');
    }
    return this.prisma.conversation.create({
      data: {
        subject: dto.subject,
        relatedEntityId: dto.relatedEntityId,
        relatedEntityType: dto.relatedEntityType,
      },
    });
  }

  async getConversations(user: any) {
    // Fetch conversations related to user's organization
    return this.prisma.conversation.findMany({
      where: {
        messages: { some: { senderId: user.id } },
      },
      include: { messages: true },
    });
  }

  async getConversation(id: string, user: any) {
    const conv = await this.prisma.conversation.findFirst({
      where: { id, messages: { some: { senderId: user.id } } },
      include: { messages: true },
    });
    if (!conv) throw new NotFoundException('Conversation not found');
    return conv;
  }

  // -----------------------------
  // MESSAGES
  // -----------------------------
  async sendMessage(dto: SendMessageDto, user: any) {
    const conv = await this.prisma.conversation.findFirst({
      where: { id: dto.conversationId, messages: { some: { senderId: user.id } } },
    });
    if (!conv) throw new NotFoundException('Conversation not found');

    return this.prisma.message.create({
      data: {
        conversationId: dto.conversationId,
        senderId: user.id,
        messageText: dto.messageText,
        attachmentUrls: dto.attachmentUrls,
      },
    });
  }

  async getMessages(conversationId: string, user: any) {
    const conv = await this.prisma.conversation.findFirst({
      where: { id: conversationId, messages: { some: { senderId: user.id } } },
    });
    if (!conv) throw new NotFoundException('Conversation not found');

    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { sentAt: 'asc' },
    });
  }
}
