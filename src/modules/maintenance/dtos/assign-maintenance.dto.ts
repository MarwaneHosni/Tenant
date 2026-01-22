import { IsString, IsOptional } from 'class-validator';

export class AssignMaintenanceDto {
  @IsString()
  requestId: string;

  @IsString()
  technicianId: string;

  @IsOptional()
  notes?: string;
}
