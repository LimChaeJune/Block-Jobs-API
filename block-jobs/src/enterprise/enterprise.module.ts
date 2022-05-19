import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { EnterpriseEntity } from 'src/typeorm/Enterprise.entity';
import { EnterpiseController } from './controllers/enterpise/enterpise.controller';
import { EnterpriseService } from './services/enterpise/enterpise.service';

@Module({
  imports: [
    ConfigModule,
    AuthenticationModule,
    AccountModule,
    TypeOrmModule.forFeature([EnterpriseEntity]),
  ],
  controllers: [EnterpiseController],
  providers: [EnterpriseService, ConfigService],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}
