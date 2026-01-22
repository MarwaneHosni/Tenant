import { IsString, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export class CreatePaymentRecordDto {
  @IsString()
  paymentScheduleId: string;

  @IsString()
  tenantId: string;

  @IsNumber()
  amountPaid: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @IsOptional()
  @IsDateString()
  paidDate?: Date;

  @IsOptional()
  @IsString()
  transactionId?: string;
}
