import { Test, TestingModule } from '@nestjs/testing';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { TokenService } from '../auth/token.service';

describe('SettingsController', () => {
  let controller: SettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [
        { provide: SettingsService, useValue: {} },
        { provide: TokenService, useValue: { verifyAccessToken: jest.fn() } },
      ],
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
