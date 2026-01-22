import { SubscriptionTier } from '@prisma/client';
export declare class CreateOrganizationDto {
    name: string;
    slug: string;
    address?: string;
    phone?: string;
    email?: string;
    tier?: SubscriptionTier;
}
