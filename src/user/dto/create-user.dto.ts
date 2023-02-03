import { IsEmail, Length } from 'class-validator';
//Валидация
export class CreateUserDto {
  @Length(2, 60, { message: 'Введите имя и фамилию' })
  fullName: string;

  @IsEmail(undefined, { message: 'Неверный формат почты' })
  email: string;

  password?: string;
}
