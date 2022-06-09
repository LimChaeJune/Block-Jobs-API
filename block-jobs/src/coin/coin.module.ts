import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { AccountService } from 'src/account/services/account/account.service';
import { AccountEntity } from 'src/typeorm/Account.entity';
import { UserCoinReceiptEntity } from 'src/typeorm/Coin.entity';
import { CoinController } from './controller/coin/coin.controller';
import { CoinService } from './services/coin/coin.service';

@Module({
  imports: [
    AccountModule,
    TypeOrmModule.forFeature([AccountEntity, UserCoinReceiptEntity]),
  ],
  controllers: [CoinController],
  providers: [CoinService, AccountService],
})
export class CoinModule {}
