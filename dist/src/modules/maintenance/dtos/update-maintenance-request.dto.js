"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMaintenanceRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_maintenance_request_dto_1 = require("./create-maintenance-request.dto");
class UpdateMaintenanceRequestDto extends (0, mapped_types_1.PartialType)(create_maintenance_request_dto_1.CreateMaintenanceRequestDto) {
}
exports.UpdateMaintenanceRequestDto = UpdateMaintenanceRequestDto;
//# sourceMappingURL=update-maintenance-request.dto.js.map