import { AccountEntity } from './Account.entity';
import { IndustryEntity } from './Industry.entity';
import { UserEntity } from './User.entity';
import { JobEntity } from './Job.entity';
import { EnterpriseEntity } from './Enterprise.entity';
import { JobOpenningEntity } from './JobOpenning.entity';
import { UserProfileEntity } from './UserProfile.entity';
import { UserEducationEntity } from './Education.entity';
import { UserCertificationEntity } from './Certification.entity';

const entities = [
  AccountEntity,
  IndustryEntity,
  JobEntity,
  UserEntity,
  UserProfileEntity,
  UserEducationEntity,
  UserCertificationEntity,
  EnterpriseEntity,
  JobOpenningEntity,
];

export {
  AccountEntity,
  IndustryEntity,
  JobEntity,
  UserEntity,
  UserProfileEntity,
  UserEducationEntity,
  UserCertificationEntity,
  EnterpriseEntity,
  JobOpenningEntity,
};

export default entities;
