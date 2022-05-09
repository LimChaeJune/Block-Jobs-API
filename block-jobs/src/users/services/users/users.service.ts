import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users = [
    {
      account: 'test1',
      name: '홍길동',
    },
    {
      account: 'test2',
      name: '홍길동2',
    },
    {
      account: 'test3',
      name: '홍길동3',
    },
  ];

  findUserByAccount(account: string) {
    return this.users.find((user) => user.account === account);
  }
}
