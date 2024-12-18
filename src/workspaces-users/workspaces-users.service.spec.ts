import { Test, TestingModule } from '@nestjs/testing';
import { WorkspacesUsersService } from './workspaces-users.service';

describe('WorkspacesUsersService', () => {
  let service: WorkspacesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspacesUsersService],
    }).compile();

    service = module.get<WorkspacesUsersService>(WorkspacesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
