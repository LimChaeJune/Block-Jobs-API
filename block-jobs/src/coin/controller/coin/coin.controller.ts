import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCoinDto } from 'src/coin/dto/createCoinDto';
import { CoinService } from 'src/coin/services/coin/coin.service';
import { UserCoinReceiptEntity } from 'src/typeorm/Coin.entity';

@Controller('coin')
@ApiTags('코인 내역 API')
export class CoinController {
  constructor(private readonly coinservice: CoinService) {}

  @ApiOperation({
    summary: '코인 내역조회 ',
    description: '지갑 기준으로 코인 내역을 조회한다.',
  })
  @Get('getCoins/:address')
  async CoinAccount(
    @Param('address') params: string,
  ): Promise<UserCoinReceiptEntity[]> {
    return await this.coinservice.GetCoinListByAddress(params);
  }
  @ApiOperation({
    summary: '코인 삽입 ',
    description: '코인 데이터를 삽입한다.',
  })
  @UsePipes(ValidationPipe)
  @Post('insert')
  async InsertCoin(@Body() createDto: CreateCoinDto) {
    await this.coinservice.InsertCoinItem(createDto);
  }
}
