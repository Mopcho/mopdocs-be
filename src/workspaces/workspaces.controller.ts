import {
	Body,
	Controller,
	Post,
	UseGuards,
	Request,
	Get,
	Put,
	Param,
	Delete,
} from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateWorkspaceDto, CreateWorkspaceDto } from './dto';

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

	@Get()
	listAll() {
		return this.workspaceService.findAll();
	}

	@Put(':workspaceId')
	update(
		@Body() updateWorkspaceDto: UpdateWorkspaceDto,
		@Param('workspaceId') workspaceId,
	) {
		return this.workspaceService.update(updateWorkspaceDto, {
			id: workspaceId,
		});
	}

	@Delete(':workspaceId')
	delete(@Param('workspaceId') workspaceId) {
		return this.workspaceService.delete({ id: workspaceId });
	}
}
