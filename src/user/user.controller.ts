import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { SearchUserDto } from "./dto/search-user.dto";

import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";
import { Query } from "@nestjs/common/decorators";
import { User } from "../decorators/user.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get("me")
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch("update")
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.userService.update(req.user.id, updateUserDto);
    } catch (err) {
      return { err, message: "Не удалось обновиь информацию о пользователе" };
    }
  }

  @Get("/search")
  search(@Query() dto: SearchUserDto) {
    return this.userService.search(dto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
