"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const subscription_entity_1 = require("./subscriptions/entities/subscription.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const post_module_1 = require("./post/post.module");
const post_entity_1 = require("./post/entities/post.entity");
const comment_module_1 = require("./comment/comment.module");
const comment_entity_1 = require("./comment/entities/comment.entity");
const auth_module_1 = require("./auth/auth.module");
const subscriptions_module_1 = require("./subscriptions/subscriptions.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                ssl: true,
                type: "postgres",
                host: "dpg-ci6le5unqql0ld99b5i0-a.frankfurt-postgres.render.com",
                port: 5432,
                username: "adminchik",
                password: "PIHblTAa9wYmXPvxA51MbfYMY3V51Bdg",
                database: "tjournal_hn9f",
                entities: [user_entity_1.UserEntity, post_entity_1.PostEntity, comment_entity_1.CommentEntity, subscription_entity_1.SubscriptionEntity],
                synchronize: true,
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            comment_module_1.CommentModule,
            auth_module_1.AuthModule,
            subscriptions_module_1.SubscriptionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map