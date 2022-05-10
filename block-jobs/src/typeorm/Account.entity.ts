export enum AccountUserType {
  Customer = 'Customer',
  Enterprise = 'Enterprise',
}

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Account {
  @PrimaryColumn('varchar', {
    length: 35,
    comment: '지갑주소',
  })
  accountAddress: string;

  @Column('varchar', {
    length: 50,
    comment: '지갑공급자 (metamask, WalletConnect)',
  })
  accountProvider: string;

  @Column({
    type: 'set',
    enum: [AccountUserType.Customer, AccountUserType.Enterprise],
    default: AccountUserType.Customer,
    comment: '회원 유형',
  })
  userType: AccountUserType;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  updateAt: Date;

  @OneToOne(() => User, (user) => user.account)
  user: User;
}
