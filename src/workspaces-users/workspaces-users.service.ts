import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Knex } from 'knex';
import {
	UserFindUniqueData,
	WorkspaceFindUniqueData,
} from 'src/common/interfaces';
import { UserEntity } from 'src/entities';
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

	async listWorkspaceUsers(workspaceId: string, userId: string) {
		const workspacesUsersRecords = await this.knex('workspaces_users')
			.select('*')
			.from('workspaces_users')
			.where('workspaceId', workspaceId);

		const usersPromises: Promise<UserEntity>[] = [];

		for (const workspacesUsersRecord of workspacesUsersRecords) {
			const user = this.usersService.findUnique({
				id: workspacesUsersRecord.userId,
			});

			usersPromises.push(user);
		}

		const users = await Promise.all(usersPromises);

		const userIsPartOfTheWorkspace = users.find((user) => user.id === userId);

		if (!userIsPartOfTheWorkspace) {
			throw new UnauthorizedException();
		}

		return users;
	}
}
