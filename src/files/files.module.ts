import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import path, { resolve } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { access, mkdir } from 'fs/promises';
import { SAVE_FILE_DIR } from './constants';

@Module({
	imports: [
		AuthModule,
		MulterModule.register({ dest: path.resolve(__dirname, '../../data') }),
	],
	providers: [FilesService],
	controllers: [FilesController],
	exports: [FilesService],
})
export class FilesModule {
	async onModuleInit() {
		try {
			await mkdir(resolve(SAVE_FILE_DIR));
		} catch (err) {}
	}
}
