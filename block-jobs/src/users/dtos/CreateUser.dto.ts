import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAccountDto } from './CreateAccount.dto';

export class CreateUserDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  account: CreateAccountDto;

  @IsString()
  @IsNotEmpty()
  industryId: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  phone: string;
}
