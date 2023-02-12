import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    generateJwtToken(data: {
        id: number;
        email: string;
    }): string;
    validateUser(email: string, password: string): Promise<any>;
    login(user: UserEntity): Promise<{
        id: number;
        fullName: string;
        email: string;
        subscriptions: import("../subscriptions/entities/subscription.entity").SubscriptionEntity[];
        subscribe: import("../subscriptions/entities/subscription.entity").SubscriptionEntity[];
        createdAt: Date;
        updatedAt: Date;
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<any>;
}
