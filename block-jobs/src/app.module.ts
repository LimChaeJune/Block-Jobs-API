import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import emailConfig from './config/emailConfig';
import { EmailModule } from './email/email.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthenticationService } from './authentication/services/authentication/authentication.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.development.env`],
      load: [emailConfig],
    }),
    AuthenticationModule,
    DatabaseModule,
    EmailModule,
    UsersModule,
    AccountModule,
    EnterpriseModule,
  ],
  controllers: [],
})
export class AppModule {}
