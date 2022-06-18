import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { EmailModule } from './email/email.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './config/database/database.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { validationSchema } from './config/validationSchema';
import { IndustryModule } from './industry/industry.module';
import { JobModule } from './job/job.module';
import { CoinModule } from './coin/coin.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      validationSchema: validationSchema,
    }),
    DatabaseModule,
    AuthenticationModule,
    EmailModule,
    UsersModule,
    AccountModule,
    EnterpriseModule,
    IndustryModule,
    JobModule,
    CoinModule,
  ],
  controllers: [],
})
export class AppModule {}
