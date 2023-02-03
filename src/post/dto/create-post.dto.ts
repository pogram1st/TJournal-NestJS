import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export interface OutputBlockData {
  id?: string;
  type: "paragraph" | string;
  data: { text: string };
}

export class CreatePostDto {
  @IsString()
  title: string;

  @IsArray()
  body: OutputBlockData[];

  @IsOptional()
  @IsString()
  tags?: string;
}
