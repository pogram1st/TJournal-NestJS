import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
export declare class CommentService {
    private repository;
    constructor(repository: Repository<CommentEntity>);
    create(dto: CreateCommentDto, userId: number): Promise<CommentEntity>;
    findAll(): Promise<CommentEntity[]>;
    findCommUser(id: number): Promise<CommentEntity[]>;
    findAllByPostId(id: number): Promise<{
        items: CommentEntity[];
    }>;
    findOne(id: number): Promise<CommentEntity>;
    update(id: number, dto: UpdateCommentDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
