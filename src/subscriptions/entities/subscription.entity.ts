import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { UserEntity } from "../../user/entities/user.entity";

@Entity("subscriptions")
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({ name: "channelId" })
  channel: UserEntity;

  @ManyToOne(() => UserEntity, { cascade: true, eager: true })
  @JoinColumn({ name: "subscriberId" })
  subscriber: UserEntity;
}
