"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../database/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    userService;
    jwtService;
    prisma;
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async login(dto) {
        const user = await this.userService.validateUser(dto.email, dto.password);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
        });
        const roles = this.userService.getUserRoles(user);
        const payload = {
            sub: user.id,
            roles,
            userType: user.userType,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = this.generateRefreshToken(user.id);
        await this.saveRefreshToken(user.id, refreshToken, new Date());
        return { accessToken, refreshToken };
    }
    async logout(userId) {
        await this.invalidateRefreshToken(userId);
        return { success: true };
    }
    async refresh(refreshToken) {
        const payload = this.validateRefreshToken(refreshToken);
        const user = await this.userService.findById(payload.sub);
        const newAccessToken = this.jwtService.sign({ sub: user.id });
        return { accessToken: newAccessToken };
    }
    async forgotPassword(email) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            return { success: true };
        const token = this.generatePasswordResetToken(user.id);
        return { success: true };
    }
    async resetPassword(token, password) {
        const payload = await this.verifyPasswordResetToken(token);
        const hash = await bcrypt.hash(password, 10);
        await this.userService.update(payload.userId, { password: hash });
        return { success: true };
    }
    async inviteUser(orgId, dto) {
        const token = this.generateInviteToken(dto.email, dto.role, orgId);
        return { inviteToken: token };
    }
    async acceptInvite(token, password) {
        const payload = this.verifyInviteToken(token);
        const hash = await bcrypt.hash(password, 10);
        const user = await this.userService.create({
            email: payload.email,
            roles: payload.role,
            firstName: payload.firstName,
            lastName: payload.lastName,
            userType: payload.userType,
            password: hash,
        });
        return { userId: user.id };
    }
    generateRefreshToken(userId) {
        const payload = { sub: userId };
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }
    async saveRefreshToken(userId, token, expiresAt) {
        return this.prisma.refreshToken.create({
            data: { userId, token, expiresAt },
        });
    }
    async invalidateRefreshToken(userId) {
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
    }
    validateRefreshToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
    }
    generateInviteToken(email, role, organizationId) {
        const payload = { email, role, organizationId };
        return this.jwtService.sign(payload, { expiresIn: '1d' });
    }
    verifyInviteToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired invite token');
        }
    }
    generatePasswordResetToken(userId) {
        const payload = { userId };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
    }
    async verifyPasswordResetToken(token) {
        try {
            return this.jwtService.verify(token);
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid or expired password reset token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map