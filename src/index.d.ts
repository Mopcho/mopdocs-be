import { Knex } from 'knex';
import {
	FileCreateData,
	FileEntity,
	FileUpdateData,
	FolderCreateData,
	FolderEntity,
	FolderUpdateData,
	UserCreateData,
	UserUpdateData,
	WorkspaceCreateData,
	WorkspaceEntity,
	WorkspacesUsersCreateData,
	WorkspacesUsersEntity,
	WorkspacesUsersUpdateData,
	WorkspaceUpdateData,
} from './entities';

declare module 'knex/types/tables' {
	interface Tables {
		files: Knex.CompositeTableType<FileEntity, FileCreateData, FileUpdateData>;
		users: Knex.CompositeTableType<UserEntity, UserCreateData, UserUpdateData>;
		folders: Knex.CompositeTableType<
			FolderEntity,
			FolderCreateData,
			FolderUpdateData
		>;
		workspaces: Knex.CompositeTableType<
			WorkspaceEntity,
			WorkspaceCreateData,
			WorkspaceUpdateData
		>;
		workspaces_users: Knex.CompositeTableType<
			WorkspacesUsersEntity,
			WorkspacesUsersCreateData,
			WorkspacesUsersUpdateData
		>;
	}
}

declare global {
	namespace Express {
		interface Request {
			user?: {
				sub: string;
				email: string;
				username: string;
			};
		}
	}
}
