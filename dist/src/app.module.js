"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const organizations_module_1 = require("./modules/organizations/organizations.module");
const prisma_module_1 = require("./database/prisma.module");
const announcements_module_1 = require("./modules/announcements/announcements.module");
const audit_module_1 = require("./modules/audit/audit.module");
const properties_module_1 = require("./modules/properties/properties.module");
const units_module_1 = require("./modules/units/units.module");
const payments_module_1 = require("./modules/payments/payments.module");
const leases_module_1 = require("./modules/leases/leases.module");
const maintenance_module_1 = require("./modules/maintenance/maintenance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, users_module_1.UsersModule, organizations_module_1.OrganizationsModule, prisma_module_1.PrismaModule, announcements_module_1.AnnouncementsModule, audit_module_1.AuditModule, properties_module_1.PropertiesModule, units_module_1.UnitsModule, payments_module_1.PaymentsModule, leases_module_1.LeasesModule, maintenance_module_1.MaintenanceModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map