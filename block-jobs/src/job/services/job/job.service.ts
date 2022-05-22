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

  public GetByParentIdJobs(parentId: string): Promise<JobEntity[]> {
    return this.jobRepository.find({
      where: { parentId: parentId },
      order: { title: 'ASC' },
    });
  }

  public GetRootJobs(): Promise<JobEntity[]> {
    return this.jobRepository.find({
      where: { level: 0 },
      order: { title: 'ASC' },
    });
  }

  public GetByLevelJobs(level: number): Promise<JobEntity[]> {
    return this.jobRepository.find({
      where: { level: level },
      order: { title: 'ASC' },
    });
  }
}
