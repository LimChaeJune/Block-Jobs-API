import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './Enterprise.entity';
import { UserEntity } from './User.entity';

@Entity('industry')
export class IndustryEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '산업군 아이디' })
  id: string;

  @Column('varchar', { length: 50, comment: '산업 이름' })
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

  @OneToMany(() => EnterpriseEntity, (ent) => ent.industry)
  enterprises: EnterpriseEntity[];
}
