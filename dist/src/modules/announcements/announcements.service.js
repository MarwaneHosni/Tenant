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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma.service");
let AnnouncementsService = class AnnouncementsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (!['MANAGER', 'OWNER', 'ADMIN'].includes(user.userType)) {
            throw new common_1.ForbiddenException('Only MANAGER/OWNER/ADMIN can create announcements');
        }
        return this.prisma.announcement.create({
            data: {
                title: dto.title,
                content: dto.content,
                type: dto.type,
                requiresAcknowledgement: dto.requiresAcknowledgement ?? false,
                organizationId: user.organizationId,
                propertyId: dto.propertyId,
                createdBy: user.id,
                expiresAt: dto.expiresAt,
            },
        });
    }
    async getAll(user) {
        return this.prisma.announcement.findMany({
            where: {
                organizationId: user.organizationId,
                OR: [{ propertyId: null }, { propertyId: { not: null } }],
            },
            include: { acknowledgements: true },
            orderBy: { publishedAt: 'desc' },
        });
    }
    async getById(id, user) {
        const ann = await this.prisma.announcement.findFirst({
            where: { id, organizationId: user.organizationId },
            include: { acknowledgements: true },
        });
        if (!ann)
            throw new common_1.NotFoundException('Announcement not found');
        return ann;
    }
    async acknowledge(dto, user) {
        const announcement = await this.prisma.announcement.findFirst({
            where: { id: dto.announcementId, organizationId: user.organizationId },
        });
        if (!announcement)
            throw new common_1.NotFoundException('Announcement not found');
        return this.prisma.acknowledgement.upsert({
            where: { announcementId_userId: { announcementId: dto.announcementId, userId: user.id } },
            update: { acknowledgedAt: new Date() },
            create: { announcementId: dto.announcementId, userId: user.id },
        });
    }
};
exports.AnnouncementsService = AnnouncementsService;
exports.AnnouncementsService = AnnouncementsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnnouncementsService);
//# sourceMappingURL=announcements.service.js.map