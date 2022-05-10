import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Enterprise } from './Enterprise.entity';
import { IndustryPosition } from './IndustryPosition.entity';
import { User } from './User.entity';

@Entity()
export class Industry {
  @PrimaryGeneratedColumn('uuid', { comment: '산업군 아이디' })
  id: string;

  @Column('varchar', { length: 50, comment: '산업 이름' })
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

  @OneToMany(() => IndustryPosition, (position) => position.industry)
  positions: IndustryPosition[];

  @OneToMany(() => User, (user) => user.industry)
  users: IndustryPosition[];

  @OneToMany(() => Enterprise, (ent) => ent.industry)
  enterprises: IndustryPosition[];
}
