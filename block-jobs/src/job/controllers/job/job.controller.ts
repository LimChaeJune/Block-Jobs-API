import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JobService } from 'src/job/services/job/job.service';
import { JobEntity } from 'src/typeorm/Job.entity';

@Controller('job')
@ApiTags('직무 API')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @ApiOperation({
    summary: 'Level 0 직무 조회',
    description: '직무 조회.',
  })
  @Get()
  async GetRootJobs(): Promise<JobEntity[]> {
    return this.jobService.GetRootJobs();
  }

  @ApiOperation({
    summary: 'ParentId로 조회',
    description: 'ParentId로 조회.',
  })
  @Get(':parentId')
  async GetJobsByParentId(
    @Param('parentId') parentId: string,
  ): Promise<JobEntity[]> {
    return this.jobService.GetByParentIdJobs(parentId);
  }

  @ApiOperation({
    summary: 'Level로 조회',
    description: '해당 Level의 직무 모두 조회.',
  })
  @Get('GetByLevel/:level')
  async GetJobsByLevel(@Param('level') level: number): Promise<JobEntity[]> {
    return this.jobService.GetByLevelJobs(level);
  }
}
