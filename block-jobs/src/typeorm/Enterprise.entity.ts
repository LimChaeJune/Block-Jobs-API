import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Account } from './Account.entity';
import { Industry } from './Industry.entity';

@Entity()
export class Enterprise {
  @OneToOne(() => Account, (account) => account.user, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToOne(() => Industry)
  @JoinColumn()
  industry: Industry;

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
