import { BadRequestException, Body, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "../user/entities/user.entity";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ForbiddenTransactionModeOverrideError } from "typeorm";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  generateJwtToken(data: { id: number; email: string }) {
    const payload = {
      id: data.id,
      email: data.email,
    };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond({ email, password });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      access_token: this.generateJwtToken(userData),
      ...userData,
    };
  }

  async register(@Body() dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.usersService
        .create({
          fullName: dto.fullName,
          email: dto.email,
          password: dto.password,
        })
        .catch((e) => {
          if (/(email)[\s\S]+(already exists)/.test(e.detail)) {
            throw new BadRequestException(
              "Пользователь с такой почтой уже сущевствует"
            );
            return e;
          }
        });
      return {
        ...user,
        access_token: this.generateJwtToken(user),
      };
    } catch (err) {
      throw new BadRequestException(
        "Пользователь с такой почтой уже сущевствует"
      );
    }
  }
}
