import { Module } from '@nestjs/common';
import { WorkspacesUsersService } from './workspaces-users.service';
import { UserCreatedListener } from './listeners/UserCreated.listener';
import { UsersModule } from 'src/users/users.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { WorkspacesUsersController } from './workspaces-users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { WorkspaceCreatedListener } from './listeners';

@Module({
	imports: [UsersModule, WorkspacesModule, AuthModule],
	providers: [
		WorkspacesUsersService,
		UserCreatedListener,
		WorkspaceCreatedListener,
	],
	controllers: [WorkspacesUsersController],
	exports: [WorkspacesUsersService],
})
export class WorkspacesUsersModule {}
