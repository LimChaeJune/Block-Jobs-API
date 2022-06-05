import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserResumeEntity } from './Resume.entity';

@Entity('userEducation')
export class UserEducationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '학력 아이디' })
  id: string;

  @Column({ type: 'int', comment: '시작년도', nullable: true })
  startYear?: number;

  @Column({ type: 'int', comment: '시작월', nullable: true })
  startMonth?: number;

  @Column({ type: 'int', comment: '종료년도', nullable: true })
  endYear?: number;

  @Column({ type: 'int', comment: '종료월', nullable: true })
  endMonth?: number;

  @Column({ type: 'varchar', comment: '학교명', nullable: true })
  name?: string;

  @Column({ type: 'varchar', comment: '전공 및 학위', nullable: true })
  major?: string;

  @Column({ type: 'varchar', comment: '경험 상세', nullable: true })
  expreience?: string;

  @Column({ type: 'bool', width: 1, comment: '재학 여부', default: false })
  currentRunning: boolean;

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

  @ManyToOne(() => UserResumeEntity, (user) => user.educations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: UserResumeEntity;
}
