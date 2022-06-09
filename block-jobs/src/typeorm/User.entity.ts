export enum ProfileStatus {
  JobFind = '구직중',
  JobEnteresting = '관심 있음',
  None = '관심 없음',
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { UserCareerEntity } from './Career.entity';
import { JobEntity } from './Job.entity';
import { JobOpenningEntity } from './JobOpenning.entity';
import { UserResumeEntity } from './Resume.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '유저 아이디' })
  id: string;

  @OneToOne(() => AccountEntity, (account) => account.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @ManyToMany(() => JobEntity)
  @JoinTable()
  job: JobEntity[];

  @Column('varchar', { length: 100, comment: '이메일', nullable: false })
  email: string;

  @Column('boolean', { comment: '이메일 인증 받았는지', default: false })
  emailVerify;

  @Column('varchar', { length: 50, comment: '이름', nullable: false })
  name: string;

  @Column('varchar', { length: 50, comment: '휴대폰 번호', nullable: false })
  phone: string;

  @Column('datetime', { comment: '생년월일', nullable: true })
  birthday!: Date;

  @Column('varchar', { length: 200, comment: '주소', nullable: true })
  address!: Date;

  @Column('varchar', {
    length: 200,
    comment: '이력서 사진 주소',
    nullable: true,
  })
  profilePicture?: string;

  @Column('varchar', {
    length: 10,
    comment: '성별',
    nullable: true,
    default: '남',
  })
  male!: string;

  @Column({
    type: 'set',
    enum: [
      ProfileStatus.JobEnteresting,
      ProfileStatus.JobFind,
      ProfileStatus.None,
    ],
    default: ProfileStatus.None,
    comment: '프로필 상태',
  })
  userType: ProfileStatus;

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

  @OneToMany(() => UserResumeEntity, (resume) => resume.user)
  resumes: UserResumeEntity[];

  @ManyToMany(() => JobOpenningEntity, (job) => job.users)
  @JoinTable()
  Joinjobs: JobOpenningEntity[];

  @OneToMany(() => UserCareerEntity, (career) => career.user)
  careers!: UserCareerEntity[];
}
