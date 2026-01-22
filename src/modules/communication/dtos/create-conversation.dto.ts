import { IsString, IsOptional } from 'class-validator';
import { EntityType } from '@prisma/client';

export class CreateConversationDto {
  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  relatedEntityId?: string;

  @IsOptional()
  relatedEntityType?: EntityType | undefined;
}
