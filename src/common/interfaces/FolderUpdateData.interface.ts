import { FolderUpdateData as FolderUpdateDataEntity } from '../../entities';

export type FolderUpdateData = Omit<FolderUpdateDataEntity, 'userId'>;
