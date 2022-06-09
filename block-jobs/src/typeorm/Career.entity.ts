import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity('userCareer')
export class UserCareerEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '커리어 아이디' })
  id: string;

  @Column({ type: 'datetime', comment: '시작날짜', default: () => 'NOW()' })
  stDt?: Date;
  @Column({ type: 'datetime', comment: '종료날짜', default: () => 'NOW()' })
  fnsDt?: Date;

  @Column({ type: 'varchar', comment: '회사 지갑주소', nullable: true })
  companyAddress?: string;

  @Column({ type: 'varchar', comment: '업무 설명', nullable: true })
  description?: string;

  @Column({ type: 'varchar', comment: '직무', nullable: true })
  roles?: string;

  @Column({ type: 'varchar', comment: '트랜잭션 링크', nullable: true })
  transactionLink?: string;

  @Column({ type: 'bool', width: 1, comment: '현재 재직 여부', nullable: true })
  currentRunning?: boolean;

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

  @ManyToOne(() => UserEntity, (user) => user.careers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((career: UserCareerEntity) => career.user)
  userId: string;
}
