import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { WorkspaceCreatedEvent } from 'src/common/events';
import { WorkspacesUsersService } from '../workspaces-users.service';

@Injectable()
export class WorkspaceCreatedListener {
	constructor(
		private readonly workspacesUsersService: WorkspacesUsersService,
	) {}
	@OnEvent('workspace.created')
	async handleWorkspaceCreatedEvent(event: WorkspaceCreatedEvent) {
		await this.workspacesUsersService.addUserToWorkspace(
			{ id: event.ownerId },
			{ id: event.id },
		);
	}
}
