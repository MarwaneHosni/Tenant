import { Controller, Post, Get, Param, Body, Req, UseGuards } from '@nestjs/common';
import { MessagingService } from './message.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { SendMessageDto } from './dtos/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('messaging')
export class MessagingController {
  constructor(private readonly service: MessagingService) {}

  // -----------------------------
  // CONVERSATIONS
  // -----------------------------
  @Post('conversation')
  createConversation(@Body() dto: CreateConversationDto, @Req() req) {
    return this.service.createConversation(dto, req.user);
  }

  @Get('conversation')
  getConversations(@Req() req) {
    return this.service.getConversations(req.user);
  }

  @Get('conversation/:id')
  getConversation(@Param('id') id: string, @Req() req) {
    return this.service.getConversation(id, req.user);
  }

  // -----------------------------
  // MESSAGES
  // -----------------------------
  @Post('message')
  sendMessage(@Body() dto: SendMessageDto, @Req() req) {
    return this.service.sendMessage(dto, req.user);
  }

  @Get('messages/:conversationId')
  getMessages(@Param('conversationId') conversationId: string, @Req() req) {
    return this.service.getMessages(conversationId, req.user);
  }
}
