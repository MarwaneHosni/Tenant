import { IsString, IsOptional, IsJSON } from 'class-validator';

export class CreateAuditDto {
  @IsString()
  entityType: string;

  @IsString()
  entityId: string;

  @IsString()
  action: string;

  @IsOptional()
  oldValues?: any;

  @IsOptional()
  newValues?: any;

  @IsOptional()
  ipAddress?: string;
}
