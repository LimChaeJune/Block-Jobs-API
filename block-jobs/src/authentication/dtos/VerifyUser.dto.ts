import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUserDto {
  @IsString()
  @IsNotEmpty()
  accountAddress: string;

  @IsString()
  @IsNotEmpty()
  accountProvider: string;
}
