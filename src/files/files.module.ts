import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { MulterModule } from '@nestjs/platform-express';
import path from 'path';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [
		AuthModule,
		MulterModule.register({ dest: path.resolve(__dirname, '../../data') }),
	],
	providers: [FilesService],
	controllers: [FilesController],
})
export class FilesModule {}
