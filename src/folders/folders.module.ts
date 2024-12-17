import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
	providers: [FoldersService],
	controllers: [FoldersController],
	imports: [FilesModule],
})
export class FoldersModule {}
