import {
	Controller,
	Get,
	Param,
	Post,
	Response,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
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
