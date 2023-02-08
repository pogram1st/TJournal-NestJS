import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user-dto";
import { SearchUserDto } from "./dto/search-user.dto";
export declare class UserService {
    private repository;
    constructor(repository: Repository<UserEntity>);
    create(dto: CreateUserDto): Promise<CreateUserDto & UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    findByCond(cond: LoginUserDto): Promise<UserEntity>;
    search(dto: SearchUserDto): Promise<{
        items: UserEntity[];
        total: number;
    }>;
    update(id: number, dto: UpdateUserDto): Promise<import("typeorm").UpdateResult | Error>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
