import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex';
import {
	WorkspaceCreateData,
	WorkspaceFindData,
	WorkspaceFindUniqueData,
	WorkspaceUpdateData,
	UserFindUniqueData,
} from 'src/common/interfaces';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WorkspacesService {
	constructor(
		@Inject(KNEX_CONNECTION) private readonly knex: Knex,
		private readonly usersService: UsersService,
	) {}

	findAll(workplaceFindData: WorkspaceFindData) {
		return this.knex('workspaces')
			.select('*')
			.from('workspaces')
			.where(workplaceFindData);
	}

	findFirst(workplaceFindData: WorkspaceFindData) {
		return this.knex('workspaces')
			.select('*')
			.from('workspaces')
			.where(workplaceFindData)
			.first();
	}

	findUnique(workplaceFindUniqueData: WorkspaceFindUniqueData) {
		return this.knex('workspaces')
			.select('*')
			.from('workspaces')
			.where(workplaceFindUniqueData)
			.first();
	}

	async create(workspaceCreateData: WorkspaceCreateData) {
		const [createdWorkspace] = await this.knex('workspaces')
			.insert(workspaceCreateData)
			.into('workspaces')
			.returning('*');

		return createdWorkspace;
	}

	update(
		workspaceUpdateData: WorkspaceUpdateData,
		workspaceFindUniqueData: WorkspaceFindUniqueData,
	) {
		return this.knex('workspaces')
			.update(workspaceUpdateData)
			.where(workspaceFindUniqueData);
	}

	delete(workspaceFindUniqueData: WorkspaceFindUniqueData) {
		return this.knex('workspaces')
			.delete()
			.from('workspaces')
			.where(workspaceFindUniqueData)
			.returning('*');
	}

	async addUserToWorkspace(
		workspaceFindUniqueData: WorkspaceFindUniqueData,
		userFindUniqueData: UserFindUniqueData,
	) {
		const workspace = await this.findUnique(workspaceFindUniqueData);

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
