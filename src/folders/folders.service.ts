import {
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from '@nestjs/common';
import { FolderCreateData } from './interfaces';
import { KNEX_CONNECTION } from 'src/knex';
import { Knex } from 'knex';

@Injectable()
export class FoldersService {
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	createFolder(folderCreateData: FolderCreateData) {
		return this.knex('folders')
			.insert(folderCreateData)
			.into('folders')
			.returning('*');
	}

	async listFiles(folderId: string, userId: string) {
		const folder = await this.knex('folders')
			.select('*')
			.from('folders')
			.where('id', folderId)
			.first();

		if (!folder) {
			throw new NotFoundException(`Folder with id: ${folderId} not found`);
		}

		if (folder.userId !== userId) {
			throw new UnauthorizedException();
		}

		const files = await this.knex('files')
			.select('*')
			.from('files')
			.where('parentId', folderId);

		return files;
	}
}
