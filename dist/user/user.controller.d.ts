import { UserService } from './user.service';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): any;
    findAll(): Promise<import("./entities/user.entity").UserEntity[]>;
    update(req: any, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult> | {
        err: any;
        message: string;
    };
    search(dto: SearchUserDto): Promise<{
        items: import("./entities/user.entity").UserEntity[];
        total: number;
    }>;
    findOne(id: string): Promise<import("./entities/user.entity").UserEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
