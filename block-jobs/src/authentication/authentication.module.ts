import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccountModule } from 'src/account/account.module';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { AuthenticationService } from './services/authentication/authentication.service';

@Module({
  imports: [AccountModule, ConfigModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ConfigService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
