import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from './UserProfile.entity';

@Entity('userCertification')
export class UserCertificationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '자격증 아이디' })
  id: string;

  @ManyToOne(() => UserProfileEntity, (user) => user.certifications, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  user: UserProfileEntity;

  @Column({ type: 'datetime', comment: '취득날짜' })
  getDt: Date;

  @Column({ type: 'varchar', comment: '자격증 명' })
  title: string;

  @Column({ type: 'varchar', comment: '발행처' })
  from: string;

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
