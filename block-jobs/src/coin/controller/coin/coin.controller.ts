import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCoinDto } from 'src/coin/dto/createCoinDto';
import { CoinService } from 'src/coin/services/coin/coin.service';
import { UserCoinReceiptEntity } from 'src/typeorm/Coin.entity';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinservice: CoinService) {}

  @Get('getCoins/:address')
  async CoinAccount(
    @Param('address') params: string,
  ): Promise<UserCoinReceiptEntity[]> {
    return await this.coinservice.GetCoinListByAddress(params);
  }

  @UsePipes(ValidationPipe)
  @Post('insert')
  async InsertCoin(@Body() createDto: CreateCoinDto) {
    await this.coinservice.InsertCoinItem(createDto);
  }
}
