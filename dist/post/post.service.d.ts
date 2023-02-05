import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PostEntity } from "./entities/post.entity";
import { Repository } from "typeorm";
import { SearchPostDto } from "./dto/search-post.dto";
export declare class PostService {
    private repository;
    constructor(repository: Repository<PostEntity>);
    create(dto: CreatePostDto, userId: number): Promise<{
        title: string;
        body: import("./dto/create-post.dto").OutputBlockData[];
        user: {
            id: number;
        };
        tags: string;
        description: string;
    } & PostEntity>;
    findAll(): Promise<PostEntity[]>;
    findPostsUser(userId: any): Promise<PostEntity[]>;
    popular(): Promise<{
        items: PostEntity[];
        total: number;
    }>;
    search(dto: SearchPostDto): Promise<{
        items: PostEntity[];
        total: number;
    }>;
    findOne(id: number): Promise<PostEntity>;
    update(id: number, dto: UpdatePostDto, userId: number): Promise<import("typeorm").UpdateResult>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
}
