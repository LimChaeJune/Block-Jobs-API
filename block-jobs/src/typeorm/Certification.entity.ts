import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserResumeEntity } from './Resume.entity';

@Entity('userCertification')
export class UserCertificationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '자격증 아이디' })
  id: string;

  @Column({ type: 'int', comment: '취득년도', nullable: true })
  getYear?: number;

  @Column({ type: 'int', comment: '취득월', nullable: true })
  getMonth?: number;

  @Column({ type: 'varchar', comment: '자격증 명', nullable: true })
  title?: string;

  @Column({ type: 'varchar', comment: '발행처', nullable: true })
  from?: string;

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

  @ManyToOne(() => UserResumeEntity, (user) => user.certifications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: UserResumeEntity;

  @RelationId((cert: UserCertificationEntity) => cert.resume)
  resumeId: string;
}
