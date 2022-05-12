import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VerifyUserDto } from 'src/authentication/dtos/VerifyUser.dto';
import { UserEntity } from 'src/typeorm/User.entity';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  public async ValidationUser(verifyDto: VerifyUserDto): Promise<UserEntity> {
    const user = await this.userService.getUserByAccount(
      verifyDto.accountAddress,
    );

    if (user === undefined) {
      throw new HttpException(
        '현재 로그인 된 지갑으로 등록된 사용자 정보가 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user;
  }

  public RegisterUser;
}
