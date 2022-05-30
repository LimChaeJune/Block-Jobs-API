import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProfileEntity } from './UserProfile.entity';

@Entity('userPortfolio')
export class UserPortfolioEntity {
  @OneToOne(() => UserProfileEntity, (user) => user.portfolioes, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  user: UserProfileEntity;

  @Column('uuid', { comment: '포트폴리오 ID' })
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { comment: '제목', length: 100 })
  title: string;

  @Column('text', { comment: '설명' })
  description: string;

  @Column('varchar', { comment: '작품 링크', length: 200 })
  link: string;

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
