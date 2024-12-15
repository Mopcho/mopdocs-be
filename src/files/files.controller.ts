import {
	BadRequestException,
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
import { v4 as uuidv4 } from 'uuid';

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
					cb(null, uuidv4());
				},
			}),
		}),
	)
	uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
		if (!file) {
			throw new BadRequestException('File upload fail');
		}
		return this.filesService.saveFileData(
			{
				...file,
				originalName: file.originalname,
				fileName: file.filename,
				mimeType: file.mimetype,
			},
			req.user.sub,
		);
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
