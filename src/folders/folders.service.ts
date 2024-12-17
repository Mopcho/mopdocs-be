import { Inject, Injectable } from '@nestjs/common';
import {
	FolderCreateData,
	FolderFindData,
	FolderFindUniqueData,
	FolderUpdateData,
} from 'src/common/interfaces';
import { KNEX_CONNECTION } from 'src/knex';
import { Knex } from 'knex';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class FoldersService {
	constructor(
		@Inject(KNEX_CONNECTION) private readonly knex: Knex,
		private readonly filesService: FilesService,
	) {}

	async create(folderCreateData: FolderCreateData) {
		const [createdFolder] = await this.knex('folders')
			.insert(folderCreateData)
			.into('folders')
			.returning('*');

		return createdFolder;
	}

	findUnique(folderFindUniqueData: FolderFindUniqueData) {
		return this.knex('folders')
			.select('*')
			.from('folders')
			.where(folderFindUniqueData)
			.first();
	}

	findFirst(folderFindFirstData: FolderFindData) {
		return this.knex('folders')
			.select('*')
			.from('folders')
			.where(folderFindFirstData)
			.first();
	}

	async update(
		folderUpdateData: FolderUpdateData,
		folderFindUniqueData: FolderFindUniqueData,
	) {
		const [updatedFolder] = await this.knex('folders')
			.update(folderUpdateData)
			.where(folderFindUniqueData)
			.returning('*');

		return updatedFolder;
	}

	async delete(folderFindUniqueData: FolderFindUniqueData) {
		const [deletedFolder] = await this.knex('folders')
			.delete()
			.from('folders')
			.where(folderFindUniqueData)
			.returning('*');

		return deletedFolder;
	}
}
