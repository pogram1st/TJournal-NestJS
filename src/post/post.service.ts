import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "./entities/post.entity";
import { Repository } from "typeorm";
import { SearchPostDto } from "./dto/search-post.dto";
import { CommentEntity } from "../comment/entities/comment.entity";

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>
  ) {}

  create(dto: CreatePostDto, userId: number) {
    const firstParagraph = dto.body.find((obj) => obj.type === "paragraph")
      ?.data.text;
    return this.repository.save({
      title: dto.title,
      body: dto.body,
      user: { id: userId },
      tags: dto.tags,
      description: firstParagraph || "",
    });
  }

  async findAll() {
    const posts = await this.repository.find({
      order: { createdAt: "DESC" },
      relations: ["comments"],
    });
    return posts.map((obj) => {
      delete obj.user.password;
      return obj;
    });
  }

  async findPostsUser(userId) {
    const posts = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ["comments"],
    });
    return posts.map((obj) => {
      delete obj.user.password;
      return obj;
    });
  }

  async popular() {
    const qb = await this.repository.createQueryBuilder();
    qb.orderBy("views", "DESC");
    qb.limit(10);

    const [posts, total] = await qb.getManyAndCount();
    return {
      items: posts,
      total,
    };
  }

  async search(dto: SearchPostDto) {
    const qb = this.repository.createQueryBuilder("p");
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.views === "ASK") {
      qb.orderBy("views", "ASC");
    } else {
      qb.orderBy("views", "DESC");
    }
    if (dto.title) {
      qb.andWhere(`p.title ILIKE :title`);
    }
    if (dto.body) {
      qb.andWhere(`p.body ILIKE :body`);
    }

    if (dto.tag) {
      qb.andWhere(`p.tags ILIKE :tag`);
    }
    qb.setParameters({
      title: `%${dto.title}%`,
      body: `%${dto.body}%`,
      tag: `%${dto.tag}%`,
    });

    const [items, total] = await qb.getManyAndCount();
    return {
      items: items,
      total,
    };
  }

  async findOne(id: number) {
    await this.repository
      .createQueryBuilder("posts")
      .whereInIds(id)
      .update()
      .set({ views: () => "views + 1" })
      .execute();
    const post = await this.repository.findOneBy({ id });
    delete post.user.password;
    return post;
  }

  async update(id: number, dto: UpdatePostDto, userId: number) {
    const firstParagraph = dto.body.find((obj) => obj.type === "paragraph")
      ?.data.text;
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException("Статья не найдена");
    }
    if (find.user.id !== userId) {
      throw new ForbiddenException("Нет доступа к этой статье");
    }
    return this.repository.update(id, {
      title: dto.title,
      body: dto.body,
      tags: dto.tags,
      description: firstParagraph || "",
    });
  }

  async remove(id: number, userId: number) {
    const find = await this.repository.findOneBy({ id });
    if (!find) {
      throw new NotFoundException("Статья не найдена");
    }
    return this.repository.delete(id);
  }
}
