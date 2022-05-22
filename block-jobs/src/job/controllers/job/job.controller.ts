import { Controller, Get, Param } from '@nestjs/common';
import { JobService } from 'src/job/services/job/job.service';
import { JobEntity } from 'src/typeorm/Job.entity';

@Controller('job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async GetRootJobs(): Promise<JobEntity[]> {
    return this.jobService.GetRootJobs();
  }

  @Get(':parentId')
  async GetJobsByParentId(
    @Param('parentId') parentId: string,
  ): Promise<JobEntity[]> {
    return this.jobService.GetByParentIdJobs(parentId);
  }

  @Get('GetByLevel/:level')
  async GetJobsByLevel(@Param('level') level: number): Promise<JobEntity[]> {
    return this.jobService.GetByLevelJobs(level);
  }
}
