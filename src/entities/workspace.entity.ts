export interface WorkspaceEntity {
	id: string;
	name: string;
	ownerId: string;
	createdAt: string;
	updatedAt: string;
}

export type WorkspaceCreateData = Omit<
	WorkspaceEntity,
	'createdAt' | 'updatedAt' | 'id'
>;

export type WorkspaceUpdateData = Partial<
	Omit<WorkspaceEntity, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>
>;

export type WorkspaceFindData = Partial<WorkspaceEntity>;

export type WorkspaceFindUniqueData = Pick<WorkspaceEntity, 'id'>;
