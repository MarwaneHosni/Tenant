import { IsString, IsOptional, IsEnum, IsDateString, IsBoolean } from 'class-validator';
import { AnnouncementType } from '@prisma/client';

export class CreateAnnouncementDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(AnnouncementType)
  type: AnnouncementType;

  @IsOptional()
  @IsBoolean()
  requiresAcknowledgement?: boolean;

  @IsOptional()
  @IsString()
  propertyId?: string;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
