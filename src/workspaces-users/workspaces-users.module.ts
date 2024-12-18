import { Module } from '@nestjs/common';
import { WorkspacesUsersService } from './workspaces-users.service';
import { UserCreatedListener } from './listeners/UserCreated.listener';
import { UsersModule } from 'src/users/users.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';

@Module({
	imports: [UsersModule, WorkspacesModule],
	providers: [WorkspacesUsersService, UserCreatedListener],
	exports: [WorkspacesUsersService],
})
export class WorkspacesUsersModule {}
