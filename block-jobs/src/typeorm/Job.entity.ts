import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity('Job')
export class JobEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '직무 아이디' })
  id: string;

  @Column('varchar', { length: 50, comment: '직무명' })
  title: string;

  @Column('int', { comment: '직무 단계' })
  level: number;

  @Column('varchar', { comment: 'Level 2이하 부모 직무 id', nullable: true })
  parentId: string;

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

  @ManyToMany(() => UserEntity, (user) => user.job)
  users: UserEntity[];
}
