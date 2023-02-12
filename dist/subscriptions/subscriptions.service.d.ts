import { Repository } from "typeorm";
import { SubscriptionEntity } from "./entities/subscription.entity";
export declare class SubscriptionsService {
    private repository;
    constructor(repository: Repository<SubscriptionEntity>);
    subscribe(userId: any, channelId: any): Promise<{
        message: string;
    }>;
    getAllSubscriptionsUser(userId: any): Promise<SubscriptionEntity[]>;
    getAllSubscribersUser(userId: any): Promise<SubscriptionEntity[]>;
}
