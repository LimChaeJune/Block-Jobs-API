import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { JobEntity } from './Job.entity';
import { UserProfileEntity } from './UserProfile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '유저 아이디' })
  id: string;

  @OneToOne(() => AccountEntity, (account) => account.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @ManyToOne(() => JobEntity)
  @JoinColumn()
  job: JobEntity;

  @OneToOne(() => UserProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: UserProfileEntity;

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
