import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserResumeEntity } from './Resume.entity';

@Entity('userCareer')
export class UserCareerEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '커리어 아이디' })
  id: string;

  @Column({ type: 'datetime', comment: '근무 시작 날짜' })
  startDt: Date;

  @Column({ type: 'datetime', comment: '근무 종료 날짜' })
  fnsDt: Date;

  @Column({ type: 'varchar', comment: '회사 지갑주소' })
  companyAddress: string;

  @Column({ type: 'varchar', comment: '업무 설명' })
  description: string;

  @Column({ type: 'varchar', comment: '직무' })
  roles: string;

  @Column({ type: 'bool', width: 1, comment: '현재 재직 여부' })
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

  @ManyToOne(() => UserResumeEntity, (user) => user.careers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: UserResumeEntity;
}
