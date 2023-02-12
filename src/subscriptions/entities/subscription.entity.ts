import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity("subscriptions")
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  @JoinColumn({ name: "channelId" })
  channel: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: false, eager: true })
  @JoinColumn({ name: "subscriberId" })
  subscriber: UserEntity;
}
