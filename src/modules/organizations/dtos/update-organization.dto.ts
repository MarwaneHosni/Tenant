import { IsString, IsOptional, IsEnum, IsEmail, IsBoolean } from 'class-validator';
import { SubscriptionTier } from '@prisma/client';

export class UpdateOrganizationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(SubscriptionTier)
  tier?: SubscriptionTier;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
