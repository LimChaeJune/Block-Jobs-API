import { IsNotEmpty, IsString } from 'class-validator';
import { AccountUserType } from 'src/typeorm/Account.entity';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountAddress: string;

  // @IsString()
  // @IsNotEmpty()
  // accountProvider: string;

  accountUserType: AccountUserType;
}
