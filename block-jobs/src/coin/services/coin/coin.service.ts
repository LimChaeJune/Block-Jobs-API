import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/services/account/account.service';
import { CreateCoinDto } from 'src/coin/dto/createCoinDto';
import { UserCoinReceiptEntity } from 'src/typeorm/Coin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(UserCoinReceiptEntity)
    private coinRepository: Repository<UserCoinReceiptEntity>,
    private accountService: AccountService,
  ) {}

  async GetCoinListByAddress(accountAddress: string) {
    return await this.coinRepository.find({
      where: {
        account: { accountAddress: accountAddress },
      },
    });
  }

  async InsertCoinItem(createDto: CreateCoinDto) {
    const account = await this.accountService.findAccount(
      createDto.accountAddress,
    );

    const coin = new UserCoinReceiptEntity();
    coin.account = account;
    coin.accountAddress = createDto.accountAddress;
    coin.description = createDto.description;
    coin.link = createDto.link;
    coin.cointype = createDto.cointype;

    await this.coinRepository.save(coin);
  }
}
