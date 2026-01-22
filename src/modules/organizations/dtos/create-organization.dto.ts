import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { SubscriptionTier } from '@prisma/client';

export class CreateOrganizationDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

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
}
