import { Injectable } from '@nestjs/common';
import { User } from 'src/users/types/Users';
import { CreateUserDto } from '../../dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      accountAddress: 'test1',
      email: '홍길동',
      created: new Date(),
    },
    {
      accountAddress: 'test2',
      email: '홍길동2',
      created: new Date(),
    },
    {
      accountAddress: 'test3',
      email: '홍길동3',
      created: new Date(),
    },
  ];

  findUserByAccount(account: string) {
    return this.users.find((user) => user.accountAddress === account);
  }

  createUser(createDto: CreateUserDto) {
    this.users.push(createDto);
  }
}
