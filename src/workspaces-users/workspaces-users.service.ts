import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import {
	UserFindUniqueData,
	WorkspaceFindUniqueData,
} from 'src/common/interfaces';
import { KNEX_CONNECTION } from 'src/knex';
import { UsersService } from 'src/users/users.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable()
export class WorkspacesUsersService {
	constructor(
		@Inject(KNEX_CONNECTION) private readonly knex: Knex,
		private readonly usersService: UsersService,
		private readonly workspacesService: WorkspacesService,
	) {}

	async addUserToWorkspace(
		userFindUniqueData: UserFindUniqueData,
		workspaceFindUniqueData: WorkspaceFindUniqueData,
	) {
		const workspace = await this.workspacesService.findUnique(
			workspaceFindUniqueData,
		);

		const user = await this.usersService.findUnique(userFindUniqueData);

		return this.knex('workspaces_users')
			.insert({
				userId: user.id,
				workspaceId: workspace.id,
			})
			.into('workspaces_users')
			.returning('*');
	}
}
