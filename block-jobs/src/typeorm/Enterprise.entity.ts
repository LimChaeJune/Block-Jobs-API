import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { IndustryEntity } from './Industry.entity';

@Entity('enterprise')
export class EnterpriseEntity {
  @OneToOne(() => AccountEntity, (account) => account.user, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @ManyToOne(() => IndustryEntity)
  @JoinColumn()
  industry: IndustryEntity;

  @Column('varchar', { length: 100, comment: '회사명', nullable: false })
  title: string;

  @Column('text', { comment: '회사설명', nullable: false })
  description: string;

  @Column('varchar', { length: 80, comment: '사업자 번호', nullable: false })
  businessNumber: string;

  @Column('varchar', { length: 100, comment: '주소지', nullable: false })
  address: string;

  @Column('int', { comment: '직원 수', nullable: false })
  employees: number;

  @Column('varchar', { length: 120, comment: '대표이미지', nullable: false })
  thumbnail: string;

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
