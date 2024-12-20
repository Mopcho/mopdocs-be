import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { KNEX_CONNECTION } from 'src/knex';
import {
	WorkspaceCreateData,
	WorkspaceFindData,
	WorkspaceFindUniqueData,
	WorkspaceUpdateData,
} from 'src/common/interfaces';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WorkspaceCreatedEvent } from 'src/common/events';

@Injectable()
export class WorkspacesService {
	constructor(
		@Inject(KNEX_CONNECTION) private readonly knex: Knex,
		private readonly eventEmitter: EventEmitter2,
	) {}

	findAll(workplaceFindData: WorkspaceFindData = {}) {
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

		this.eventEmitter.emit(
			'workspace.created',
			new WorkspaceCreatedEvent({
				id: createdWorkspace.id,
				ownerId: createdWorkspace.ownerId,
			}),
		);

		return createdWorkspace;
	}

	async update(
		workspaceUpdateData: WorkspaceUpdateData,
		workspaceFindUniqueData: WorkspaceFindUniqueData,
	) {
		const [updatedWorkspace] = await this.knex('workspaces')
			.update(workspaceUpdateData)
			.where(workspaceFindUniqueData)
			.returning('*');

		return updatedWorkspace;
	}

	async delete(workspaceFindUniqueData: WorkspaceFindUniqueData) {
		const [deletedWorkspace] = await this.knex('workspaces')
			.delete()
			.from('workspaces')
			.where(workspaceFindUniqueData)
			.returning('*');

		return deletedWorkspace;
	}
}
