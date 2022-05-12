import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    // 중복 이메일 체크
    const emailCheck = await this.userEmailCheck(createUser.email);
    if (emailCheck) {
      throw new HttpException(
        '이미 가입된 계정의 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
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

    try {
      await this.saveEntityUser(user);
    } catch (e) {
      throw new HttpException(
        'DB 저장 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const signupVerifyToken = uuid.v1();

    // this.sendMemberJoinEmail(createUser.email, signupVerifyToken);
  }

  async getUserByAccount(address: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      account: { accountAddress: address },
    });

    return user;
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
