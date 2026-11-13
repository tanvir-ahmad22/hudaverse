import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TokenService } from '../auth/token.service';

describe('ProfileController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        { provide: ProfileService, useValue: {} },
        { provide: TokenService, useValue: { verifyAccessToken: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
