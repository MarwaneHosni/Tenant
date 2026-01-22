export declare class CreateAuditDto {
    entityType: string;
    entityId: string;
    action: string;
    oldValues?: any;
    newValues?: any;
    ipAddress?: string;
}
