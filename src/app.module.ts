import { SubscriptionEntity } from "./subscriptions/entities/subscription.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { UserEntity } from "./user/entities/user.entity";
import { PostModule } from "./post/post.module";
import { PostEntity } from "./post/entities/post.entity";
import { CommentModule } from "./comment/comment.module";
import { CommentEntity } from "./comment/entities/comment.entity";
import { AuthModule } from "./auth/auth.module";
import { SubscriptionsModule } from "./subscriptions/subscriptions.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ssl: true,
      type: "postgres",
      host: "dpg-ci6le5unqql0ld99b5i0-a.frankfurt-postgres.render.com",
      port: 5432,
      username: "adminchik",
      password: "PIHblTAa9wYmXPvxA51MbfYMY3V51Bdg",
      database: "tjournal_hn9f",
      entities: [UserEntity, PostEntity, CommentEntity, SubscriptionEntity], // Передаем в зависимости Entity
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
