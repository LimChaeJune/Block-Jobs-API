export enum AccountUserType {
  Customer = 'Customer',
  Enterprise = 'Enterprise',
  None = 'None',
}

import { Column, Entity, PrimaryColumn, OneToOne } from 'typeorm';
import { EnterpriseEntity } from './Enterprise.entity';
import { UserEntity } from './User.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryColumn('varchar', {
    length: 50,
    comment: '지갑주소',
  })
  accountAddress: string;

  @Column({
    type: 'set',
    enum: [
      AccountUserType.Customer,
      AccountUserType.Enterprise,
      AccountUserType.None,
    ],
    default: AccountUserType.Customer,
    comment: '회원 유형',
  })
  userType: AccountUserType;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  createAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'NOW()',
  })
  updateAt: Date;

  @OneToOne(() => UserEntity, (user) => user.account)
  user: UserEntity;

  @OneToOne(() => EnterpriseEntity, (enterprise) => enterprise.account)
  enterprise: EnterpriseEntity;
}
