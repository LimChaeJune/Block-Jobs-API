import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/typeorm/Account.entity';
import { AccountService } from './services/account/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
