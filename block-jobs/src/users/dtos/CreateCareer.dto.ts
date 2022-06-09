import {
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCareerDto {
  @IsNotEmpty()
  userId: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  companyAddress: string;

  stDt: Date;

  fnsDt: Date;

  @IsString()
  roles: string;
}
