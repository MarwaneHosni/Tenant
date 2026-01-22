import { IsString, IsOptional, IsArray } from 'class-validator';

export class SendMessageDto {
  @IsString()
  conversationId: string;

  @IsString()
  messageText: string;

  @IsOptional()
  @IsArray()
  attachmentUrls?: string[];
}
