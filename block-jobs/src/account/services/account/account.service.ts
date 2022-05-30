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
    console.log(exist);
    if (exist)
      throw new HttpException(
        '해당 지갑을 가지고있는 유저가 있습니다.',
        HttpStatus.BAD_REQUEST,
      );

    const account = new AccountEntity();
    account.accountAddress = createAccount.accountAddress;
    account.userType = createAccount.accountUserType;

    const newAccount = this.accountRepository.save(account);

    return newAccount;
  }

  async findAccount(address: string): Promise<AccountEntity> {
    console.log(address);
    const account = await this.accountRepository.findOne({
      accountAddress: address,
    });
    return account;
  }

  async accountCheckExist(address: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne(
      {
        accountAddress: address,
      },
      {
        relations: ['user', 'user.job', 'user.profile', 'enterprise'],
      },
    );
    return account;
  }
}
