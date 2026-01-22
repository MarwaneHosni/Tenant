import { IsString, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from '@prisma/client';

export class CreateMaintenanceRequestDto {
  @IsString()
  unitId: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;
}
