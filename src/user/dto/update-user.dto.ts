import { IsEmail, Length } from "class-validator";

export class UpdateUserDto {
  @Length(2, 60, { message: "Введите имя и фамилию" })
  fullName: string;

  @IsEmail(undefined, { message: "Неверный формат почты" })
  email: string;

  password?: string;

  newPassword?: string;
}
