import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserResumeEntity } from './Resume.entity';

@Entity('userPortfolio')
export class UserPortfolioEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '학력 아이디' })
  id: string;

  @Column('varchar', { comment: '제목', length: 100, nullable: true })
  title?: string;

  @Column('text', { comment: '설명', nullable: true })
  description?: string;

  @Column('varchar', { comment: '작품 링크', length: 200, nullable: true })
  link?: string;

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

  @ManyToOne(() => UserResumeEntity, (user) => user.portfolioes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resumeId' })
  resume: UserResumeEntity;

  @RelationId((port: UserPortfolioEntity) => port.resume)
  resumeId: string;
}
