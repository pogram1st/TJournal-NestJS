import { SubscriptionsService } from "./subscriptions.service";
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    subscribe(userId: number, channelId: number): Promise<{
        message: string;
        unSub: Promise<import("typeorm").DeleteResult>;
        sub?: undefined;
    } | {
        message: string;
        sub: {
            channel: {
                id: any;
            };
            subscriber: {
                id: any;
            };
        } & import("./entities/subscription.entity").SubscriptionEntity;
        unSub?: undefined;
    }>;
    getAllSubscriptionsUser(id: number): Promise<import("./entities/subscription.entity").SubscriptionEntity[]>;
    getAllSubscribersUser(id: number): Promise<import("./entities/subscription.entity").SubscriptionEntity[]>;
}
