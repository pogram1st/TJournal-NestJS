import { SubscriptionEntity } from "../../subscriptions/entities/subscription.entity";
export declare class UserEntity {
    id: number;
    fullName: string;
    email: string;
    password?: string;
    subscriptions: SubscriptionEntity[];
    subscribe: SubscriptionEntity[];
    createdAt: Date;
    updatedAt: Date;
}
