import { Test, TestingModule } from '@nestjs/testing';
import { EnterpiseService } from './enterpise.service';

describe('EnterpiseService', () => {
  let service: EnterpiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnterpiseService],
    }).compile();

    service = module.get<EnterpiseService>(EnterpiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
