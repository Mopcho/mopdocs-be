import {
	Controller,
	Get,
	Param,
	Post,
	Response,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseGuards(AuthGuard)
	@UseInterceptors(
		FileInterceptor('file', {
			storage: diskStorage({
				destination: (req, res, cb) => {
					const userId = (req as Request & { user: { id: string } }).user.id;
				},
				filename: (req, file, cb) => {
					const fileName = `${Date.now()}-${file.originalname}`;
					cb(null, fileName);
				},
			}),
		}),
	)
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		return file;
	}

	@Get(':fileId')
	getFile(@Param('fileId') fileId, @Response() res) {
		const file = this.filesService.createReadStream(fileId);

		file.pipe(res);
	}

	@Get()
	listFiles() {
		return this.filesService.listFiles();
	}
}
