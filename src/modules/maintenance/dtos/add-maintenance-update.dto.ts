import { IsString, IsOptional, IsArray } from 'class-validator';

export class AddMaintenanceUpdateDto {
  @IsString()
  requestId: string;

  @IsString()
  updateText: string;

  @IsOptional()
  @IsArray()
  attachmentUrls?: string[];
}
