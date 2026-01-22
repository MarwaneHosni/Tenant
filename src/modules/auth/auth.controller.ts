import { Controller, Post } from "@nestjs/common";
import { Body, UseGuards } from "@nestjs/common/decorators";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";
import { ForgotPasswordDto } from "./dtos/forgot-password.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { InviteUserDto } from "./dtos/invite-user.dto";
import { AcceptInviteDto } from "./dtos/accept-invite.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { CurrentUser } from "./decorators/current-user.decorator";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body () dto: LoginDto ) {
        return this.authService.login(dto);
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(@CurrentUser() user) {
        return this.authService.logout(user.id);
    }

    @Post('refresh')
    refresh(@Body () dto: RefreshTokenDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    @Post('forgot-password')
    forgotPassword(@Body () dto: ForgotPasswordDto) {
        return this.authService.forgotPassword(dto.email);
    }

    @Post('reset-password')
    resetPassword(@Body () dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto.password, dto.token);
    }

    @Post('invite-user')
    @UseGuards(JwtAuthGuard, RolesGuard)
    inviteUser(@Body () dto: InviteUserDto, @CurrentUser() user) {
        return this.authService.inviteUser(user.orgId, dto);
    }

    @Post('accept-invite')
    acceptInvite(@Body () dto: AcceptInviteDto) {
        return this.authService.acceptInvite(dto.inviteToken, dto.password);
    }

}