import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EmailService } from 'src/email/services/email.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/User.entity';
import { getConnection, Repository } from 'typeorm';
import { AccountService } from 'src/account/services/account/account.service';
import { JobEntity } from 'src/typeorm/Job.entity';
import { UserResumeEntity } from 'src/typeorm/Resume.entity';
import { UserEducationEntity } from 'src/typeorm/Education.entity';
import { UserCareerEntity } from 'src/typeorm/Career.entity';
import { UserCertificationEntity } from 'src/typeorm/Certification.entity';
import { UserPortfolioEntity } from 'src/typeorm/Portfolio.entity';
import { create } from 'domain';
import { CreateCareerDto } from 'src/users/dtos/CreateCareer.dto';
import { UpdateCareerDto } from 'src/users/dtos/UpdateCareer.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserResumeEntity)
    private resumeRepository: Repository<UserResumeEntity>,
    @InjectRepository(UserEducationEntity)
    private educationRepository: Repository<UserEducationEntity>,
    @InjectRepository(UserCareerEntity)
    private careerRepostiory: Repository<UserCareerEntity>,
    @InjectRepository(UserCertificationEntity)
    private certRepository: Repository<UserCertificationEntity>,
    @InjectRepository(UserPortfolioEntity)
    private portRepository: Repository<UserPortfolioEntity>,

    private emailservice: EmailService,
    private accountService: AccountService,
  ) {}

  async registerUser(createUser: CreateUserDto) {
    console.log(createUser);

    // 중복 이메일 체크
    const emailCheck = await this.userEmailCheck(createUser.email);
    if (emailCheck) {
      throw new HttpException(
        '이미 가입된 계정의 이메일입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const registerAccount = await this.accountService.registerAccount(
      createUser.account,
    );

    const user = new UserEntity();
    user.account = registerAccount;
    user.name = createUser.name;
    user.email = createUser.email;
    user.phone = createUser.phone;

    const job = new JobEntity();
    job.id = createUser.jobsId;
    user.job = [job];

    try {
      await this.saveEntityUser(user);
    } catch (e) {
      throw new HttpException(
        'DB 저장 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // const signupVerifyToken = uuid.v1();

    // this.sendMemberJoinEmail(createUser.email, signupVerifyToken);
  }

  async getUserByAccount(address: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(
      {
        account: { accountAddress: address },
      },
      {
        relations: [
          'resumes',
          'resumes.educations',
          'resumes.certifications',
          'resumes.portfolioes',
        ],
      },
    );

    if (!user) {
      throw new NotFoundException('해당 유저가 존재하지 않습니다.');
    }

    return user;
  }

  async updateUser(uptUser: UserEntity) {
    try {
      const user = await this.userRepository.findOne({ id: uptUser.id });
      user.phone = uptUser.phone;
      user.name = uptUser.name;
      user.male = uptUser.male;
      user.birthday = uptUser.birthday;
      user.email = uptUser.email;
      user.address = uptUser.address;

      await this.userRepository.save(user);
    } catch (err) {
      Logger.debug(err);
    }
  }

  async uptResume(resume: UserResumeEntity) {
    try {
      Logger.debug(resume);
      const uptResume = await this.resumeRepository.findOne({
        resumeId: resume.resumeId,
      });
      uptResume.title = resume.title;
      uptResume.skills = resume.skills;
      uptResume.description = resume.description;
      uptResume.updateAt = new Date();

      uptResume.certifications = resume.certifications;
      uptResume.educations = resume.educations;
      uptResume.portfolioes = resume.portfolioes;
    } catch (err) {
      Logger.debug(err);
    }
  }

  async addResume(createResume: UserResumeEntity) {
    const queryRunner = await getConnection().createQueryRunner();
    await queryRunner.startTransaction();

    try {
      Logger.debug(createResume);

      const resume = new UserResumeEntity();
      resume.resumeId = createResume.resumeId;
      resume.title = createResume.title;
      resume.description = createResume.description;
      resume.skills = createResume.skills;

      const user = await this.userRepository.findOne({
        id: createResume.userId,
      });
      resume.user = user;
      resume.userId = createResume.userId;

      createResume.educations.forEach((edu) => {
        edu.resumeId = resume.resumeId;
        this.educationRepository.save(edu);
      });
      resume.educations = createResume.educations;

      createResume.certifications.forEach((cert) => {
        cert.resumeId = resume.resumeId;
        this.certRepository.save(cert);
      });
      resume.certifications = createResume.certifications;

      createResume.portfolioes.forEach((port) => {
        port.resumeId = resume.resumeId;
        this.portRepository.save(port);
      });
      resume.portfolioes = createResume.portfolioes;

      await this.resumeRepository.save(resume);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async getResumes(userId: string): Promise<UserResumeEntity[]> {
    try {
      return this.resumeRepository.find({
        relations: ['user', 'educations', 'portfolioes', 'certifications'],
        where: {
          user: { id: userId },
        },
      });
    } catch (err) {
      Logger.debug(err);
    }
  }

  async getResume(resumeId: string): Promise<UserResumeEntity> {
    try {
      return this.resumeRepository.findOne({
        relations: ['user', 'educations', 'portfolioes', 'certifications'],
        where: {
          resumeId: resumeId,
        },
      });
    } catch (err) {
      Logger.debug(err);
    }
  }

  async addCareers(createDto: CreateCareerDto) {
    try {
      const user = await this.userRepository.findOne({ id: createDto.userId });

      const career = new UserCareerEntity();
      career.user = user;
      career.companyAddress = createDto.companyAddress;
      career.stDt = createDto.stDt;
      career.fnsDt = createDto.fnsDt;
      career.description = createDto.description;
      career.userId = createDto.userId;
      career.roles = createDto.roles;

      await this.careerRepostiory.save(career);
    } catch (err) {
      Logger.debug(err.message);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCareers(updateDto: UpdateCareerDto) {
    try {
      const career = await this.careerRepostiory.findOne({
        id: updateDto.careerId,
      });

      career.stDt = updateDto.stDt;
      career.fnsDt = updateDto.fnsDt;
      career.description = updateDto.description;
      career.roles = updateDto.roles;
      career.transactionLink = updateDto.transactionId;

      await this.careerRepostiory.save(career);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCareers(userId: string): Promise<UserCareerEntity[]> {
    try {
      const careers = await this.careerRepostiory.find({
        relations: ['user'],
        where: { user: { id: userId } },
      });
      return careers;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async userEmailCheck(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ email: email });

    return user !== undefined;
  }

  private async saveEntityUser(user: UserEntity) {
    await this.userRepository.save(user);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    this.emailservice.sendMemberJoinVerification(email, signupVerifyToken);
  }
}
