import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Industry } from './Industry.entity';

@Entity()
export class IndustryPosition {
  @PrimaryGeneratedColumn('uuid', { comment: '포지션 아이디' })
  id: string;

  @ManyToOne(() => Industry, { onDelete: 'CASCADE' })
  @JoinColumn()
  industry: Industry;

  @Column('varchar', { length: 50, comment: '포지션 이름' })
  title: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => {
      'CURRENT_TIMESTAMP';
    },
  })
  updateAt: Date;
}
