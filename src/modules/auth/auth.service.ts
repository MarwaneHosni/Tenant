import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../database/prisma.service";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dtos/login.dto";
import { InviteUserDto } from "./dtos/invite-user.dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    async login(dto: LoginDto) {
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


    async logout(userId: string) {
        await this.invalidateRefreshToken(userId);
        return { success: true };
    }

    async refresh(refreshToken: string) {
        const payload = this.validateRefreshToken(refreshToken);
        const user = await this.userService.findById(payload.sub);
        const newAccessToken = this.jwtService.sign({ sub: user.id });
        return { accessToken: newAccessToken };
    }

    async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) return { success: true };

    const token = this.generatePasswordResetToken(user.id);
    return { success: true };
  }

  async resetPassword(token: string, password: string) {
    const payload = await this.verifyPasswordResetToken(token);
    const hash = await bcrypt.hash(password, 10);
    await this.userService.update(payload.userId, { password: hash });
    return { success: true };
  }

  async inviteUser(orgId: string, dto: InviteUserDto) {
    const token = this.generateInviteToken(dto.email, dto.role, orgId);
    return { inviteToken: token };
  }

  async acceptInvite(token: string, password: string) {
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
    private generateRefreshToken(userId: string): string {
        const payload = { sub: userId };
        return this.jwtService.sign(payload, { expiresIn: '7d' });
    }

    async saveRefreshToken(userId: string, token: string, expiresAt: Date) {
  return this.prisma.refreshToken.create({
    data: { userId, token, expiresAt },
  });
}


    private async invalidateRefreshToken(userId: string) {
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
    }

    private validateRefreshToken(token: string): any {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    private generateInviteToken(email: string | undefined, role: string, organizationId: string) {
        const payload = { email, role, organizationId };
        return this.jwtService.sign(payload, { expiresIn: '1d' });
    }

    private verifyInviteToken(token: string): any {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired invite token');
        }
    }

    private generatePasswordResetToken(userId: string): string {
        const payload = { userId };
        return this.jwtService.sign(payload, { expiresIn: '1h' });
    }

    private async verifyPasswordResetToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException('Invalid or expired password reset token');
        }
    }
}