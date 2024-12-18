import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex';
import {
	WorkspaceCreateData,
	WorkspaceFindData,
	WorkspaceFindUniqueData,
	WorkspaceUpdateData,
} from 'src/common/interfaces';

@Injectable()
export class WorkspacesService {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

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
}
