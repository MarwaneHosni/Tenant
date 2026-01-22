import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string) {
  return this.prisma.user.findUnique({
    where: { email },
    include: { userRoles: { include: { role: true } } },
  });
}

async validateUser(email: string, password: string) {
  const user = await this.findByEmail(email);
  if (!user || !user.isActive) throw new UnauthorizedException();

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new UnauthorizedException();

  return user;
}

  async create(dto: CreateUserDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        userType: dto.userType,
      },
    });
  }

  async update(id: string, dto: UpdateUserDto) {
    const data: any = { ...dto };
    if (dto.password) {
      data.passwordHash = await bcrypt.hash(dto.password, 10);
      delete data.password;
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  getUserRoles(user) {
  return user.userRoles.map(ur => ur.role.name);
}
}
