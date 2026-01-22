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
exports.MessagingController = void 0;
const common_1 = require("@nestjs/common");
const message_service_1 = require("./message.service");
const create_conversation_dto_1 = require("./dtos/create-conversation.dto");
const send_message_dto_1 = require("./dtos/send-message.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let MessagingController = class MessagingController {
    service;
    constructor(service) {
        this.service = service;
    }
    createConversation(dto, req) {
        return this.service.createConversation(dto, req.user);
    }
    getConversations(req) {
        return this.service.getConversations(req.user);
    }
    getConversation(id, req) {
        return this.service.getConversation(id, req.user);
    }
    sendMessage(dto, req) {
        return this.service.sendMessage(dto, req.user);
    }
    getMessages(conversationId, req) {
        return this.service.getMessages(conversationId, req.user);
    }
};
exports.MessagingController = MessagingController;
__decorate([
    (0, common_1.Post)('conversation'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_conversation_dto_1.CreateConversationDto, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "createConversation", null);
__decorate([
    (0, common_1.Get)('conversation'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getConversations", null);
__decorate([
    (0, common_1.Get)('conversation/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getConversation", null);
__decorate([
    (0, common_1.Post)('message'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Get)('messages/:conversationId'),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getMessages", null);
exports.MessagingController = MessagingController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('messaging'),
    __metadata("design:paramtypes", [message_service_1.MessagingService])
], MessagingController);
//# sourceMappingURL=message.controller.js.map