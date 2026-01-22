import { IsString, IsDateString, IsNumber, IsEnum } from 'class-validator';
import { PaymentType, RecurrencePattern } from '@prisma/client';

export class CreatePaymentScheduleDto {
  @IsString()
  leaseId: string;

  @IsDateString()
  dueDate: Date;

  @IsNumber()
  amount: number;

  @IsEnum(PaymentType)
  type: PaymentType;

  @IsEnum(RecurrencePattern)
  recurrence: RecurrencePattern;
}
