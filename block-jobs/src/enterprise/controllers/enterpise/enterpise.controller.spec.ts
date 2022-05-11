import { Test, TestingModule } from '@nestjs/testing';
import { EnterpiseController } from './enterpise.controller';

describe('EnterpiseController', () => {
  let controller: EnterpiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnterpiseController],
    }).compile();

    controller = module.get<EnterpiseController>(EnterpiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
