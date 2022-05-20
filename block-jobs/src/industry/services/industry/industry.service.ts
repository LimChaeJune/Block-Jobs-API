import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IndustryEntity } from 'src/typeorm/Industry.entity';
import { Repository } from 'typeorm';

@Injectable()
export class IndustryService {
  constructor(
    @InjectRepository(IndustryEntity)
    private readonly industryRepository: Repository<IndustryEntity>,
  ) {}

  public GetIndustry(): Promise<IndustryEntity[]> {
    return this.industryRepository.find({ order: { title: 'ASC' } });
  }
}
