import {
	BadRequestException,
	Inject,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { normalize, resolve } from 'path';
import { stat, unlink } from 'fs/promises';
import { SAVE_FILE_DIR } from './constants';
import { KNEX_CONNECTION } from 'src/knex';
import { Knex } from 'knex';
import {
	FileCreateData,
	FileFindData,
	FileFindUniqueData,
} from 'src/common/interfaces';
import { FileDeleteData } from 'src/common/interfaces';

@Injectable()
export class FilesService {
	private readonly logger = new Logger(FilesService.name);
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	/**
	 * Returns all file database records matching the search
	 */
	findAll(fileFindData: FileFindData) {
		return this.knex('files').select('*').from('files').where(fileFindData);
	}

	/**
	 * Find a file by an unique field
	 */
	findUnique(fileFindUniqueData: FileFindUniqueData) {
		return this.knex('files')
			.select('*')
			.from('files')
			.where(fileFindUniqueData)
			.first();
	}

	/**
	 * Create a file record in the database
	 */
	create(fileCreateData: FileCreateData) {
		return this.knex('files').insert(fileCreateData).returning('*');
	}

	/**
	 * Returns a read stream based on userId and fileId
	 */
	async createReadStream(userId: string, fileId: string) {
		const filePath = this.getFullPath(userId, fileId);

		await stat(filePath).catch((err) => {
			throw new BadRequestException(`File ${fileId} does not exist`);
		});

		const file = createReadStream(filePath);

		return file;
	}

	/**
	 * Deletes a file both from the database and from the filesystem
	 */
	async delete(fileDeleteData: FileDeleteData) {
		const { userId, ...fileFindUniqueData } = fileDeleteData;

		const deletedDatabaseRecord =
			await this.deleteDatabaseRecord(fileFindUniqueData);

		await this.deleteFilesystemRecord(userId, deletedDatabaseRecord.id);

		return deletedDatabaseRecord;
	}

	/**
	 * Delete a file from the database
	 */
	private async deleteDatabaseRecord(fileFindUniqueData: FileFindUniqueData) {
		const databaseFileRecord = await this.findUnique(fileFindUniqueData);

		if (!databaseFileRecord) {
			throw new NotFoundException(`File not found in database`);
		}

		const [deletedDatabaseRecord] = await this.knex('files')
			.delete()
			.where(fileFindUniqueData)
			.returning('*');

		return deletedDatabaseRecord;
	}

	/**
	 * Delete a file from the filesystem
	 */
	private deleteFilesystemRecord(userId: string, fileId: string) {
		const filePath = this.getFullPath(userId, fileId);

		const fileExists = existsSync(filePath);

		if (!fileExists) {
			throw new NotFoundException(`File not found on filesystem`);
		}

		return unlink(filePath);
	}

	/**
	 * Returns the full path of the user directory or the file ( if a fileId is given )
	 */
	private getFullPath(userId: string, fileId: string = '') {
		return resolve(SAVE_FILE_DIR, userId, fileId);
	}

	/**
	 * Transforms the given path to a standarized version of it so we can have consistant path variables everywhere
	 */
	private standarizePath(filePath: string) {
		return normalize(filePath).replaceAll('\\', '/');
	}
}
