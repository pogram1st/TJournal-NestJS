import { UserEntity } from "../../user/entities/user.entity";
import { OutputBlockData } from "../dto/create-post.dto";
import { CommentEntity } from "../../comment/entities/comment.entity";
export declare class PostEntity {
    id: number;
    title: string;
    body: OutputBlockData[];
    tags?: string;
    description?: string;
    user: UserEntity;
    comments: CommentEntity[];
    views: number;
    createdAt: Date;
    updatedAt: Date;
}
