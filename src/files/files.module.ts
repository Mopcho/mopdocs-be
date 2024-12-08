import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';

@Module({
	imports: [
		MulterModule.register({ dest: path.resolve(__dirname, '../../data') }),
	],
	providers: [FilesService],
	controllers: [FilesController],
})
export class FilesModule {}
