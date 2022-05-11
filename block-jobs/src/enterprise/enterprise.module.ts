import { Module } from '@nestjs/common';
import { EnterpiseController } from './controllers/enterpise/enterpise.controller';

@Module({
  controllers: [EnterpiseController],
  providers: [],
})
export class EnterpriseModule {}
