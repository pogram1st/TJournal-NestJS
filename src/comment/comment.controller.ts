import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { User } from "../decorators/user.decorator";
import { UserEntity } from "../user/entities/user.entity";
import { JwtAuthGuard } from "../auth/guards/jwt-auth-guard";

@Controller("comments")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @User() user: number) {
    console.log(user);
    return this.commentService.create(createCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get("/post/:id")
  findAllByPostId(@Param("id") id: number) {
    return this.commentService.findAllByPostId(id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.commentService.remove(+id);
  }
}
