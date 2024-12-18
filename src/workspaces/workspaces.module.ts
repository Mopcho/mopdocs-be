import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [AuthModule],
	providers: [WorkspacesService],
	controllers: [WorkspacesController],
	exports: [WorkspacesService],
})
export class WorkspacesModule {}
