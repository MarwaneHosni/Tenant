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
exports.MaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const maintenance_service_1 = require("./maintenance.service");
const create_maintenance_request_dto_1 = require("./dtos/create-maintenance-request.dto");
const update_maintenance_request_dto_1 = require("./dtos/update-maintenance-request.dto");
const assign_maintenance_dto_1 = require("./dtos/assign-maintenance.dto");
const add_maintenance_update_dto_1 = require("./dtos/add-maintenance-update.dto");
const update_sla_dto_1 = require("./dtos/update-sla.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let MaintenanceController = class MaintenanceController {
    service;
    constructor(service) {
        this.service = service;
    }
    createRequest(dto, req) {
        return this.service.createRequest(dto, req.user);
    }
    findAll(req) {
        return this.service.findAll(req.user);
    }
    findById(id, req) {
        return this.service.findById(id, req.user);
    }
    updateRequest(id, dto, req) {
        return this.service.updateRequest(id, dto, req.user);
    }
    deleteRequest(id, req) {
        return this.service.deleteRequest(id, req.user);
    }
    assignRequest(dto, req) {
        return this.service.assignRequest(dto, req.user);
    }
    addUpdate(dto, req) {
        return this.service.addUpdate(dto, req.user);
    }
    updateSla(id, dto, req) {
        return this.service.updateSla(id, dto, req.user);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Post)('request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_maintenance_request_dto_1.CreateMaintenanceRequestDto, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "createRequest", null);
__decorate([
    (0, common_1.Get)('request'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_maintenance_request_dto_1.UpdateMaintenanceRequestDto, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "updateRequest", null);
__decorate([
    (0, common_1.Delete)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "deleteRequest", null);
__decorate([
    (0, common_1.Post)('assign'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_maintenance_dto_1.AssignMaintenanceDto, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "assignRequest", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_maintenance_update_dto_1.AddMaintenanceUpdateDto, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "addUpdate", null);
__decorate([
    (0, common_1.Patch)('sla/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sla_dto_1.UpdateSlaDto, Object]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "updateSla", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('maintenance'),
    __metadata("design:paramtypes", [maintenance_service_1.MaintenanceService])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map