import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        user: any;
        access_token: string;
    }>;
    register(dto: CreateUserDto): Promise<any>;
}
