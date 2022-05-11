import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './Enterprise.entity';
import { IndustryPositionEntity } from './IndustryPosition.entity';
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

  @OneToMany(() => IndustryPositionEntity, (position) => position.industry)
  positions: IndustryPositionEntity[];

  @OneToMany(() => UserEntity, (user) => user.industry)
  users: UserEntity[];

  @OneToMany(() => EnterpriseEntity, (ent) => ent.industry)
  enterprises: EnterpriseEntity[];
}
