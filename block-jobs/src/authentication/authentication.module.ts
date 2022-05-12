import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { UsersModule } from 'src/users/users.module';
import { AuthenticationService } from './services/authentication/authentication.service';

@Module({
  imports: [AccountModule, UsersModule],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
