import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { AccountEntity } from './Account.entity';

export enum CoinType {
  Get = '수익',
  Set = '소비',
}

@Entity('CoinReceipt')
export class UserCoinReceiptEntity {
  @ManyToOne(() => AccountEntity, (account) => account.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'accountAddress' })
  account: AccountEntity;

  @RelationId((coin: UserCoinReceiptEntity) => coin.account)
  accountAddress: string;

  @PrimaryGeneratedColumn('uuid', { comment: 'Coin내역 ID' })
  id: string;

  @Column('varchar', { length: 200, comment: '이용내역', nullable: true })
  description?: string;

  @Column('varchar', { length: 200, comment: '트랜잭션 주소', nullable: true })
  link?: string;

  @Column({
    type: 'set',
    enum: [CoinType.Get, CoinType.Set],
    default: CoinType.Get,
    comment: '프로필 상태',
  })
  cointype?: CoinType;

  @Column({
    comment: '발생 시간',
    type: 'datetime',
    default: () => 'NOW()',
  })
  actionDt: Date;
}
