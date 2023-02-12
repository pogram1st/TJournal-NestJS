import { SubscriptionEntity } from "../../subscriptions/entities/subscription.entity";
import { JoinColumn } from "typeorm";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @OneToMany(
    () => SubscriptionEntity,
    (SubscriptionEntity) => SubscriptionEntity.channel,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "subscriptions" })
  subscriptions: SubscriptionEntity[];

  @OneToMany(
    () => SubscriptionEntity,
    (SubscriptionEntity) => SubscriptionEntity.subscriber,
    {
      onDelete: "CASCADE",
    }
  )
  @JoinColumn({ name: "subscribe" })
  subscribe: SubscriptionEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
