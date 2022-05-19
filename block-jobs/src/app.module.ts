import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import emailConfig from './config/emailConfig';
import { EmailModule } from './email/email.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { validationSchema } from './config/validationSchema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
      validationSchema: validationSchema,
    }),
    DatabaseModule,
    AuthenticationModule,
    EmailModule,
    UsersModule,
    AccountModule,
    EnterpriseModule,
  ],
  controllers: [],
})
export class AppModule {}
