import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CommentEntity } from "./entities/comment.entity";
import { Repository } from "typeorm";
import { UserEntity } from "../user/entities/user.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>
  ) {}

  async create(dto: CreateCommentDto, userId: number) {
    const comment = await this.repository.save({
      text: dto.text,
      post: { id: dto.postId },
      user: { id: userId },
    });
    return this.repository.findOneBy({ id: comment.id });
  }

  async findAll() {
    const comments = await this.repository.find({
      order: { createdAt: "DESC" },
    });
    return comments.map((obj) => {
      delete obj.user.password;
      delete obj.post.user.password;
      return obj;
    });
  }

  async findAllByPostId(id: number) {
    const comments = await this.repository.find({
      order: { createdAt: "DESC" },
    });
    const newComm = comments
      .map((obj) => {
        if (obj.post.id === +id) {
          delete obj.user.password;
          delete obj.post.user.password;
          return obj;
        }
      })
      .filter((obj) => obj != null);
    return {
      items: newComm,
    };
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, dto: UpdateCommentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
