import { IsEmail, IsEmpty, Length } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
//Валидация

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Неверный формат почты' })
  email: string;

  password?: string;
}
