import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { VerifyUserDto } from 'src/authentication/dtos/VerifyUser.dto';
import { UserEntity } from 'src/typeorm/User.entity';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/services/users/users.service';
import { ConfigService } from '@nestjs/config';
import { AccountService } from 'src/account/services/account/account.service';
import { verify } from 'crypto';
import { AccountEntity, AccountUserType } from 'src/typeorm/Account.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly config: ConfigService,
    private accountService: AccountService,
  ) {}

  public async ValidationUser(verifyDto: VerifyUserDto): Promise<string> {
    const account = await this.accountService.findAccount(
      verifyDto.accountAddress,
    );

    if (account === undefined) {
      throw new HttpException(
        '현재 로그인 된 지갑으로 등록된 사용자 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = { ...account };

    return jwt.sign(payload, this.config.get<string>('JWT_SECRET'), {
      expiresIn: '5h',
      audience: 'blockjobs.com',
      issuer: 'blockjobs.com',
    });
  }

  public async TokenVerify(jwtString: string): Promise<any> {
    try {
      const payload = jwt.verify(
        jwtString,
        this.config.get<string>('JWT_SECRET'),
      ) as (jwt.JwtPayload | string) & AccountEntity;

      const { accountAddress, userType } = payload;

      return {
        address: accountAddress,
        userType: userType,
      };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
