import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import emailConfig from './config/emailConfig';
import { EmailModule } from './email/email.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.development.env`],
      load: [emailConfig],
    }),
    DatabaseModule,
    UsersModule,
    AccountModule,
    EnterpriseModule,
    EmailModule,
    DatabaseModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
