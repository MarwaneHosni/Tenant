declare const RefreshTokenStrategy_base: new (...args: any) => any;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(payload: any): Promise<{
        userId: any;
    }>;
}
export {};
