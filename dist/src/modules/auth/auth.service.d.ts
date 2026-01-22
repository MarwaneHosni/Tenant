import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { InviteUserDto } from "./dtos/invite-user.dto";
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly prisma;
    constructor(userService: UsersService, jwtService: JwtService, prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
    }>;
    resetPassword(token: string, password: string): Promise<{
        success: boolean;
    }>;
    inviteUser(orgId: string, dto: InviteUserDto): Promise<{
        inviteToken: string;
    }>;
    acceptInvite(token: string, password: string): Promise<{
        userId: string;
    }>;
    private generateRefreshToken;
    saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<{
        id: string;
        createdAt: Date;
        expiresAt: Date;
        token: string;
        userId: string;
    }>;
    private invalidateRefreshToken;
    private validateRefreshToken;
    private generateInviteToken;
    private verifyInviteToken;
    private generatePasswordResetToken;
    private verifyPasswordResetToken;
}
