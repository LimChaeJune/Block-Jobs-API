import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IndustryService } from 'src/industry/services/industry/industry.service';
import { IndustryEntity } from 'src/typeorm/Industry.entity';

@Controller('industry')
@ApiTags('산업군 API')
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @HttpCode(200)
  @Get()
  async GetAllIndustry(): Promise<IndustryEntity[]> {
    return this.industryService.GetIndustry();
  }
}
