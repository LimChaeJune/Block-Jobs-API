import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountModule } from 'src/account/account.module';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';

@Module({
  imports: [AccountModule, ConfigService],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
