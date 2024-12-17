import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Module({
	providers: [UsersService],
	exports: [UsersService],
	imports: [WorkspacesService],
})
export class UsersModule {}
