import { IsString } from 'class-validator';

export class AcknowledgeDto {
  @IsString()
  announcementId: string;
}
