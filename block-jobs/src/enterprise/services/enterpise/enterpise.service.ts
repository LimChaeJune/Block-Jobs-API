import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountService } from 'src/account/services/account/account.service';
import { CreateEnterPriseDto } from 'src/enterprise/dtos/CreateEnterprise.dto';
import { UpdateEnterPriseDto } from 'src/enterprise/dtos/UpdateEnterprise.dto';
import { EnterpriseEntity } from 'src/typeorm/Enterprise.entity';
import { IndustryEntity } from 'src/typeorm/Industry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private readonly enterRepository: Repository<EnterpriseEntity>,
    private readonly accountService: AccountService,
  ) {}

  async registerUser(createEnterprise: CreateEnterPriseDto) {
    // 사업자 번호로 중복 체크
    const busiCheck = await this.enterCheck(createEnterprise.businessNumber);
    if (busiCheck) {
      throw new HttpException(
        '이미 가입된 사업자 번호 입니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const registerAccount = await this.accountService.registerAccount(
      createEnterprise.account,
    );

    const enter = new EnterpriseEntity();
    enter.account = registerAccount;
    enter.title = createEnterprise.title;
    enter.description = createEnterprise.description;
    enter.businessNumber = createEnterprise.businessNumber;
    enter.employees = createEnterprise.employees;
    enter.thumbnail = createEnterprise.thumbnail;
    enter.address = createEnterprise.address;
    enter.email = createEnterprise.email;

    const industry = new IndustryEntity();
    industry.id = createEnterprise.industryId;
    enter.industry = industry;

    await this.saveEntityEnterPrise(enter);

    return enter;
    // const signupVerifyToken = uuid.v1();

    // this.sendMemberJoinEmail(createUser.email, signupVerifyToken);
  }

  async updateEnterprise(updateEnterprise: UpdateEnterPriseDto) {
    const findEnter = await this.enterRepository.findOne({
      where: { id: updateEnterprise.enterpriseId },
    });

    findEnter.description = updateEnterprise.description;
    findEnter.address = updateEnterprise.address;
    findEnter.email = updateEnterprise.email;
    findEnter.thumbnail = updateEnterprise.thumbnail;

    await this.enterRepository.save(findEnter);
  }

  async getEnterPriseByAccount(address: string): Promise<EnterpriseEntity> {
    const enterprise = await this.enterRepository.findOne({
      account: { accountAddress: address },
    });

    return enterprise;
  }

  async getAllEnterprise(): Promise<EnterpriseEntity[]> {
    const enterRepository = await this.enterRepository.find({
      relations: ['account', 'industry'],
    });
    Logger.debug(enterRepository);
    return enterRepository;
  }

  private async enterCheck(businessNumber: string): Promise<boolean> {
    const user = await this.enterRepository.findOne({ businessNumber });
    return user !== undefined;
  }

  private async saveEntityEnterPrise(enterprise: EnterpriseEntity) {
    await this.enterRepository.save(enterprise);
  }

  //   private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
  //     this.emailservice.sendMemberJoinVerification(email, signupVerifyToken);
  //   }
}
