import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountEntity } from './Account.entity';
import { IndustryEntity } from './Industry.entity';
import { JobOpenningEntity } from './JobOpenning.entity';

@Entity('enterprise')
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '기업 아이디' })
  id: string;

  @OneToOne(() => AccountEntity, (account) => account.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @ManyToOne(() => IndustryEntity)
  @JoinColumn()
  industry: IndustryEntity;

  @OneToMany(() => JobOpenningEntity, (jobOpen) => jobOpen.ownerEnterprise)
  jobsOpening: JobOpenningEntity[];

  @Column('varchar', { length: 100, comment: '회사명', nullable: false })
  title: string;

  @Column('text', { comment: '회사설명', nullable: false })
  description: string;

  @Column('varchar', { length: 80, comment: '사업자 번호', nullable: false })
  businessNumber: string;

  @Column('varchar', { length: 100, comment: '주소지', nullable: false })
  address: string;

  @Column('varchar', { length: 100, comment: '회사 이메일', nullable: false })
  email: string;

  @Column('varchar', { comment: '직원 수', nullable: false })
  employees: string;

  @Column('varchar', { length: 120, comment: '대표이미지', nullable: true })
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
