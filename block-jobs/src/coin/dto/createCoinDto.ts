import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  MaxLength,
} from 'class-validator';
import { CoinType } from 'src/typeorm/Coin.entity';

export class CreateCoinDto {
  @IsNotEmptyObject()
  accountAddress: string;

  @MaxLength(200)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsNotEmpty()
  cointype: CoinType;
}
