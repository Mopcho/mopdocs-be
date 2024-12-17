import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';

@Module({
	providers: [WorkspacesService],
	controllers: [WorkspacesController],
	exports: [WorkspacesService],
})
export class WorkspacesModule {}
