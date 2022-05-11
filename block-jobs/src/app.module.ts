import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import emailConfig from './config/emailConfig';
import { EmailModule } from './email/email.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import entities from './typeorm/index.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'siwon1596!',
      database: 'blockjobs_db',
      entities: entities,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig],
    }),
    UsersModule,
    AccountModule,
    EnterpriseModule,
    EmailModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
