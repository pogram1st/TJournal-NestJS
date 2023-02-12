import { Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(payload: {
        sub: number;
        email: string;
    }): Promise<{
        id: number;
        fullName: string;
        email: string;
        subscriptions: import("../../subscriptions/entities/subscription.entity").SubscriptionEntity[];
        subscribe: import("../../subscriptions/entities/subscription.entity").SubscriptionEntity[];
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
