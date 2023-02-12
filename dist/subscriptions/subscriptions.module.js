"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionsModule = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("./subscriptions.service");
const subscriptions_controller_1 = require("./subscriptions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const subscription_entity_1 = require("./entities/subscription.entity");
let SubscriptionsModule = class SubscriptionsModule {
};
SubscriptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([subscription_entity_1.SubscriptionEntity])],
        controllers: [subscriptions_controller_1.SubscriptionsController],
        providers: [subscriptions_service_1.SubscriptionsService],
        exports: [subscriptions_service_1.SubscriptionsService],
    })
], SubscriptionsModule);
exports.SubscriptionsModule = SubscriptionsModule;
//# sourceMappingURL=subscriptions.module.js.map