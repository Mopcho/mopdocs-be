import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateWorkspaceDto } from './dto/CreateWotkspace.dto';

@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspacesController {
	constructor(private readonly workspaceService: WorkspacesService) {}

	@Post()
	create(
		@Body() createWorkspaceDto: CreateWorkspaceDto,
		@Request() req: Express.Request,
	) {
		return this.workspaceService.create({
			...createWorkspaceDto,
			ownerId: req.user.sub,
		});
	}
}
