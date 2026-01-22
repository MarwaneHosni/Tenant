import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentScheduleDto } from './dtos/create-payment-schedule.dto';
import { UpdatePaymentScheduleDto } from './dtos/update-payment-schedule.dto';
import { CreatePaymentRecordDto } from './dtos/create-payment-record.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // -----------------------------
  // SCHEDULE
  // -----------------------------
  @Post('schedule')
  createSchedule(@Body() dto: CreatePaymentScheduleDto, @Req() req) {
    return this.paymentsService.createSchedule(dto, req.user);
  }

  @Get('schedule/:leaseId')
  findSchedules(@Param('leaseId') leaseId: string, @Req() req) {
    return this.paymentsService.findSchedules(leaseId, req.user);
  }

  @Patch('schedule/:id')
  updateSchedule(@Param('id') id: string, @Body() dto: UpdatePaymentScheduleDto, @Req() req) {
    return this.paymentsService.updateSchedule(id, dto, req.user);
  }

  @Delete('schedule/:id')
  deleteSchedule(@Param('id') id: string, @Req() req) {
    return this.paymentsService.deleteSchedule(id, req.user);
  }

  // -----------------------------
  // RECORD
  // -----------------------------
  @Post('record')
  createRecord(@Body() dto: CreatePaymentRecordDto, @Req() req) {
    return this.paymentsService.createRecord(dto, req.user);
  }

  @Get('record/:scheduleId')
  findRecords(@Param('scheduleId') scheduleId: string, @Req() req) {
    return this.paymentsService.findRecords(scheduleId, req.user);
  }
}
