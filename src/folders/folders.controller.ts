import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { CreateFolderDto } from './dto';
import { FoldersService } from './folders.service';

@Controller('folders')
export class FoldersController {
	constructor(private readonly foldersService: FoldersService) {}

	@Post()
	createFolder(@Body() createFolderDto: CreateFolderDto, @Request() req) {
		return this.foldersService.createFolder({
			...createFolderDto,
			userId: req.user.sub,
		});
	}

	@Get(':folderId')
	listFiles(@Request() req, @Param('folderId') folderId) {
		return this.foldersService.listFiles(folderId, req.user.sub);
	}
}
