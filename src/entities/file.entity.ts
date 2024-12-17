export interface FileEntity {
	id: string;
	mimeType: string;
	name: string;
	size: number;
	label?: string;
	parentId?: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
}

export type FileCreateData = Omit<FileEntity, 'createdAt' | 'updatedAt'>;

export type FileUpdateData = Partial<
	Omit<FileEntity, 'id' | 'createdAt' | 'updatedAt'>
>;

export type FileFindData = Partial<FileEntity>;

export type FileFindUniqueData = Pick<FileEntity, 'id'>;
