import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { InviteUserDto } from "./dtos/invite-user.dto";
import { AcceptInviteDto } from "./dtos/accept-invite.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(user: any): Promise<{
        success: boolean;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        success: boolean;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        success: boolean;
    }>;
    inviteUser(dto: InviteUserDto, user: any): Promise<{
        inviteToken: string;
    }>;
    acceptInvite(dto: AcceptInviteDto): Promise<{
        userId: string;
    }>;
}
