import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join, resolve } from 'path';
import { readdir, stat, unlink } from 'fs/promises';
import { SAVE_FILE_DIR } from './constants';

@Injectable()
export class FilesService {
	async createReadStream(userId: string, fileId: string) {
		const filePath = this.resolveFilePath(userId, fileId);

		await stat(filePath).catch((err) => {
			throw new BadRequestException(`File ${fileId} does not exist`);
		});

		const file = createReadStream(filePath);

		return file;
	}

	async listFiles(userId: string) {
		const filePath = this.resolveFilePath(userId);

		const userFolderExists = existsSync(filePath);

		if (!userFolderExists) {
			return [];
		}

		const directory = await readdir(filePath);

		return directory;
	}

	async deleteFile(userId: string, fileId: string) {
		const filePath = this.resolveFilePath(userId, fileId);

		const fileExists = existsSync(filePath);

		if (!fileExists) {
			throw new NotFoundException(`File with id: ${fileId} not found`);
		}

		await unlink(filePath);

		return { ok: true };
	}

	private resolveFilePath(userId: string, fileId: string = '') {
		return resolve(SAVE_FILE_DIR, userId, fileId);
	}
}
