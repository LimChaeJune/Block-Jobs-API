import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './Enterprise.entity';
import { UserEntity } from './User.entity';
import { UserProfileEntity } from './UserProfile.entity';

@Entity('JobOpenning')
export class JobOpenningEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '공고 아이디' })
  id: string;

  @ManyToOne(() => EnterpriseEntity, (enter) => enter.jobsOpening, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  ownerEnterprise: EnterpriseEntity;

  @ManyToMany(() => UserProfileEntity, (user) => user.JoinJobs)
  users: UserProfileEntity[];

  @Column('varchar', { length: 100, comment: '근무지' })
  workSpace: string;

  @Column('varchar', { length: 200, comment: '공고 제목' })
  title: string;

  @Column('text', { comment: '공고 내용' })
  description: string;

  @Column('text', { comment: '주요 업무' })
  majorTasks: string;

  @Column('text', { comment: '자격요건' })
  requirements: string;

  @Column('text', { comment: '우대사항' })
  loyaltyPoints: string;

  @Column('text', { comment: '복지' })
  welfare: string;

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
