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
import { FileCreateData } from './interfaces';

@Injectable()
export class FilesService {
	private readonly logger = new Logger(FilesService.name);
	constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

	/**
	 * Create a file record in the database
	 */
	createFile(fileCreateData: FileCreateData) {
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
	async deleteFile(userId: string, fileId: string) {
		// Delete from database
		const databaseFile = await this.knex('files')
			.select('*')
			.where({ id: fileId });

		if (!databaseFile) {
			throw new NotFoundException(`File with id: ${fileId} not found`);
		}

		await this.knex('files').delete().where({ id: fileId });

		// Delete from file system
		const filePath = this.getFullPath(userId, fileId);

		const fileExists = existsSync(filePath);

		if (!fileExists) {
			throw new NotFoundException(`File with id: ${fileId} not found`);
		}

		await unlink(filePath);

		return databaseFile;
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
