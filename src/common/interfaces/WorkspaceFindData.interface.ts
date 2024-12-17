import { WorkspaceEntity, WorkspacesUsersFindData } from 'src/entities';

export type WorkspaceFindData = Partial<WorkspaceEntity> &
	Partial<Pick<WorkspacesUsersFindData, 'userId'>>;
