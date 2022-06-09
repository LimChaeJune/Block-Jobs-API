import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateEnterPriseDto {
  @IsString()
  @IsNotEmpty()
  enterpriseId: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  employees: string;

  thumbnail: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  address: string;
}
