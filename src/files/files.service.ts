import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import fs from 'fs/promises';

@Injectable()
export class FilesService {
	createReadStream(fileId: string) {
		const file = createReadStream(join(__dirname, '../../data', fileId));

		return file;
	}

	async listFiles() {
		const directory = await fs.readdir(join(__dirname, '../../data'));

		return directory;
	}
}
