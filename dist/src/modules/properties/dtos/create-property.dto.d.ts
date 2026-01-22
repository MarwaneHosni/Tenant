import { PropertyType } from '@prisma/client';
export declare class CreatePropertyDto {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    type: PropertyType;
}
