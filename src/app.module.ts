import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { PrismaModule } from './database/prisma.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { AuditModule } from './modules/audit/audit.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { UnitsModule } from './modules/units/units.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { LeasesModule } from './modules/leases/leases.module';
import { MaintenanceModule } from './modules/maintenance/maintenance.module';


@Module({
  imports: [AuthModule, UsersModule, OrganizationsModule, PrismaModule, AnnouncementsModule, AuditModule, PropertiesModule, UnitsModule, PaymentsModule, LeasesModule, MaintenanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
