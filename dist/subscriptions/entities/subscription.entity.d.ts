import { UserEntity } from "../../user/entities/user.entity";
export declare class SubscriptionEntity {
    id: number;
    channel: UserEntity;
    subscriber: UserEntity;
}
