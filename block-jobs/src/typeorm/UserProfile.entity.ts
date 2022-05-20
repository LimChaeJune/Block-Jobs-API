export enum ProfileStatus {
  JobFind = '구직중',
  JobEnteresting = '관심 있음',
  None = '관심 없음',
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { UserCertificationEntity } from './Certification.entity';
import { UserEducationEntity } from './Education.entity';
import { JobEntity } from './Job.entity';
import { JobOpenningEntity } from './JobOpenning.entity';
import { UserEntity } from './User.entity';

@Entity('userProfile')
export class UserProfileEntity {
  @OneToOne(() => UserEntity, (user) => user.profile, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  user: UserEntity;

  // 지원한 공고
  @ManyToMany(() => JobOpenningEntity, (jobs) => jobs.users)
  @JoinTable()
  JoinJobs: JobOpenningEntity[];

  @Column('varchar', { length: 500, comment: '소개글' })
  description: string;

  @Column('varchar', { length: 200, comment: '보유 기술' })
  skills: string;

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

  @Column('varchar', { length: 200, comment: '이력서 파일주소' })
  resumeFile: string;

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

  @OneToMany(() => UserEducationEntity, (eudcation) => eudcation.user)
  educations: UserEducationEntity[];

  @OneToMany(() => UserCertificationEntity, (cert) => cert.user)
  certifications: UserCertificationEntity[];

  @OneToMany(() => UserEducationEntity, (eudcation) => eudcation.user)
  portfolioes: UserEntity[];
}
