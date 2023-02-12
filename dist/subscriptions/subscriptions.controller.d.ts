import { SubscriptionsService } from "./subscriptions.service";
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    subscribe(userId: number, channelId: number): Promise<{
        message: string;
    }>;
    getAllSubscriptionsUser(id: number): Promise<import("./entities/subscription.entity").SubscriptionEntity[]>;
    getAllSubscribersUser(id: number): Promise<import("./entities/subscription.entity").SubscriptionEntity[]>;
}
