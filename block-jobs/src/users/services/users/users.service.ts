import { HttpException, Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/services/email.service';
import { User } from 'src/users/types/Users';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/User.entity';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/typeorm/Account.entity';
import { AccountService } from 'src/account/services/account/account.service';
import { IndustryEntity } from 'src/typeorm/Industry.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private emailservice: EmailService,
    private accountService: AccountService,
  ) {}

  async registerUser(createUser: CreateUserDto) {
    console.log(createUser);
    await this.userEmailCheck(createUser.email);
    const registerAccount = await this.accountService.registerAccount(
      createUser.account,
    );
    const user = new UserEntity();
    user.account = registerAccount;
    user.name = createUser.name;
    user.email = createUser.email;
    user.phone = createUser.phone;

    const industry = new IndustryEntity();
    industry.id = createUser.industryId;
    user.industry = industry;

    this.userRepository.save(user);

    // const signupVerifyToken = uuid.v1();

    // this.sendMemberJoinEmail(createUser.email, signupVerifyToken);
  }

  private async userEmailCheck(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email: email });

    return user !== undefined;
  }

  private async saveEntityUser(user: UserEntity) {
    await this.userRepository.save(user);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    this.emailservice.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
