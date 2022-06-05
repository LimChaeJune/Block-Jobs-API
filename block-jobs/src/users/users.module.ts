import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from 'src/account/account.module';
import { AuthenticationModule } from 'src/authentication/authentication.module';
import { EmailModule } from 'src/email/email.module';
import { UserCareerEntity } from 'src/typeorm/Career.entity';
import { UserCertificationEntity } from 'src/typeorm/Certification.entity';
import { UserEducationEntity } from 'src/typeorm/Education.entity';
import { UserPortfolioEntity } from 'src/typeorm/Portfolio.entity';
import { UserResumeEntity } from 'src/typeorm/Resume.entity';
import { UserEntity } from 'src/typeorm/User.entity';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [
    EmailModule,
    AuthenticationModule,
    AccountModule,
    TypeOrmModule.forFeature([
      UserEntity,
      UserResumeEntity,
      UserPortfolioEntity,
      UserCertificationEntity,
      UserCareerEntity,
      UserEducationEntity,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
