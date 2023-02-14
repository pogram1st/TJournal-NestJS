import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user-dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { Length } from "class-validator";
import { CommentEntity } from "../comment/entities/comment.entity";
import { SubscriptionsController } from "../subscriptions/subscriptions.controller";
import { SubscriptionEntity } from "../subscriptions/entities/subscription.entity";

@Injectable()
export class UserService {
  // Инжектим USerEntity для того чтобы не прописывать постоянно поля которые должны быть
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async create(dto: CreateUserDto) {
    return await this.repository.save(dto);
  }

  async findAll() {
    const qb = await this.repository
      .createQueryBuilder("a")
      .select("a.id")
      .addSelect("a.fullName")
      .addSelect("a.email")
      .addSelect("a.createdAt")
      .addSelect("a.updatedAt")
      .leftJoinAndMapMany(
        "a.subscriptions",
        SubscriptionEntity,
        "subscriptions",
        "a.id = subscriptions.channel.id"
      )
      .loadRelationCountAndMap(
        "a.subscriptionsCount",
        "a.subscriptions",
        "subscriptions"
      )
      .getMany();

    return qb.map((item) => {
      delete item.subscriptions;
      return item;
    });

    // return this.repository.find({
    //   select: { id: true, fullName: true, email: true, createdAt: true },
    //   relations: ["subscriptions", "subscribe"],
    //   order: {

    //   }
    // });
  }

  findById(id: number) {
    return this.repository.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      relations: ["subscriptions", "subscribe"],
    });
  }

  findByEmail(email: string) {
    return this.repository.findOne({
      where: { email },
      relations: ["subscriptions", "subscribe"],
    });
  }

  findByCond(cond: LoginUserDto) {
    return this.repository.findOneBy(cond);
  }

  async search(dto: SearchUserDto) {
    const qb = this.repository.createQueryBuilder("user");
    qb.limit(dto.limit || 0);
    qb.take(dto.take || 10);
    if (dto.email) {
      qb.andWhere(`user.email ILIKE :email`);
    }
    if (dto.fullName) {
      qb.andWhere(`user.fullName ILIKE :fullName`);
    }
    qb.setParameters({
      email: `%${dto.email}%`,
      fullName: `%${dto.fullName}%`,
    });

    const [items, total] = await qb.getManyAndCount();
    return {
      items: items,
      total,
    };
  }

  async update(id: number, dto: UpdateUserDto) {
    console.log(dto);
    const { password, newPassword, ...data } = dto;
    const newDto = { ...data, password: newPassword };
    const user = await this.repository.findOneBy({ id });
    if (password && password !== "") {
      if (dto.password === user.password) {
        if (newPassword.length < 6) {
          return new BadRequestException(
            "Длина нового пароля должна быть более 6 символов!!!"
          );
        }
        return this.repository.update(id, newDto);
      } else {
        return new BadRequestException("Старый пароль введен не верно!!!");
      }
    }
    return this.repository.update(id, { ...data });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
