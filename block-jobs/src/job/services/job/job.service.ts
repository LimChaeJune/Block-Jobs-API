import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobEntity } from 'src/typeorm/Job.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(JobEntity)
    private readonly jobRepository: Repository<JobEntity>,
  ) {}

  public GetJobs(): Promise<JobEntity[]> {
    return this.jobRepository.find({ order: { title: 'ASC' } });
  }
}
