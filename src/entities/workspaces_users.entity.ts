export interface WorkspacesUsersEntity {
	userId: string;
	workspaceId: string;
}

export type WorkspacesUsersCreateData = WorkspacesUsersEntity;

export type WorkspacesUsersUpdateData = Partial<WorkspacesUsersEntity>;

export type WorkspacesUsersFindData = Partial<WorkspacesUsersEntity>;

export type WorkspacesUsersFindUniqueData = Pick<
	WorkspacesUsersEntity,
	'userId' | 'workspaceId'
>;
