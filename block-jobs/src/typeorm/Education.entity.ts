import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from './UserProfile.entity';

@Entity('userEducation')
export class UserEducationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '학력 아이디' })
  id: string;

  @ManyToOne(() => UserProfileEntity, (user) => user.educations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  user: UserProfileEntity;

  @Column({ type: 'datetime', comment: '시작 날짜' })
  startDt: Date;

  @Column({ type: 'datetime', comment: '종료 날짜' })
  fnsDt: Date;

  @Column({ type: 'varchar', comment: '학교명' })
  name: string;

  @Column({ type: 'varchar', comment: '전공 및 학위' })
  major: string;

  @Column({ type: 'varchar', comment: '경험 상세' })
  expreience: string;

  @Column({ type: 'bool', width: 1, comment: '재학 여부' })
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
}
