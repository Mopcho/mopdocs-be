export interface FolderEntity {
	id: string;
	name: string;
	label?: string;
	parentId?: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export type FolderCreateData = Pick<FolderEntity, 'name' | 'userId'> &
	Partial<Pick<FolderEntity, 'id' | 'parentId'>>;

export type FolderUpdateData = Partial<
	Omit<FolderEntity, 'id' | 'createdAt' | 'updatedAt'>
>;

export type FolderFindData = Partial<FolderEntity>;

export type FolderFindUniqueData = Pick<FolderEntity, 'id'>;
