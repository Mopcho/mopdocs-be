import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from 'src/common/events';
import { WorkspacesUsersService } from '../workspaces-users.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class UserCreatedListener {
	constructor(
		private readonly workspacesService: WorkspacesService,
		private readonly workspacesUsersService: WorkspacesUsersService,
	) {}
	@OnEvent('user.created')
	async handleUserCreatedEvent(event: UserCreatedEvent) {
		const createdWorkspace = await this.workspacesService.create({
			name: 'Default Workspace',
			ownerId: event.id,
		});

		await this.workspacesUsersService.addUserToWorkspace(
			{ id: event.id },
			{ id: createdWorkspace.id },
		);
	}
}
