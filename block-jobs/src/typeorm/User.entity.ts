import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { IndustryEntity } from './Industry.entity';

@Entity('user')
export class UserEntity {
  @OneToOne(() => AccountEntity, (account) => account.user, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @ManyToOne(() => IndustryEntity)
  @JoinColumn()
  industry: IndustryEntity;

  @Column('varchar', { length: 100, comment: '이메일', nullable: false })
  email: string;

  @Column('boolean', { comment: '이메일 인증 받았는지', default: false })
  emailVerify;

  @Column('varchar', { length: 50, comment: '이름', nullable: false })
  name: string;

  @Column('varchar', { length: 50, comment: '휴대폰 번호', nullable: false })
  phone: string;

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
}
