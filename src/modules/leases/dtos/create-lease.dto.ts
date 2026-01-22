import { IsString, IsNotEmpty, IsDateString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { LeaseStatus } from '@prisma/client';

export class CreateLeaseDto {
  @IsString()
  @IsNotEmpty()
  unitId: string;

  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsNumber()
  rentAmount: number;

  @IsNumber()
  securityDeposit: number;

  @IsOptional()
  @IsEnum(LeaseStatus)
  status?: LeaseStatus;
}
