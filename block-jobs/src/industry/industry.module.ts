import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndustryEntity } from 'src/typeorm/Industry.entity';
import { IndustryController } from './controllers/industry/industry.controller';
import { IndustryService } from './services/industry/industry.service';

@Module({
  imports: [TypeOrmModule.forFeature([IndustryEntity])],
  controllers: [IndustryController],
  providers: [IndustryService],
})
export class IndustryModule {}
