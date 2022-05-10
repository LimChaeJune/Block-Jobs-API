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
export class User {
  @OneToOne(() => Account, (account) => account.user, {
    primary: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ManyToOne(() => Industry)
  @JoinColumn()
  industry: Industry;

  @Column('varchar', { length: 100, comment: '이메일', nullable: false })
  email: string;

  @Column('varchar', { length: 50, comment: '이름', nullable: false })
  name: string;

  @Column('varchar', { length: 50, comment: '휴대폰 번호', nullable: false })
  phone: string;

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
