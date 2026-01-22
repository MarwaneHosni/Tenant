import { Priority } from '@prisma/client';
export declare class CreateMaintenanceRequestDto {
    unitId: string;
    title: string;
    description: string;
    priority?: Priority;
}
