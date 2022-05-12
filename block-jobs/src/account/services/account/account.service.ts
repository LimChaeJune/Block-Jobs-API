import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/typeorm/Account.entity';
import { CreateAccountDto } from 'src/users/dtos/CreateAccount.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>,
  ) {}

  async registerAccount(
    createAccount: CreateAccountDto,
  ): Promise<AccountEntity> {
    const exist = await this.accountCheckExist(createAccount.accountAddress);
    if (!exist)
      throw new HttpException(
        '해당 지갑을 가지고있는 유저가 있습니다.',
        HttpStatus.BAD_REQUEST,
      );

    const account = new AccountEntity();
    account.accountAddress = createAccount.accountAddress;
    account.accountProvider = createAccount.accountProvider;
    account.userType = createAccount.accountUserType;

    const newAccount = this.accountRepository.save(account);

    return newAccount;
  }

  private async accountCheckExist(address: string): Promise<boolean> {
    const account = this.accountRepository.findOne({
      accountAddress: address,
    });
    return account !== undefined;
  }
}
