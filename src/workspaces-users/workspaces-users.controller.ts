import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { WorkspacesUsersService } from './workspaces-users.service';

@Controller('workspaces/:workspaceId/users')
@UseGuards(AuthGuard)
export class WorkspacesUsersController {
	constructor(
		private readonly workspacesUsersService: WorkspacesUsersService,
	) {}

	@Get('')
	listWorkspaceUsers(@Param('workspaceId') workspaceId, @Request() req) {
		return this.workspacesUsersService.listWorkspaceUsers(
			workspaceId,
			req.user.sub,
		);
	}
}
