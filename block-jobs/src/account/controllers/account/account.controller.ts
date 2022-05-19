import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AccountService } from 'src/account/services/account/account.service';
import { AccountEntity } from 'src/typeorm/Account.entity';
import { CreateAccountDto } from 'src/users/dtos/CreateAccount.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('checkaccount/:account')
  async CheckAccount(@Param('account') params: string): Promise<boolean> {
    return await this.accountService.accountCheckExist(params);
  }
}
