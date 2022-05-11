import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IndustryEntity } from './Industry.entity';

@Entity('industryposition')
export class IndustryPositionEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '포지션 아이디' })
  id: string;

  @ManyToOne(() => IndustryEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  industry: IndustryEntity;

  @Column('varchar', { length: 50, comment: '포지션 이름' })
  title: string;

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
