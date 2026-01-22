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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    const org1 = await prisma.organization.upsert({
        where: { slug: 'alpha-corp' },
        update: {},
        create: {
            name: 'Alpha Corp',
            slug: 'alpha-corp',
            email: 'contact@alpha.com',
            phone: '1234567890',
            tier: 'ENTERPRISE',
        },
    });
    const org2 = await prisma.organization.upsert({
        where: { slug: 'beta-ltd' },
        update: {},
        create: {
            name: 'Beta Ltd',
            slug: 'beta-ltd',
            email: 'contact@beta.com',
            tier: 'PROFESSIONAL',
        },
    });
    const roles = ['ADMIN', 'OWNER', 'MANAGER', 'TENANT', 'TECHNICIAN'];
    const roleRecords = {};
    for (const name of roles) {
        const r = await prisma.role.upsert({
            where: { name },
            update: {},
            create: { name },
        });
        roleRecords[name] = r;
    }
    const permissions = [
        { resource: 'organization', action: 'read' },
        { resource: 'organization', action: 'write' },
        { resource: 'user', action: 'read' },
        { resource: 'user', action: 'write' },
        { resource: 'property', action: 'read' },
        { resource: 'property', action: 'write' },
    ];
    const permissionRecords = {};
    for (const perm of permissions) {
        const p = await prisma.permission.upsert({
            where: { resource_action: { resource: perm.resource, action: perm.action } },
            update: {},
            create: perm,
        });
        permissionRecords[`${perm.resource}_${perm.action}`] = p;
    }
    await prisma.rolePermission.createMany({
        data: [
            { roleId: roleRecords['ADMIN'].id, permissionId: permissionRecords['organization_read'].id },
            { roleId: roleRecords['ADMIN'].id, permissionId: permissionRecords['organization_write'].id },
            { roleId: roleRecords['MANAGER'].id, permissionId: permissionRecords['property_read'].id },
            { roleId: roleRecords['MANAGER'].id, permissionId: permissionRecords['property_write'].id },
        ],
        skipDuplicates: true,
    });
    const passwordHash = await bcrypt.hash('Password123!', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            passwordHash,
            firstName: 'Super',
            lastName: 'Admin',
            userType: 'ADMIN',
        },
    });
    const managerUser = await prisma.user.upsert({
        where: { email: 'manager@example.com' },
        update: {},
        create: {
            email: 'manager@example.com',
            passwordHash,
            firstName: 'Alice',
            lastName: 'Manager',
            userType: 'MANAGER',
        },
    });
    const tenantUser = await prisma.user.upsert({
        where: { email: 'tenant@example.com' },
        update: {},
        create: {
            email: 'tenant@example.com',
            passwordHash,
            firstName: 'Bob',
            lastName: 'Tenant',
            userType: 'TENANT',
        },
    });
    await prisma.userRole.createMany({
        data: [
            { userId: adminUser.id, roleId: roleRecords['ADMIN'].id, organizationId: org1.id },
            { userId: managerUser.id, roleId: roleRecords['MANAGER'].id, organizationId: org1.id },
            { userId: tenantUser.id, roleId: roleRecords['TENANT'].id, organizationId: org1.id },
        ],
        skipDuplicates: true,
    });
    let prop1 = await prisma.property.findFirst({
        where: { name: 'Sunset Apartments' },
    });
    if (!prop1) {
        prop1 = await prisma.property.create({
            data: {
                name: 'Sunset Apartments',
                organizationId: org1.id,
                address: '123 Main St',
                city: 'Metropolis',
                state: 'NY',
                zipCode: '10001',
                type: 'RESIDENTIAL',
                totalUnits: 2,
            },
        });
    }
    const unit1 = await prisma.unit.upsert({
        where: { propertyId_unitNumber: { propertyId: prop1.id, unitNumber: '101' } },
        update: {},
        create: {
            propertyId: prop1.id,
            unitNumber: '101',
            sqft: 800,
            bedrooms: 2,
            bathrooms: 1,
            rentAmount: 1500,
        },
    });
    const unit2 = await prisma.unit.upsert({
        where: { propertyId_unitNumber: { propertyId: prop1.id, unitNumber: '102' } },
        update: {},
        create: {
            propertyId: prop1.id,
            unitNumber: '102',
            sqft: 900,
            bedrooms: 2,
            bathrooms: 2,
            rentAmount: 1700,
        },
    });
    const lease1 = await prisma.lease.upsert({
        where: { id: `${tenantUser.id}_${unit1.id}` },
        update: {},
        create: {
            unitId: unit1.id,
            tenantId: tenantUser.id,
            startDate: new Date('2026-02-01'),
            endDate: new Date('2027-01-31'),
            rentAmount: 1500,
            securityDeposit: 1500,
            status: 'DRAFT',
        },
    });
    await prisma.maintenanceRequest.create({
        data: {
            unitId: unit1.id,
            tenantId: tenantUser.id,
            title: 'Leaky Faucet',
            description: 'The kitchen faucet is leaking.',
            priority: 'MEDIUM',
        },
    });
    await prisma.announcement.create({
        data: {
            organizationId: org1.id,
            createdBy: managerUser.id,
            title: 'Welcome to Sunset Apartments',
            content: 'We are excited to have you!',
            type: 'GENERAL',
        },
    });
    console.log('✅ Seed completed');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map