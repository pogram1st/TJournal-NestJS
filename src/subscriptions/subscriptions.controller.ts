import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionDto } from "./dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "./dto/update-subscription.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth-guard";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { User } from "../decorators/user.decorator";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post(":channelId")
  async subscribe(
    @User() userId: number,
    @Param("channelId") channelId: number
  ) {
    return this.subscriptionsService.subscribe(+userId, +channelId);
  }

  @Get(":id")
  async getAllSubscriptionsUser(@Param("id") id: number) {
    return this.subscriptionsService.getAllSubscriptionsUser(+id);
  }

  @Get("sub/:id")
  async getAllSubscribersUser(@Param("id") id: number) {
    return this.subscriptionsService.getAllSubscriptionsUser(+id);
  }
}
