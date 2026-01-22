import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }>;
    findByEmail(email: string): Promise<({
        userRoles: ({
            role: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
            };
        } & {
            organizationId: string;
            userId: string;
            assignedAt: Date;
            roleId: string;
        })[];
    } & {
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }) | null>;
    validateUser(email: string, password: string): Promise<{
        userRoles: ({
            role: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
            };
        } & {
            organizationId: string;
            userId: string;
            assignedAt: Date;
            roleId: string;
        })[];
    } & {
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }>;
    create(dto: CreateUserDto): Promise<{
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        phone: string | null;
        email: string;
        createdAt: Date;
        isActive: boolean;
        passwordHash: string;
        firstName: string;
        lastName: string;
        userType: import("@prisma/client").$Enums.UserType;
        lastLogin: Date | null;
    }>;
    getUserRoles(user: any): any;
}
