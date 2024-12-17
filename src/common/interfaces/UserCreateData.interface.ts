import { UserCreateData as UserCreateDataEntity } from '../../entities';

export type UserCreateData = Pick<
	UserCreateDataEntity,
	'email' | 'password' | 'username'
>;
