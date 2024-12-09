import {
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Request,
	Response,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request as ExpressRequest } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { resolve } from 'path';
import { mkdir } from 'fs/promises';
import { SAVE_FILE_DIR } from './constants';

declare global {
	namespace Express {
		interface Request {
			user?: {
				sub: string;
				email: string;
				username: string;
			};
		}
	}
}

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: async (req: ExpressRequest, res, cb) => {
					try {
						const userId = req.user.sub;
						const destination = resolve(SAVE_FILE_DIR, userId);

						await mkdir(destination, { recursive: true });

						cb(null, destination);
					} catch (err) {
						cb(err, null);
					}
				},
				filename: (req, file, cb) => {
					const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
					const originalName = file.originalname;
					cb(null, `${uniqueSuffix}-${originalName}`);
				},
			}),
		}),
	)
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return file;
	}

	@Get(':fileId')
	async getFile(@Param('fileId') fileId, @Response() res, @Request() req) {
		const file = await this.filesService.createReadStream(req.user.sub, fileId);
		file.pipe(res);
	}

	@Get()
	listFiles(@Request() req) {
		return this.filesService.listFiles(req.user.sub);
	}

	@Delete(':fileId')
	deleteFile(@Param('fileId') fileId, @Request() req) {
		return this.filesService.deleteFile(req.user.sub, fileId);
	}
}
