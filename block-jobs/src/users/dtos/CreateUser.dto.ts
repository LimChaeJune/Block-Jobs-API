import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @Length(26, 35)
  @IsNotEmpty()
  accountAddress: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  created: Date;
}
