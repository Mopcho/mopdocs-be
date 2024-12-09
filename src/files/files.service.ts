import { BadRequestException, Injectable } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join, resolve } from 'path';
import { readdir, stat } from 'fs/promises';
import { SAVE_FILE_DIR } from './constants';

@Injectable()
export class FilesService {
	async createReadStream(fileId: string, userId: string) {
		const filePath = resolve(SAVE_FILE_DIR, userId, fileId);

		await stat(filePath).catch((err) => {
			throw new BadRequestException(`File ${fileId} does not exist`);
		});

		const file = createReadStream(filePath);

		return file;
	}

	async listFiles(userId: string) {
		const filePath = join(SAVE_FILE_DIR, userId);
		const userFolderExists = existsSync(filePath);

		if (!userFolderExists) {
			return [];
		}

		const directory = await readdir(filePath);

		return directory;
	}
}
