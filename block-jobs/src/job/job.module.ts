import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/typeorm/Job.entity';
import { JobController } from './controllers/job/job.controller';
import { JobService } from './services/job/job.service';

@Module({
  imports: [TypeOrmModule.forFeature([JobEntity])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
