import { AccountEntity } from './Account.entity';
import { IndustryEntity } from './Industry.entity';
import { UserEntity } from './User.entity';
import { JobEntity } from './Job.entity';
import { EnterpriseEntity } from './Enterprise.entity';
import { JobOpenningEntity } from './JobOpenning.entity';
import { UserEducationEntity } from './Education.entity';
import { UserCertificationEntity } from './Certification.entity';
import { UserPortfolioEntity } from './Portfolio.entity';
import { UserCareerEntity } from './Career.entity';
import { UserResumeEntity } from './Resume.entity';
import { UserCoinReceiptEntity } from './Coin.entity';

const entities = [
  AccountEntity,
  IndustryEntity,
  JobEntity,
  UserEntity,
  UserResumeEntity,
  UserPortfolioEntity,
  UserEducationEntity,
  UserCertificationEntity,
  UserCareerEntity,
  UserCoinReceiptEntity,
  EnterpriseEntity,
  JobOpenningEntity,
];

export {
  AccountEntity,
  IndustryEntity,
  JobEntity,
  UserEntity,
  UserResumeEntity,
  UserPortfolioEntity,
  UserEducationEntity,
  UserCertificationEntity,
  UserCareerEntity,
  UserCoinReceiptEntity,
  EnterpriseEntity,
  JobOpenningEntity,
};

export default entities;
