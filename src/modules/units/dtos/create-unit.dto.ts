import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { UnitStatus } from '@prisma/client';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  unitNumber: string;

  @IsOptional()
  @IsNumber()
  sqft?: number;

  @IsOptional()
  @IsNumber()
  bedrooms?: number;

  @IsOptional()
  @IsNumber()
  bathrooms?: number;

  @IsNumber()
  rentAmount: number;

  @IsOptional()
  @IsEnum(UnitStatus)
  status?: UnitStatus;
}
