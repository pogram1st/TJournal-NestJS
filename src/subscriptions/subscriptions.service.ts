import { Injectable } from "@nestjs/common";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SubscriptionEntity } from "./entities/subscription.entity";

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private repository: Repository<SubscriptionEntity>
  ) {}

  async subscribe(userId, channelId) {
    const repo = await this.repository.findOne({
      where: {
        subscriber: { id: userId },
        channel: { id: channelId },
      },
    });
    if (repo) {
      this.repository.delete(repo.id);
      return { message: "Unsubscribe" };
    } else {
      const sub = await this.repository.save({
        channel: { id: channelId },
        subscriber: { id: userId },
      });
      return { message: "Subscribe" };
    }
  }

  async getAllSubscriptionsUser(userId) {
    const sub = await this.repository.find({
      select: {
        id: true,
        channel: { id: true, fullName: true },
      },
      where: { subscriber: { id: userId } },
    });
    const arr = sub.map((item) => {
      delete item.channel.password;
      delete item.subscriber.password;
      return item;
    });
    return sub;
  }

  async getAllSubscribersUser(userId) {
    const sub = await this.repository.find({
      select: {
        id: true,
        channel: { id: true, fullName: true },
      },
      where: { channel: { id: userId } },
    });
    const arr = sub.map((item) => {
      delete item.channel.password;
      delete item.subscriber.password;
      return item;
    });
    return sub;
  }
}
