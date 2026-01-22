"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const payments_service_1 = require("./payments.service");
const create_payment_schedule_dto_1 = require("./dtos/create-payment-schedule.dto");
const update_payment_schedule_dto_1 = require("./dtos/update-payment-schedule.dto");
const create_payment_record_dto_1 = require("./dtos/create-payment-record.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    createSchedule(dto, req) {
        return this.paymentsService.createSchedule(dto, req.user);
    }
    findSchedules(leaseId, req) {
        return this.paymentsService.findSchedules(leaseId, req.user);
    }
    updateSchedule(id, dto, req) {
        return this.paymentsService.updateSchedule(id, dto, req.user);
    }
    deleteSchedule(id, req) {
        return this.paymentsService.deleteSchedule(id, req.user);
    }
    createRecord(dto, req) {
        return this.paymentsService.createRecord(dto, req.user);
    }
    findRecords(scheduleId, req) {
        return this.paymentsService.findRecords(scheduleId, req.user);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)('schedule'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_schedule_dto_1.CreatePaymentScheduleDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createSchedule", null);
__decorate([
    (0, common_1.Get)('schedule/:leaseId'),
    __param(0, (0, common_1.Param)('leaseId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findSchedules", null);
__decorate([
    (0, common_1.Patch)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_schedule_dto_1.UpdatePaymentScheduleDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "updateSchedule", null);
__decorate([
    (0, common_1.Delete)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "deleteSchedule", null);
__decorate([
    (0, common_1.Post)('record'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_record_dto_1.CreatePaymentRecordDto, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createRecord", null);
__decorate([
    (0, common_1.Get)('record/:scheduleId'),
    __param(0, (0, common_1.Param)('scheduleId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "findRecords", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
//# sourceMappingURL=payments.controller.js.map