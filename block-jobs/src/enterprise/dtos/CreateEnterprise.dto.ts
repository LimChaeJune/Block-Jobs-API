import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  isString,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateAccountDto } from 'src/users/dtos/CreateAccount.dto';

export class CreateEnterPriseDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  account: CreateAccountDto;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @MaxLength(80)
  @IsNotEmpty()
  businessNumber: string;

  @IsInt()
  @IsNotEmpty()
  employees: number;

  @IsString()
  @MaxLength(120)
  @IsNotEmpty()
  thumbnail: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  address: string;

  @IsString()
  @MaxLength(36)
  @IsNotEmpty()
  industryId: string;
}
