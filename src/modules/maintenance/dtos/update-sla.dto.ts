import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class UpdateSlaDto {
  @IsInt()
  responseTimeMinutes: number;

  @IsOptional()
  @IsInt()
  resolutionTimeMinutes?: number;

  @IsInt()
  slaResponseTarget: number;

  @IsInt()
  slaResolutionTarget: number;

  @IsBoolean()
  responseMetSLA: boolean;

  @IsOptional()
  @IsBoolean()
  resolutionMetSLA?: boolean;
}
