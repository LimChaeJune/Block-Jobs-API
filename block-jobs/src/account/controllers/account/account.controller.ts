import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from 'src/account/services/account/account.service';
import { AccountEntity } from 'src/typeorm/Account.entity';

@Controller('account')
@ApiTags('지갑 API')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @ApiOperation({
    summary: '유저 조회 API',
    description: '해당 지갑의 유저가 있는지 조회한다.',
  })
  @Get('checkaccount/:account')
  async CheckAccount(@Param('account') params: string): Promise<AccountEntity> {
    return await this.accountService.accountCheckExist(params);
  }
}
