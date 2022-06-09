import { UserCareerEntity } from './Career.entity';
import { UserCertificationEntity } from './Certification.entity';
import { UserEducationEntity } from './Education.entity';
import { UserPortfolioEntity } from './Portfolio.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Entity('userResume')
export class UserResumeEntity {
  @ManyToOne(() => UserEntity, (user) => user.resumes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @RelationId((resume: UserResumeEntity) => resume.user)
  userId: string;

  @PrimaryGeneratedColumn('uuid', { comment: '이력서 아이디' })
  resumeId: string;

  @Column('varchar', { length: 100, comment: '이력서 제목', nullable: true })
  title!: string;

  @Column('varchar', { length: 500, comment: '소개글', nullable: true })
  description!: string;

  @Column('varchar', { length: 200, comment: '보유 기술', nullable: true })
  skills!: string;

  @OneToMany(() => UserEducationEntity, (eudcation) => eudcation.resume)
  educations!: UserEducationEntity[];

  @OneToMany(() => UserCertificationEntity, (cert) => cert.resume)
  certifications!: UserCertificationEntity[];

  @OneToMany(() => UserPortfolioEntity, (portfolio) => portfolio.resume)
  portfolioes!: UserPortfolioEntity[];

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
