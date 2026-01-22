"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePaymentScheduleDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_payment_schedule_dto_1 = require("./create-payment-schedule.dto");
class UpdatePaymentScheduleDto extends (0, mapped_types_1.PartialType)(create_payment_schedule_dto_1.CreatePaymentScheduleDto) {
}
exports.UpdatePaymentScheduleDto = UpdatePaymentScheduleDto;
//# sourceMappingURL=update-payment-schedule.dto.js.map