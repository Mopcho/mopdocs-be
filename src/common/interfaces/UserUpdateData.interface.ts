import { UserUpdateData as UserUpdateDataEntity } from '../../entities';

export type UserUpdateData = Pick<UserUpdateDataEntity, 'username'>;
