import { Controller, Get, Param } from '@nestjs/common';
import { AccountService } from 'src/account/services/account/account.service';
import { AccountEntity } from 'src/typeorm/Account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('checkaccount/:account')
  async CheckAccount(@Param('account') params: string): Promise<AccountEntity> {
    return await this.accountService.accountCheckExist(params);
  }
}
